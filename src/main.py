import pyautogui as gui
import time

gui.PAUSE = 1
gui.FAILSAFE = True
counter = 1

while True:
    try:
        myscreenshot = gui.screenshot()
        myscreenshot.save(fr"C:\Users\TITAN\Desktop\pyscreens\screenshot_{counter}.png")
        counter += 1
        time.sleep(2)
        x, y = gui.position()
        if x == 0 and y == 0:
            raise gui.FailSafeException
    except gui.FailSafeException:
        gui.alert("Program has been stopped")
        exit()
