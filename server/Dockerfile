FROM python:3.11.3

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY wait-for-it.sh .

RUN ls -a

COPY . .

ENV DOCKER=True

EXPOSE 51717:51717

RUN chmod +x wait-for-it.sh

CMD ["./wait-for-it.sh", "database:3306", "--", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "51717"]