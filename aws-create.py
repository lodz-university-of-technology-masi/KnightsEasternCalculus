import subprocess
import json
import os

print("Fetching account info...")
accountID = json.loads(subprocess.check_output("aws sts get-caller-identity", shell=True).decode("utf-8"))["Account"]
print("The account id is {}".format(accountID))

print("Creating dynamodb table...")
subprocess.call("aws dynamodb create-table --table-name Applicant --attribute-definitions AttributeName=id,AttributeType=S --key-schema AttributeName=id,KeyType=HASH --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5", shell=True)

print("Creating lambdas...")
lambdaZip = os.path.join("lambda", "build", "distributions", "lambda-0.1.zip")

#get get-applicant lambda
subprocess.call("aws lambda create-function --function-name get-applicant --zip-file fileb://{} --handler lambda.applicant.GetApplicant::handleRequest --runtime java8 --role arn:aws:iam::716447952913:role/lambda-cli-role --memory-size 512 --timeout 10".format(lambdaZip), shell=True)

#get get-applicants lambda
subprocess.call("aws lambda create-function --function-name get-applicants --zip-file fileb://{} --handler lambda.applicant.GetApplicants::handleRequest --runtime java8 --role arn:aws:iam::716447952913:role/lambda-cli-role --memory-size 512 --timeout 10".format(lambdaZip), shell=True)

#add add-applicant lambda
subprocess.call("aws lambda create-function --function-name add-applicant --zip-file fileb://{} --handler lambda.applicant.AddApplicant::handleRequest --runtime java8 --role arn:aws:iam::716447952913:role/lambda-cli-role --memory-size 512 --timeout 10".format(lambdaZip), shell=True)


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

print("Script finished.")
print("Make sure the apiUrl in applicant.service is set to 'https://{}.execute-api.us-east-1.amazonaws.com/test/applicant'".format(gatewayID))
