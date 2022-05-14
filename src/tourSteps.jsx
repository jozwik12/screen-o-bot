const steps = [
  {
    selector: "body",
    content:
      "Witaj użytkowniku! Naciśnij strzałkę w prawo, aby dowiedzieć się więcej",
  },
  {
    selector: "body",
    content:
      "Ten program umożliwia wykonywanie screenshotów wybranego przez ciebie obszaru ekranu. Screenshoty zostaną wykonane w momencie, w którym zawartość ekranu się zmieni",
  },
  {
    selector: ".SavePath",
    content:
      "Pod tą ścieżką zostanie stworzony nowy folder, w którym zostaną umieszczone wykonane screenshoty",
  },
  {
    selector: ".ChooseSavePath",
    content: "Tym przyciskiem możesz zmienić ścieżkę zapisu",
  },
  {
    selector: ".RecorderButton",
    content:
      "Tym przyciskiem otworzysz okno za pomocą którego wybierzesz jaki obszar ekranu będzie przechwytywany. Spróbuj teraz!",
  },
  {
    selector: ".RecorderButton",
    content:
      "Okno możesz swobodnie przeciągać i zmieniać rozmiar. Przechwycony zostanie obszar wewnątrz czerwonej ramki. Naciśnij przycisk ponownie aby rozpocząć nagrywanie",
  },
  {
    selector: ".RecorderButton",
    content:
      "Nagrywanie trwa. Aby je przerwać naciśnij przycisk ponownie. Folder ze screenshotami otworzy się automatycznie",
  },
  {
    selector: ".Help",
    content: "Pod tym przyciskiesz znajdziesz krótki tutorial obsługi programu",
  },
  {
    selector: ".ProjectInfo",
    content: "Kliknij tutaj, aby dowiedzieć się więcej o projekcie",
  },
  {
    selector: ".Disclaimer",
    content: "Aby wyświetlić ponownie zastrzeżenie autora, kliknij tutaj",
  },
  {
    selector: "body",
    content:
      "To tyle! Miłego screenshotowania! Jeśli możesz, wystaw gwiazdkę na GitHubie",
  },
];

export default steps;
