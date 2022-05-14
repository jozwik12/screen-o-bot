# Screen-o-bot

Screen-o-bot is a desktop app that automates and optimizes taking screnshots, taking them only when screen changes.

## Disclaimer

Always make sure that you **are allowed** to take the screenshot of your screen content.

This program is a learning repo for author to get familiar with web technologies. It was created for personal purposes only.

Creator of this script is not responsible in any way for the use or misuse of this program.

## Usage

Explained in tutorial section of program (questionmark icon)

## Build and development

Install dependencies:
```bash
yarn install
```
Build (or rebuild) python script by running
```bash
build-python-script.bat
```
Run program:
```bash
yarn start
```
To build and distribute:
```bash
yarn clean
yarn dist
```

## Python dependencies 

Python script working as screen recognition base depends on:
- [Python 3.4 or newer](https://www.python.org/)
- [pyautogui](https://pyautogui.readthedocs.io/en/latest/)
- [Pillow](https://pypi.org/project/Pillow/)
- [OpenCV for Python](https://pypi.org/project/opencv-python/)

Due to [pyautogui](https://pyautogui.readthedocs.io/en/latest/) limitations taking screenshots is only possible on main monitor. There is a [rudimentary solution](https://github.com/asweigart/pyautogui/issues/321#issuecomment-777922493) for this issue, but it's not compatible with Electron screen coordinate system program relies on. Currently there are no plans to add multiple monitors support. If you want to do it, you're most certainly welcome.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[GNU GPL-3.0](https://choosealicense.com/licenses/gpl-3.0/#)

