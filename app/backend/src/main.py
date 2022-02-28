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
# payload = sys.stdin.readlines()
# screenshot_coordinates = json.loads(payload[0])
screenshot_coordinates = {"xpos": 5, "ypos": 30, "width": 1700, "height": 1020}
# save_path = payload[1].rstrip()
save_path = os.path.expanduser('~') + r"\Desktop\pyscreens"


def get_main_folder_path():
    main_path = os.path.realpath(__file__).split("\\")
    main_path = main_path[:-2]
    return "\\".join(main_path)


def create_dated_folder():
    """
    Creates folder with current date and time in format YYYY-MM-DD hh-mm
    Every screenshot taken during current session is stored inside this folder
    When program is run twice in the same minute, files from later session overwrites
    files from earlier one
    """
    global folder_name
    folder_name = "\\" + dt.datetime.now().strftime("%Y-%m-%d %H.%M")
    print(save_path + folder_name)
    try:
        os.makedirs(save_path + folder_name)
    except FileExistsError:
        pass


def take_screenshot():
    """
    Takes screenshot of the specified screen region
    """
    # TODO: check best time_between_screenshots time
    # TODO: implement something to specify screen region instead of hardcoding it
    increment_counter()
    myscreenshot = gui.screenshot(region=(
        screenshot_coordinates["xpos"], screenshot_coordinates["ypos"], screenshot_coordinates["width"], screenshot_coordinates["height"]))
    myscreenshot.save(save_path + folder_name + fr"\screenshot_{counter}.png")
    time.sleep(time_between_screenshots)


def play_notification_sound():
    # TODO: odd option to turn the sound on/off
    # TODO: check if asynchronous playing is necessary
    # TODO: add volume control
    # winsound.MessageBeep(type=winsound.MB_ICONHAND)
    pass


def increment_counter():
    """
    Increases counter by 1 to not overwrite previous screenshots
    Counter is always 3-digit number in format XXX
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
            return not bool(loc)
        except gui.ImageNotFoundException:
            return True
        except IOError:
            time.sleep(0.25)


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
            play_notification_sound()


if __name__ == "__main__":
    main_loop()
