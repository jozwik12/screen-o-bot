import os
import pyautogui as gui
import time
import datetime as dt

gui.PAUSE = 0.05
gui.FAILSAFE = True
counter = "000"
time_between_screenshots = 0
comparison_confidence = 0.95
save_path = r"C:\Users\TITAN\Desktop\pyscreens"
folder_name = ""


def create_dated_folder():
    global folder_name
    folder_name = "\\" + dt.datetime.now().strftime("%Y-%m-%d %H.%M")
    os.mkdir(save_path + folder_name)


def take_screenshot():
    increment_counter()
    myscreenshot = gui.screenshot(region=(5, 5, 900, 880))
    myscreenshot.save(save_path + folder_name + fr"\screenshot_{counter}.png")
    time.sleep(time_between_screenshots)


def increment_counter():
    global counter
    counter = int(counter) + 1
    counter = str(counter).zfill(3)


""" Checks if current screen state is similar to latest screenshot
returns true if there is difference between current, and previous screenshot
    meaning - screenshot should be taken, as screen state has changed
returns false if previous screenshot is the same as current screen state
"""


def compare_screenshots():
    try:
        loc = gui.locateOnScreen(save_path + folder_name + fr"\screenshot_{counter}.png",
                                 confidence=comparison_confidence)
        return not bool(loc)
    except gui.ImageNotFoundException:
        return True


def check_for_program_termination():
    x, y = gui.position()
    if x == 0 and y == 0:
        raise gui.FailSafeException


def main_loop():
    create_dated_folder()
    take_screenshot()
    while True:
        time.sleep(0.2)
        try:
            check_for_program_termination()
        except gui.FailSafeException:
            gui.alert("Program has been stopped")
            exit()
        if compare_screenshots():
            take_screenshot()


main_loop()
