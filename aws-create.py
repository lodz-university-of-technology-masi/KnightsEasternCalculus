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
# load json config file
with open("cognito_config.json", 'r') as f:
    cognito_config = f.read()
subprocess.call("aws cognito-idp create-user-pool --cli-input-json '{}'".format(cognito_config), shell=True, stdout=subprocess.DEVNULL)

print("\tCreating Cognito App Client...")
# get pool id
pools = json.loads(subprocess.check_output("aws cognito-idp list-user-pools --max-results 20", shell=True).decode("utf-8"))["UserPools"]
for pool in pools:
    if pool["Name"] == "kotec":
        pool_id = pool["Id"]

client = json.loads(subprocess.check_output("aws cognito-idp create-user-pool-client --user-pool-id '{}' --client-name 'kotec' --no-generate-secret --refresh-token-validity 3650".format(pool_id), shell=True).decode("utf-8"))["UserPoolClient"]
print("\t\tUser Pool Id: {}\n\t\tClientId: {}".format(client["UserPoolId"], client["ClientId"]))

print("\tCreating Cognito User Groups...")

print("\t\tRecruiter")
subprocess.call("aws cognito-idp create-group --group-name 'recruiter' --user-pool-id '{}'".format(pool_id), shell=True, stdout=subprocess.DEVNULL)
print("\t\tClient")
subprocess.call("aws cognito-idp create-group --group-name 'client' --user-pool-id '{}'".format(pool_id), shell=True, stdout=subprocess.DEVNULL)

print("Creating Cognito Identity Pool")
region = pool_id.split('_')[0]
provider = "cognito-idp.{}.amazonaws.com/{}".format(region, pool_id)
identity_pool_id = json.loads(subprocess.check_output("aws cognito-identity create-identity-pool --identity-pool-name kotec_id --no-allow-unauthenticated-identities --cognito-identity-providers ProviderName={},ClientId={}".format(provider, client["ClientId"]), shell=True).decode('utf-8'))["IdentityPoolId"]
print("\tCognito Identity Pool ID: {}".format(identity_pool_id))
print("\tProvider: {}".format(provider))
print("Script finished.")
print("Make sure the apiUrl in applicant.service is set to 'https://{}.execute-api.us-east-1.amazonaws.com/test/applicant'".format(gatewayID))
