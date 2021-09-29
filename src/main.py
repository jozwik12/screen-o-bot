import pyautogui as gui
import time

gui.PAUSE = 1
gui.FAILSAFE = True
counter = 0
time_between_screenshots = 2


def take_screenshot():
    myscreenshot = gui.screenshot()
    global counter
    counter += 1
    myscreenshot.save(fr"C:\Users\TITAN\Desktop\pyscreens\screenshot_{counter}.png")
    time.sleep(time_between_screenshots)


def check_for_program_termination():
    x, y = gui.position()
    if x == 0 and y == 0:
        raise gui.FailSafeException


def main_loop():
    while True:
        try:
            take_screenshot()
            check_for_program_termination()
        except gui.FailSafeException:
            gui.alert("Program has been stopped")
            exit()


main_loop()
