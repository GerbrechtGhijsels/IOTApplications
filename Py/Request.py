import requests
from datetime import datetime


token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZmI4ODhiZjFmMTcwMDAxOTU0ZDQyOSIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTYxMDMyMDAxMX0.rJuVfeSd5RST1iuvjTI5g3IKVHnBCGubF8n9tdG4Fr8"
host = '192.168.1.161:80'
host = '127.0.0.1'
url = 'measuring.dev'
endpoint = '/api/measurements/token'


def post_measurement(stn, current_datetime, temp, humidity, rain):
    payload = {}
    payload['stn'] = stn
    payload['yyyymmdd'] = current_datetime
    payload['tg'] = temp
    payload['ug'] = humidity
    payload['rh'] = rain

    headers = {'authorization': token}
    r = requests.post(host+'https://measuring.dev/api/measurements/token', json=payload, headers=headers, verify=False)
    print(r.text)


now = datetime.now()
current_datetime = now.strftime("%Y/%m/%d %H:%M:%S")

token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZmI4ODhiZjFmMTcwMDAxOTU0ZDQyOSIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTYxMDMyMDAxMX0.rJuVfeSd5RST1iuvjTI5g3IKVHnBCGubF8n9tdG4Fr8"

#stn
#yymmdd
#temp
#humdity
#rain

payload={}
payload['stn']='666'
payload['yyyymmdd']=current_datetime
payload['tg']='temp'
payload['ug']='humdity'
payload['rh']='rain3'

headers = {'authorization': token}
r = requests.post('https://'+host+endpoint, json=payload, headers=headers, verify=False)
print(r.text)