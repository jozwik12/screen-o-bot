import time
import pyautogui

while True:
    time.sleep(1)
    print(pyautogui.position())
    x, y = pyautogui.position()
    if x == 0 and y == 0:
        exit()
