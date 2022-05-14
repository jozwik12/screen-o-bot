cd python
IF NOT EXIST venv\ (
    cmd /k "python -m venv .\venv & .\venv\Scripts\activate & pip install -r .\requirements.txt & pyinstaller src\main.py --clean"
) ELSE (
    cmd /k "rmdir /s /Q .\build & rmdir /s /Q .\dist & .\venv\Scripts\activate & pyinstaller src\main.py --clean"
)
PAUSE