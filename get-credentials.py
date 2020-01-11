from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver import Firefox
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.support.wait import WebDriverWait
from pathlib import Path
import os
import json
from datetime import datetime

with open("credentials_config.json", 'r') as f:
    config = json.load(f)
    username = config["email"]
    password = config["password"]

opts = Options()
opts.headless = True
print("Opening firefox...")
browser = Firefox(options=opts)
browser.get('https://www.awseducate.com/signin/SiteLogin')

print("Logging in...")
login_form = browser.find_element_by_id('loginPage:siteLogin:loginComponent:loginForm:username')
login_form.send_keys(username)
pass_form = browser.find_element_by_id('loginPage:siteLogin:loginComponent:loginForm:password')
pass_form.send_keys(password)
browser.find_element_by_xpath("/html/body/span/form/span/div/div[2]/div/div[2]/div/p/a").click()
WebDriverWait(browser, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "comm-page-home")))
print("Log in successful")

browser.get('https://www.awseducate.com/student/s/launch-classroom?classroomId=a1v3m000003UkxJAAS')
WebDriverWait(browser, 10).until(EC.presence_of_element_located((By.ID, "showawsdetail"))).click()

print("Acquiring credentials...")
details = WebDriverWait(browser, 10).until(EC.visibility_of_element_located((By.ID, "modal-table-report-aws")))
credentials = browser.find_element_by_css_selector("#clikeybox > pre:nth-child(2) > span:nth-child(1)").get_attribute('textContent')

print("Credentials acquired")
browser.close()

home_dir = str(Path.home())
with open(os.path.join(home_dir, ".aws", "credentials"), 'w+') as f:
    f.write(credentials)

with open("credentials_config.json", 'w') as f:
    config["timestamp"] = datetime.timestamp(datetime.now())
    f.write(json.dumps(config, indent=4))

print("Credentials file updated")
