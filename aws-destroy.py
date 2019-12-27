import subprocess
import json
import time

print("Deleting dynamodb table...")
subprocess.call("aws dynamodb delete-table --table-name Applicant", shell=True)
subprocess.call("aws dynamodb delete-table --table-name Tests", shell=True)

lambda_data=[("get-applicant", "lambda.applicant.GetApplicant"), ("get-applicants", "lambda.applicant.GetApplicants"), ("add-applicant", "lambda.applicant.AddApplicant"),
             ("get-all-tests", "lambda.test.GetAllTests"), ("add-test", "lambda.test.AddTest"), ("delete-test", "lambda.test.DeleteTest"), ("update-test", "lambda.test.UpdateTest")]

print("Deleting lambdas...")

for lam in lambda_data:
    print("\t"+lam[0])
    subprocess.call("aws lambda delete-function  --function-name {}".format(lam[0]), shell=True)

print("Deleting gateways...")

gatewaysID = json.loads(subprocess.check_output("aws apigateway get-rest-apis", shell=True).decode("utf-8"))["items"]

for gateway in gatewaysID:
    print("\tDeleting {0} with id {1}".format(gateway["name"], gateway["id"]))
    subprocess.call("aws apigateway delete-rest-api --rest-api-id {}".format(gateway["id"]), shell=True)
    time.sleep(5)

print("Clearing S3 buckets...")
subprocess.call("aws s3 rm s3://applicant-photos --recursive", shell=True)
subprocess.call("aws s3 rm s3://kotec-lambda --recursive", shell=True)

print("Deleting S3 buckets...")
subprocess.call("aws s3api delete-bucket --bucket applicant-photos", shell=True)
subprocess.call("aws s3api delete-bucket --bucket kotec-lambda", shell=True)

print("Deleting Cognito User Pools")
pools = json.loads(subprocess.check_output("aws cognito-idp list-user-pools --max-results 20", shell=True).decode("utf-8"))["UserPools"]
for pool in pools:
    if pool["Name"] == "kotec":
        pool_id = pool["Id"]
        break
subprocess.call("aws cognito-idp delete-user-pool --user-pool-id {}".format(pool_id), shell=True)

print("Deleting Cognito Identity Pools")
id_pools = json.loads(subprocess.check_output("aws cognito-identity list-identity-pools --max-results 20", shell=True).decode('utf-8'))["IdentityPools"]
for pool in id_pools:
    if pool["IdentityPoolName"] == "kotec_id":
        id_pool_id = pool["IdentityPoolId"]
        break
subprocess.call("aws cognito-identity delete-identity-pool --identity-pool-id {}".format(id_pool_id), shell=True)

print("Script finished.")
