import pyautogui as gui
import time

gui.PAUSE = 0.05
gui.FAILSAFE = True
counter = 0
time_between_screenshots = 2
comparison_confidence = 0.9


def take_screenshot():
    myscreenshot = gui.screenshot()
    global counter
    counter += 1
    myscreenshot.save(fr"C:\Users\TITAN\Desktop\pyscreens\screenshot_{counter}.png")
    time.sleep(time_between_screenshots)


"""
Checks if current screen state is similar to latest screenshot
returns true if there is difference between current, and previous screenshot
    meaning - screenshot should be taken, as screen state has changed
returns false if previous screenshot is the same as current screen state
"""
def compare_screenshots():
    global counter
    try:
        loc = gui.locateOnScreen(fr"C:\Users\TITAN\Desktop\pyscreens\screenshot_{counter}.png",
                                 confidence=comparison_confidence)
        return not bool(loc)
    except gui.ImageNotFoundException:
        return True


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
