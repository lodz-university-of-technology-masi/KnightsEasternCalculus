import subprocess
import json
import os
import re
from datetime import datetime
import sys

print("Checking for credentials_config.json file...")
if os.path.exists("credentials_config.json"):
    with open("credentials_config.json", 'r') as f:
        credentials_config = json.load(f)
        secondsPassed = (datetime.now() - datetime.fromtimestamp(credentials_config["timestamp"])).total_seconds()
        if (secondsPassed / 60 / 60) > 2.8:
            print("Credentials will soon expire. Generating new ones.")
            subprocess.run([sys.executable, 'get-credentials.py'])
        else:
            print("Credentials have not expired. Continuing...")
else:
    print("\tThe file does not exist. Skipping credentials check.")

print("Fetching account info...")
accountID = json.loads(subprocess.check_output(
    "aws sts get-caller-identity", shell=True).decode("utf-8"))["Account"]
print("The account id is {}".format(accountID))

role_tmp = "arn:aws:iam::{}:role/{}"

print("Building lambda project...")
subprocess.call(os.path.join('.', "gradlew buildZip"), shell=True, cwd="lambda")

print("Creating lambda bucket...")
subprocess.call(
    "aws s3api create-bucket --bucket {}-kotec-lambda-{}".format(accountID, accountID), shell=True)
print("Uploading file...")
subprocess.call(
    "aws s3 cp lambda/build/distributions/lambda-0.1.zip s3://{}-kotec-lambda-{}".format(accountID, accountID), shell=True)


role = role_tmp.format(accountID, "lambda-cli-role")
bucket_spec = "S3Bucket={}-kotec-lambda-{},S3Key=lambda-0.1.zip".format(accountID, accountID)

print("Creating dynamodb table...")
subprocess.call("aws dynamodb create-table --table-name Applicant --attribute-definitions AttributeName=id,AttributeType=S --key-schema AttributeName=id,KeyType=HASH --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5", shell=True)
subprocess.call("aws dynamodb create-table --table-name Tests --attribute-definitions AttributeName=recruiterId,AttributeType=S AttributeName=timestamp,AttributeType=N --key-schema AttributeName=recruiterId,KeyType=HASH AttributeName=timestamp,KeyType=RANGE --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5", shell=True)
subprocess.call("aws dynamodb create-table --table-name TestInstances --attribute-definitions AttributeName=applicantId,AttributeType=S AttributeName=timestamp,AttributeType=N --key-schema AttributeName=applicantId,KeyType=HASH AttributeName=timestamp,KeyType=RANGE --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5", shell=True)

print("Creating lambdas...")

lambda_data = [("get-applicant", "lambda.applicant.GetApplicant"), ("get-applicants", "lambda.applicant.GetApplicants"), ("add-applicant", "lambda.applicant.AddApplicant"),
               ("get-all-tests", "lambda.test.GetAllTests"), ("add-test", "lambda.test.AddTest"), ("delete-test", "lambda.test.DeleteTest"), ("update-test", "lambda.test.UpdateTest"), ("get-test", "lambda.test.GetTest"),
               ("solve-test", "lambda.test.SolveTest"), ("add-test-instance", "lambda.test.AddTestInstance"), ("assign-applicant", "lambda.applicant.AssignApplicant"),
               ("get-test-instances-for-user", "lambda.test.GetTestInstancesForUser"), ("get-test-instance", "lambda.test.GetTestInstance"), ("grade-test", "lambda.test.GradeTest"),
               ("delete-test-instance", "lambda.test.DeleteTestInstance")]

for lam in lambda_data:
    print("\t"+lam[0])
    subprocess.call("aws lambda create-function --function-name {} --code {} --handler {}::handleRequest --runtime java8 --role {} --memory-size 512 --timeout 10".format(
        lam[0], bucket_spec, lam[1], role), shell=True)

with open('API-documentation.json', 'r') as infile:
    with open('API-documentation-customized.json', 'w+') as outfile:
        for line in infile:
            outfile.write(re.sub('arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:.*?:function:',
                                 'arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:{}:function:'.format(accountID), line, flags=re.DOTALL))

print("Creating gateways...")
gatewayID = json.loads(subprocess.check_output(
    "aws apigateway import-rest-api --body fileb://API-documentation-customized.json", shell=True))["id"]


# lambda names to automate permission granting

print("Granting lambda permissions...")
for name in lambda_data:
    subprocess.call("aws lambda add-permission --function-name {0} --statement-id api-{0} --action lambda:InvokeFunction --principal apigateway.amazonaws.com --source-arn arn:aws:execute-api:us-east-1:{1}:{2}/*/**".format(
        name[0], accountID, gatewayID), shell=True)

print("Filling test data...")
files = ["marian.txt", "zosia.txt", "anna.txt"]

print("\tFilling dynamodb")
for file in files:
    subprocess.call("aws lambda invoke --function-name add-applicant --payload fileb://{} dump".format(
        os.path.join("dummy-data", file)), shell=True)
    if file == "anna.txt":
        with open("dump", 'r') as f:
            anka_id = json.loads(f.read())['body']['id']


print("\tFilling S3...")
subprocess.call(
    "aws s3api create-bucket --bucket applicant-photos", shell=True)
subprocess.call(
    "aws s3 sync --acl public-read dummy-data/photos s3://applicant-photos", shell=True)

print("Deploying API...")
subprocess.call(
    "aws apigateway create-deployment --rest-api-id {} --stage-name test".format(gatewayID), shell=True)

print("Creating Cognito User Pool...")

pool_id = json.loads(subprocess.check_output(
    "aws cognito-idp create-user-pool --cli-input-json fileb://cognito_config.json", shell=True))["UserPool"]["Id"]
print("\tThe pool id is {}".format(pool_id))

print("\tCreating Cognito App Client...")

client = json.loads(subprocess.check_output(
    "aws cognito-idp create-user-pool-client --user-pool-id {} --client-name kotec --no-generate-secret --refresh-token-validity 3650".format(pool_id), shell=True).decode("utf-8"))["UserPoolClient"]
print("\t\tUser Pool Id: {}\n\t\tClientId: {}".format(
    client["UserPoolId"], client["ClientId"]))

print("\tCreating Cognito User Groups...")

print("\t\tRecruiter")
subprocess.call("aws cognito-idp create-group --group-name recruiter --user-pool-id {} --role-arn {}".format(pool_id, role_tmp.format(accountID, "Cognito_kotecAuth_Role")), shell=True, stdout=subprocess.DEVNULL)
print("\t\tClient")
subprocess.call("aws cognito-idp create-group --group-name client --user-pool-id {} --role-arn {}".format(pool_id, role_tmp.format(accountID, "Cognito_kotecAuth_Role")), shell=True, stdout=subprocess.DEVNULL)

print("Creating Cognito Identity Pool")
region = pool_id.split('_')[0]
provider = "cognito-idp.{}.amazonaws.com/{}".format(region, pool_id)
identity_pool_id = json.loads(subprocess.check_output("aws cognito-identity create-identity-pool --identity-pool-name kotec_id --no-allow-unauthenticated-identities --cognito-identity-providers ProviderName={},ClientId={}".format(
    provider, client["ClientId"]), shell=True).decode('utf-8'))["IdentityPoolId"]
print("\tCognito Identity Pool ID: {}".format(identity_pool_id))
print("\tProvider: {}".format(provider))

print("\tSetting roles for the Identity Pool")
print("\t\tCreating roles...")
with open("policy_template.json", 'r') as f:
    policy_template = json.loads(f.read())

# an absolutely fucking stupid way of doing it but...
policy_template['Statement'][0]['Condition']['StringEquals']['cognito-identity.amazonaws.com:aud'] = identity_pool_id
policy_template['Statement'][0]['Condition']['ForAnyValue:StringLike']['cognito-identity.amazonaws.com:amr'] = 'authenticated'
with open("policy.json", 'w') as f:
    json.dump(policy_template, f)
subprocess.call("aws iam create-role --role-name Cognito_kotecAuth_Role --assume-role-policy-document file://policy.json", shell=True)
subprocess.call("aws iam attach-role-policy --role-name Cognito_kotecAuth_Role --policy-arn arn:aws:iam::aws:policy/AmazonCognitoPowerUser", shell=True)

policy_template['Statement'][0]['Condition']['ForAnyValue:StringLike']['cognito-identity.amazonaws.com:amr'] = 'unauthenticated'
with open("policy.json", 'w') as f:
    json.dump(policy_template, f)
subprocess.call("aws iam create-role --role-name Cognito_kotecUnauth_Role --assume-role-policy-document file://policy.json", shell=True)

auth_role = role_tmp.format(accountID, "Cognito_kotecAuth_Role")
unauth_role = role_tmp.format(accountID, "Cognito_kotecUnauth_Role")
subprocess.call("aws cognito-identity set-identity-pool-roles --identity-pool-id {} --roles unauthenticated={},authenticated={}".format(identity_pool_id, unauth_role, auth_role), shell=True)

print("\tAdding test account...")
admin_id = json.loads(subprocess.check_output("aws cognito-idp admin-create-user --user-pool-id {} --username admin@example.com --user-attributes=Name=email,Value=admin@example.com --temporary-password password --message-action SUPPRESS".format(pool_id), shell=True).decode('utf-8'))["User"]["Username"]
subprocess.call("aws cognito-idp admin-add-user-to-group --user-pool-id {} --username admin@example.com --group-name recruiter".format(pool_id), shell=True)

print("\tAdding mock test")
with open(os.path.join("dummy-data", "cpp-test_template")) as f:
    cpp_test = json.loads(f.read())
    cpp_test["recruiterId"] = admin_id
with open(os.path.join("dummy-data", "cpp-test.json"), 'w') as f:
    json.dump(cpp_test, f)

subprocess.call("aws lambda invoke --function-name add-test --payload fileb://{} dump".format(
    os.path.join("dummy-data", "cpp-test.json")), shell=True)

with open("dump", 'r') as f:
    test_id = json.loads(f.read())['body']['testId']

with open(os.path.join("dummy-data", "testInst_template"), 'r') as f:
    test_instance = json.loads(f.read())
    test_instance['applicantId'] = anka_id
    test_instance['recruiterId'] = admin_id
    test_instance['testId'] = test_id
with open(os.path.join("dummy-data", "test_instance.json"), 'w') as f:
    json.dump(test_instance, f)

print("\tAdding tmp test...")
subprocess.call("aws lambda invoke --function-name add-test-instance --payload fileb://{} dump".format(os.path.join("dummy-data", "test_instance.json")), shell=True)

print("Generating constants file...")
with open(os.path.join("web", "src", "app", "app-consts.ts"), "w+") as file:
    file.write("export const apiBaseUrl = 'https://{}.execute-api.us-east-1.amazonaws.com/test';\n".format(gatewayID))
    file.write("export const userPoolId = '{}';\n".format(pool_id))
    file.write("export const clientId = '{}';\n".format(client["ClientId"]))
    file.write("export const recruiterIdentityPoolId = '{}';\n".format(
        identity_pool_id))

print("Script finished.")
