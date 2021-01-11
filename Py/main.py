import time
import board
import adafruit_dht
#from gpiozero import InputDevice
import os
import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BCM)
GPIO.setup(18, GPIO.IN)
rain = GPIO.input(18)

# Initial the dht device, with data pin connected to:
dhtDevice = adafruit_dht.DHT11(board.D4)


# you can pass DHT22 use_pulseio=False if you wouldn't like to use pulseio.
# This may be necessary on a Linux single board computer like the Raspberry Pi,
# but it will not work in CircuitPython.
#dhtDevice = adafruit_dht.DHT11(board.D4, use_pulseio=False)
#no_rain = InputDevice(18)


while True:
    try:
        # Print the values to the serial port
        temperature_c = dhtDevice.temperature
        temperature_f = temperature_c * (9 / 5) + 32
        humidity = dhtDevice.humidity
        print(
            "Temp: {:.1f} F / {:.1f} C    Humidity: {}% ".format(
                temperature_f, temperature_c, humidity
            )
        )

        if (rain == 0):
            print("It's raining!")

        else:
            print("It's not raining!")

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