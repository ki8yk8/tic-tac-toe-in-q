import serial
import time

# connect to the virtual port
ser = serial.Serial(port="COM5", baudrate=115200, timeout=1)

while True:
	ser.write("Message from MPU (Python)".encode())
	time.sleep(1)
