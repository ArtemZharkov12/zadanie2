# Zadanie 2: Programowanie Aplikacji w Chmurze Obliczeniowej

## Opis
Ten projekt zawiera aplikację z zadania nr 1 oraz skonfigurowany łańcuch CI z laboratorium nr 9, uzupełniony o testowanie obrazu pod kątem podatności na zagrożenia za pomocą Docker Scout oraz publikowanie obrazu do GitHub Container Registry i Docker Hub.

## Konfiguracja CI

### Checkout code
Pierwszy krok polega na pobraniu kodu źródłowego z repozytorium przy użyciu akcji `actions/checkout@v2`.

### Set up Docker Buildx
Konfiguracja Docker Buildx, narzędzia do budowania obrazów Docker dla wielu architektur, przy użyciu akcji `docker/setup-buildx-action@v2`.

### Set up QEMU
Konfiguracja QEMU, umożliwiająca emulację różnych architektur sprzętowych, przy użyciu akcji `docker/setup-qemu-action@v2`.

### Log in to GitHub Container Registry
Logowanie do GitHub Container Registry przy użyciu akcji `docker/login-action@v2`. Logowanie odbywa się z użyciem nazwy użytkownika oraz tokenu przechowywanego w sekrecie `GHCR_TOKEN`.

### Log in to Docker Hub
Logowanie do Docker Hub przy użyciu akcji `docker/login-action@v2`. Logowanie odbywa się z użyciem nazwy użytkownika oraz tokenu przechowywanego w sekrecie `DOCKERHUB_USERNAME` i `DOCKERHUB_TOKEN`.

### Cache Docker layers
Użycie akcji `actions/cache@v2` w celu cache'owania warstw Docker, aby przyspieszyć proces budowania obrazów Docker.

### Build Docker image
Budowanie obrazu Docker przy użyciu akcji `docker/build-push-action@v3`. Obraz jest budowany, ale nie publikowany na tym etapie (push: false). Używany jest cache z obrazu `psevdo12/zad2:cache` oraz tworzony jest cache dla `psevdo12/zadanie2:cache`.

### Install Docker Scout CLI
Instalacja narzędzia Docker Scout CLI, które będzie używane do analizy obrazu Docker pod kątem podatności na zagrożenia.

### Analyze Docker image with Docker Scout
Analiza obrazu Docker pod kątem podatności na zagrożenia przy użyciu narzędzia Docker Scout. Wynik analizy jest zapisywany do pliku `scout-output.sarif`.

### Docker Scout Analysis for High Vulnerabilities
Analiza pliku wynikowego `scout-output.sarif` w celu sprawdzenia, czy zawiera wysokie podatności. Jeśli znajdą się jakiekolwiek wysokie podatności, pipeline zakończy się niepowodzeniem i obraz nie zostanie opublikowany.

### Docker Scout Analysis for Critical Vulnerabilities
Analiza pliku wynikowego `scout-output.sarif` w celu sprawdzenia, czy zawiera krytyczne podatności. Jeśli znajdą się jakiekolwiek krytyczne podatności, pipeline zakończy się niepowodzeniem i obraz nie zostanie opublikowany.

### Push Docker image to GitHub Container Registry
Publikowanie obrazu Docker do GitHub Container Registry, jeśli analiza Docker Scout zakończy się sukcesem. Obraz jest oznaczany jako `latest`.

### Push Docker image to Docker Hub
Publikowanie obrazu Docker do Docker Hub, jeśli analiza Docker Scout zakończy się sukcesem. Obraz jest oznaczany jako `latest`.

## Wnioski
Łańcuch CI został skonfigurowany w taki sposób, aby budować i testować obrazy Docker dla wielu architektur sprzętowych oraz publikować je w publicznym rejestrze obrazów Docker (zarówno GitHub Container Registry, jak i Docker Hub) tylko wtedy, gdy nie zawierają krytycznych lub wysokich podatności.

W obraze z zadania 1(https://github.com/artemzharkov12/Zadanie1) miałem 1 wysoką podatność i dla tego "Test 1" nie został zakończony.
![Docker Hub](images/obraz_zad1.png)


Dlatego stworzyłem nowy Dockerfile(jest w tym katalogu) i jego obraz na dockerhabie(https://hub.docker.com/repository/docker/psevdo12/zad2/general). Jak widać nie ma on nie wysokich nie krytycznych podatności.
![Docker Hub](images/obraz_zad2.png)

Po przewodzienu suksesywnie zakończonej akcji "Test2" został stworzony obrz na dockerhubie(https://hub.docker.com/repository/docker/psevdo12/zadanie2/general) i github container registry(https://github.com/artemzharkov12/zadanie2/pkgs/container/zadanie2).
![Docker Hub](images/wynik.png)
