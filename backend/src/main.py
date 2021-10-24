import os
import pyautogui as gui
import time
import datetime as dt
import winsound

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

# Default folder for screens
# TODO: some input method instead of hardcoding it
# save_path = os.path.expanduser('~') + r"\Desktop\pyscreens"
save_path = os.path.expanduser('~') + r"\OneDrive - Politechnika Wroclawska\II stopien\9 sem\pyscreens"

# Default folder name, set after invoking create_dated_folder() method
folder_name = ""


def get_main_folder_path():
    main_path = os.path.realpath(__file__).split("\\")
    main_path = main_path[:-2]
    return "\\".join(main_path)


def get_excluded_path():
    excluded_path = get_main_folder_path() + r"\excluded"
    return excluded_path


def list_excluded_files():
    list_temp = [f for f in os.listdir(get_excluded_path())
                 if os.path.isfile(os.path.join(get_excluded_path(), f))]
    list_temp = [get_excluded_path() + "\\" + elem for elem in list_temp]
    return list_temp


# Make list of excluded files constant to improve performance
list_of_excluded_files = list_excluded_files()


def create_dated_folder():
    """
    Creates folder with current date and time in format YYYY-MM-DD hh-mm
    Every screenshot taken during current session is stored inside this folder
    When program is run twice in the same minute, files from later session overwrites
    files from earlier one
    """
    global folder_name
    folder_name = "\\" + dt.datetime.now().strftime("%Y-%m-%d %H.%M")
    try:
        os.makedirs(save_path + folder_name)
        print(save_path + folder_name)
    except FileExistsError:
        pass


def take_screenshot():
    """
    Takes screenshot of the specified screen region
    """
    # TODO: check best time_between_screenshots time
    # TODO: implement something to specify screen region instead of hardcoding it
    increment_counter()
    myscreenshot = gui.screenshot(region=(5, 30, 1700, 1020))
    myscreenshot.save(save_path + folder_name + fr"\screenshot_{counter}.png")
    time.sleep(time_between_screenshots)


def play_notification_sound():
    # TODO: odd option to turn the sound on/off
    # TODO: check if asynchronous playing is necessary
    # TODO: add volume control
    winsound.MessageBeep(type=winsound.MB_ICONHAND)


def increment_counter():
    """
    Increases counter by 1 to not overwrite previous screenshots
    Counter is always 3-digit number in format XXX
    Small numbers have leading zeros
    """
    global counter
    counter = int(counter) + 1
    counter = str(counter).zfill(4)


def sth_excluded_is_on_screen():
    global list_of_excluded_files
    for excluded_elem in list_of_excluded_files:
        try:
            loc = gui.locateOnScreen(excluded_elem, confidence=excluded_comparison_confidence)
            return bool(loc)
        except gui.ImageNotFoundException:
            pass
    return False


def screen_has_changed():
    """
    Checks if current screen state is similar to latest screenshot
    returns true if there is difference between current, and previous screenshot
    meaning - screenshot should be taken, as screen state has changed
    returns false if previous screenshot is the same as current screen state
    """
    try:
        loc = gui.locateOnScreen(save_path + folder_name + fr"\screenshot_{counter}.png",
                                 confidence=comparison_confidence)
        return not bool(loc)
    except gui.ImageNotFoundException:
        return True


def check_for_program_termination():
    """
    pyautogui has FAILSAFE method that when set to True throws FailSafeException if cursor
    is put in the upper left corner of the screen
    However, exception is sometimes not thrown
    This method implements same behaviour, but exception throwing is much more reliable
    """
    x, y = gui.position()
    if x == 1919 and y == 1079:
        raise gui.FailSafeException


def main_loop():
    """
    Main program loop
    Stops when mouse is moved to upper left corner of the screen
    """
    create_dated_folder()
    take_screenshot()
    print("program works")
    while True:
        time.sleep(0.2)
        try:
            check_for_program_termination()
        except gui.FailSafeException:
            gui.alert(text="Program has been stopped", title="Program terminated")
            exit()
        if screen_has_changed() and not sth_excluded_is_on_screen():
            take_screenshot()
            play_notification_sound()


if __name__ == "__main__":
    main_loop()
