# How to run?

1. Emulate the virtual port using `Com0Com`. `COM5` for MPU and `COM6` for MCU.

```bash
install PortName=COM5 PortName=COM6
```

2. Build the PlatformIO project using the extension. The file of interest is `.elf` file present inside `.pio` directory.

# How I simulated Q like environment?

1. Utilize Com0Com for emulating virtual serial port. There will be two ports emulated, one for MPU and one for MCU. Later, these two ports will be used for communication between these two devices using Serial communication same as in Q.

2. Used PlatformIO with the following configuration that is best match to the Arduino UNO Q's MCU.

```
[env:nucleo_u575zi_q]
platform = ststm32
board = nucleo_u575zi_q
framework = arduino
```

## References

1. [Arduino Q reference project](https://github.com/leonardocavagnis/local-weather-station-arduino-uno-q)
