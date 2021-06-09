#! /bin/sh

docker stop validworks
docker rm validworks
docker build --no-cache -t validworks-frontend:dev .
docker create --name validworks -p 3000:3000 --restart unless-stopped validworks-frontend:dev
docker start validworks