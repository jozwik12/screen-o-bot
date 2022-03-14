import json
import os
import pyautogui as gui
import time
import datetime as dt
import winsound
import sys

# Time between pyautogui commands
gui.PAUSE = 0.05

# Counter used for file naming
counter = "0000"

# Sleep time after taking screenshot
time_between_screenshots = 0

# Parameter that dictates, how similar previous screenshot must be in relation to current screen state
comparison_confidence = 0.95

# Parameter that dictates, how comparison confidence of excluded files to current screen state
excluded_comparison_confidence = 0.95

# Default folder name, set after invoking create_dated_folder() method
folder_name = ""

# Data payload from electron
payload = sys.stdin.read().split()
screenshot_coordinates = json.loads(payload[0])
save_path = payload[1]


def create_dated_folder():
    """
    Creates folder with current date and time in format YYYY-MM-DD hh-mm
    Every screenshot taken during current session is stored inside this folder
    When program is run twice in the same minute, files from later session overwrites
    files from earlier one
    """
    global folder_name
    folder_name = "\\" + dt.datetime.now().strftime("%Y-%m-%d %H.%M")
    sys.stdout.write(save_path + folder_name)
    sys.stdout.close()
    try:
        os.makedirs(save_path + folder_name)
    except FileExistsError:
        pass


def take_screenshot():
    """
    Takes screenshot of the specified screen region
    """
    increment_counter()
    myscreenshot = gui.screenshot(region=(
        screenshot_coordinates["xpos"], screenshot_coordinates["ypos"], screenshot_coordinates["width"], screenshot_coordinates["height"]))
    myscreenshot.save(save_path + folder_name + fr"\screenshot_{counter}.png")
    time.sleep(time_between_screenshots)


def increment_counter():
    """
    Increases counter by 1 to not overwrite previous screenshots
    Counter is always 4-digit number in format XXXX
    Small numbers have leading zeros
    """
    global counter
    counter = int(counter) + 1
    counter = str(counter).zfill(4)


def screen_has_changed():
    """
    Checks if current screen state is similar to latest screenshot
    returns true if there is difference between current, and previous screenshot
    meaning - screenshot should be taken, as screen state has changed
    returns false if previous screenshot is the same as current screen state
    """
    while True:
        try:
            loc = gui.locateOnScreen(save_path + folder_name + fr"\screenshot_{counter}.png",
                                     confidence=comparison_confidence)
        except gui.ImageNotFoundException:
            return True
        except IOError:
            time.sleep(0.25)
        else:
            return not bool(loc)



def main_loop():
    """
    Main program loop
    Stops when mouse is moved to upper left corner of the screen
    """
    create_dated_folder()
    take_screenshot()
    while True:
        time.sleep(0.2)
        if screen_has_changed():
            take_screenshot()


if __name__ == "__main__":
    main_loop()
