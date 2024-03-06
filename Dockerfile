FROM python:3.11-alpine
WORKDIR /
COPY ./ ./
RUN pip3 install -r requirements.txt
ENV PG_DATABASE="technostrelka_pg"
ENV PG_USERNAME="postgres"
ENV PG_PASSWORD="1234"
ENV PG_PORT="5432"
ENV PG_HOST="localhost"
ENV SERVER_HOST="localhost"
ENV SERVER_PORT="5444"
ENTRYPOINT ["python3", "app.py"]