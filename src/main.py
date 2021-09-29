import os
import pyautogui as gui
import time
import datetime as dt

# Time between pyautogui commands
gui.PAUSE = 0.05

# Throws FailSafeException when mouse is moved to upper left corner of the screen
gui.FAILSAFE = True

# Counter used for file naming
counter = "000"

# Sleep time after taking screenshot
time_between_screenshots = 0

# Parameter that dictates, how similar previous screenshot must be in relation to current screen state
comparison_confidence = 0.95

# Default folder for screens
# TODO: some input method instead of hardcoding it
save_path = r"C:\Users\TITAN\Desktop\pyscreens"

# Default folder name, set after invoking create_dated_folder() method
folder_name = ""

""" 
Creates folder with current date and time in format YYYY-MM-DD hh-mm
Every screenshot taken during current session is stored inside this folder
When program is run twice in the same minute, files from later session overwrites
files from earlier one
"""
def create_dated_folder():
    global folder_name
    folder_name = "\\" + dt.datetime.now().strftime("%Y-%m-%d %H.%M")
    try:
        os.mkdir(save_path + folder_name)
    except FileExistsError:
        pass


"""
Takes screenshot of the specified screen region
"""
# TODO: check best time_between_screenshots time
# TODO: implement something to specify screen region instead of hardcoding it
def take_screenshot():
    increment_counter()
    myscreenshot = gui.screenshot(region=(5, 5, 900, 880))
    myscreenshot.save(save_path + folder_name + fr"\screenshot_{counter}.png")
    time.sleep(time_between_screenshots)


""" 
Increases counter by 1 to not overwrite previous screenshots
Counter is always 3-digit number in format XXX
Small numbers have leading zeros
"""
def increment_counter():
    global counter
    counter = int(counter) + 1
    counter = str(counter).zfill(3)


""" 
Checks if current screen state is similar to latest screenshot
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


""" 
pyautogui has FAILSAFE method that when set to True throws FailSafeException if cursor
is put in the upper left corner of the screen
However, exception is sometimes not thrown
This method implements same behaviour, but exception throwing is much more reliable 
"""
def check_for_program_termination():
    x, y = gui.position()
    if x == 0 and y == 0:
        raise gui.FailSafeException


""" 
Main program loop
Stops when mouse is moved to upper left corner of the screen
"""
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
