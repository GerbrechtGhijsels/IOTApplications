import time
import board
import adafruit_dht
import RPi.GPIO as GPIO
import requests
from datetime import datetime

GPIO.setmode(GPIO.BCM)
GPIO.setup(18, GPIO.IN)
rain = GPIO.input(18)

# Initial the dht device, with data pin connected to:
dhtDevice = adafruit_dht.DHT11(board.D4)

token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZmI4ODhiZjFmMTcwMDAxOTU0ZDQyOSIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTYxMDMyMDAxMX0.rJuVfeSd5RST1iuvjTI5g3IKVHnBCGubF8n9tdG4Fr8"
host = '192.168.1.161'
host = 'measuring.gg'


def post_measurement(stn, current_datetime, temp, humidity, rain):
    payload = {}
    payload['stn'] = stn
    payload['yyyymmdd'] = current_datetime
    payload['tg'] = temp
    payload['ug'] = humidity
    payload['rh'] = rain

    headers = {'authorization': token}
    r = requests.post('https://measuring.gg/api/measurements/token', json=payload, headers=headers, verify=False)
    print(r.text)


def print_measurement(stn, current_datetime, temp, humidity, rain):
    print('**********************************')
    print('Station: ' + stn)
    print('Date and time: ' + current_datetime)
    print(
        "Temp: {:.1f} C    Humidity: {}% ".format(
            temp, humidity
        )
    )
    if rain == 0:
        print("Rain: Yes")

    else:
        print("Rain: No")
    print('**********************************')


while True:
    try:
        stn = '666'
        now = datetime.now()
        current_datetime = now.strftime("%Y/%m/%d %H:%M:%S")
        temp = ''
        humidity = ''
        rain = ''

        # Print the values to the serial port
        temperature_c = dhtDevice.temperature
        temperature_f = temperature_c * (9 / 5) + 32
        humidity = dhtDevice.humidity

        temp = temperature_c

        post_measurement(stn, current_datetime, temp, humidity, rain)
        print_measurement(stn, current_datetime, temp, humidity, rain)

    except RuntimeError as error:
        # Errors happen fairly often, DHT's are hard to read, just keep going
        print(error.args[0])
        time.sleep(2.0)
        continue
    except Exception as error:
        dhtDevice.exit()
        GPIO.cleanup()
        raise error
    except KeyboardInterrupt:
         print('interrupted!')
         GPIO.cleanup()

    time.sleep(2.0)