# Sqlite
## set up sqlite3

    brew install sqlite3


# Mysql
Docker mysql: https://hub.docker.com/_/mysql/

    # pull mysql image
    docker pull mysql:5.7

    # init mysql docker container
    make docker_mysql_init

    # start mysql docker container
    make docker_msyql_start

    # stop
    make docker_msyql_stop





