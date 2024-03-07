$Env:PG_DATABASE = 'technostrelka_pg'
$Env:PG_USERNAME = 'postgres'
$Env:PG_PASSWORD = '1234'
$Env:PG_HOST = 'localhost'
$Env:PG_PORT = '5432'

$Env:SERVER_HOST = 'localhost'
$Env:SERVER_PORT = '5444'

docker compose --env-file .env.local up postgres --env 