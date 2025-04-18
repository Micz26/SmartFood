# Etap 1: obraz bazowy
FROM python:3.11-slim

# Etap 2: ustawienie zmiennych środowiskowych
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Etap 3: ustawienie katalogu roboczego
WORKDIR /app

# Etap 4: kopiowanie plików
COPY pyproject.toml .
COPY .env .env
COPY . /app


# Etap 5: instalacja zależności
RUN pip install --upgrade pip \
    && pip install .

# Etap 6: uruchomienie aplikacji
CMD ["uvicorn", "smart_food.serve:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
