FROM mysql:8.0

ENV MYSQL_ROOT_PASSWORD='root'
ENV MYSQL_DATABASE='db'

COPY ./database.sql /docker-entrypoint-initdb.d/
