# Use the Python base image
FROM python:3.11.2-bullseye

WORKDIR /app

COPY requirements.txt /app/requirements.txt

RUN pip install -r requirements.txt

COPY . /app

ENV DOCKER=True

EXPOSE 51717:51717

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "51717"]
