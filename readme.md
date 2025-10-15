# How to run?

1. Emulate the virtual port using `Com0Com`. `COM5` for MPU and `COM6` for MCU.

```bash
install PortName=COM5 PortName=COM6
```

2. Run the python script that sends serial message to `COM5`.

```bash
uv run main.py
```

3. Build the PlatformIO project using the extension. The file of interest is `.elf` file present inside `.pio` directory.

## For testing

1. Use PuTTY to connect to the serial port and debug the output.

# How I simulated Q like environment?

1. Utilize Com0Com for emulating virtual serial port. There will be two ports emulated, one for MPU and one for MCU. Later, these two ports will be used for communication between these two devices using Serial communication same as in Q. Two port is used because virtual port in windows can be accessed by only one program at a time.

2. Used PlatformIO with the following configuration that is best match to the Arduino UNO Q's MCU.

```
[env:nucleo_u575zi_q]
platform = ststm32
board = nucleo_u575zi_q
framework = arduino
```

3. For dumping the commands to MCU by MPU (Python), Python serial library is used

```bash
pip install pyserial
```

## References

1. [Arduino Q reference project](https://github.com/leonardocavagnis/local-weather-station-arduino-uno-q)
