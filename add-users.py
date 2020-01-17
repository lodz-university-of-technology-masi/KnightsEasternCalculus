#!/usr/bin/env python3
import subprocess
import json


pool_id = [id for id in list(map(lambda p: p["Id"] if p["Name"] == "kotec" else None, json.loads(subprocess.check_output("aws cognito-idp list-user-pools --max-results 20", shell=True).decode('utf-8'))["UserPools"])) if id][0]


groups = "kwk, god, pan, scs, kec, paj, trb, wyl, kas, ext, cld, tea, sas, sam, dpd, scy, crx, bsm".split(', ')

for group in groups:
    for id in range(1, 6):
        subprocess.call("aws cognito-idp admin-create-user --user-pool-id {} --username {}@example.com --user-attributes=Name=email,Value={}@example.com --temporary-password password --message-action SUPPRESS"
            .format(pool_id, group + '0' + str(id), group + '0' +  str(id), group + '0' + str(id)), shell=True)
        subprocess.call("aws cognito-idp admin-set-user-password --user-pool-id {} --username {}@example.com --password pswd{} --permanent".format(pool_id, group + '0' + str(id), '0' + str(id)), shell=True)
        subprocess.call("aws cognito-idp admin-add-user-to-group --user-pool-id {} --username {}@example.com --group-name recruiter".format(pool_id, group + '0' + str(id)), shell=True)