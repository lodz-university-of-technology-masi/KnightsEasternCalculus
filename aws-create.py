import subprocess
import json
import os

print("Fetching account info...")
accountID = json.loads(subprocess.check_output("aws sts get-caller-identity", shell=True).decode("utf-8"))["Account"]
print("The account id is {}".format(accountID))

role = "arn:aws:iam::{}:role/lambda-cli-role".format(accountID)

print("Creating dynamodb table...")
subprocess.call("aws dynamodb create-table --table-name Applicant --attribute-definitions AttributeName=id,AttributeType=S --key-schema AttributeName=id,KeyType=HASH --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5", shell=True)

print("Creating lambdas...")
lambdaZip = os.path.join("lambda", "build", "distributions", "lambda-0.1.zip")

#get get-applicant lambda
subprocess.call("aws lambda create-function --function-name get-applicant --zip-file fileb://{} --handler lambda.applicant.GetApplicant::handleRequest --runtime java8 --role {} --memory-size 512 --timeout 10".format(lambdaZip, role), shell=True)

#get get-applicants lambda
subprocess.call("aws lambda create-function --function-name get-applicants --zip-file fileb://{} --handler lambda.applicant.GetApplicants::handleRequest --runtime java8 --role {} --memory-size 512 --timeout 10".format(lambdaZip, role), shell=True)

#add add-applicant lambda
subprocess.call("aws lambda create-function --function-name add-applicant --zip-file fileb://{} --handler lambda.applicant.AddApplicant::handleRequest --runtime java8 --role {} --memory-size 512 --timeout 10".format(lambdaZip, role), shell=True)


print("Creating gateways...")
gatewayID = json.loads(subprocess.check_output("aws apigateway import-rest-api --body fileb://API-documentation.txt", shell=True))["id"]


#lambda names to automate permission granting
lambdas = ["get-applicant", "get-applicants"]

print("Granting lambda permissions...")
for name in lambdas:
    subprocess.call("aws lambda add-permission --function-name {0} --statement-id api-{0} --action lambda:InvokeFunction --principal apigateway.amazonaws.com --source-arn arn:aws:execute-api:us-east-1:{1}:{2}/*/**".format(name, accountID, gatewayID), shell=True)

print("Filling test data...")
files = ["marian.txt", "zosia.txt", "anna.txt"]

print("\tFilling dynamodb")
for file in files:
    subprocess.call("aws lambda invoke --function-name add-applicant --payload fileb://{} dump".format(os.path.join("dummy-data", file)), shell=True)

print("\tFilling S3...")
subprocess.call("aws s3api create-bucket --bucket applicant-photos", shell=True)
subprocess.call("aws s3 sync --acl public-read dummy-data/photos s3://applicant-photos", shell=True)

print("Deploying API...")
subprocess.call("aws apigateway create-deployment --rest-api-id {} --stage-name test".format(gatewayID), shell=True)

print("Creating Cognito User Pool...")

pool_id = json.loads(subprocess.check_output("aws cognito-idp create-user-pool --cli-input-json fileb://cognito_config.json", shell=True))["UserPool"]["Id"]
print("\tThe pool id is {}".format(pool_id))

print("\tCreating Cognito App Client...")

client = json.loads(subprocess.check_output("aws cognito-idp create-user-pool-client --user-pool-id {} --client-name kotec --no-generate-secret --refresh-token-validity 3650".format(pool_id), shell=True).decode("utf-8"))["UserPoolClient"]
print("\t\tUser Pool Id: {}\n\t\tClientId: {}".format(client["UserPoolId"], client["ClientId"]))

print("\tCreating Cognito User Groups...")

print("\t\tRecruiter")
subprocess.call("aws cognito-idp create-group --group-name recruiter --user-pool-id {}".format(pool_id), shell=True, stdout=subprocess.DEVNULL)
print("\t\tClient")
subprocess.call("aws cognito-idp create-group --group-name client --user-pool-id {}".format(pool_id), shell=True, stdout=subprocess.DEVNULL)

print("\tAdding test account...")
subprocess.call("aws cognito-idp admin-create-user --user-pool-id {} --username admin@example.com --user-attributes=Name=email,Value=admin@example.com --message-action SUPPRESS".format(pool_id), shell=True)
subprocess.call("aws cognito-idp admin-add-user-to-group --user-pool-id {} --username admin@example.com --group-name recruiter".format(pool_id), shell=True)

print("Generating constants file...")
with open(os.path.join("web", "src", "app", "app-consts.ts"), "w+") as file:
    file.write("export const apiBaseUrl = 'https://{}.execute-api.us-east-1.amazonaws.com/test/applicant';\n".format(gatewayID))
    file.write("export const userPoolId = '{}';\n".format(pool_id))
    file.write("export const clientId = '{}';\n".format(client["ClientId"]))
    file.write("export const recruiterIdentityPoolId = '{}';\n".format("us-east-1:6b668023-3071-49da-b222-e7fa4ef3dcde"))

print("Script finished.")
