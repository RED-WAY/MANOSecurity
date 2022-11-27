#!/bin/bash

DOCKER_USERNAME="mendesco"
DOCKER_PASSWORD="#Docker153624"

BACK_VERSION=1.0.0
FRONT_VERSION=1.0.0

sudo apt update && sudo apt upgrade -y

sudo apt install docker.io -y
sudo systemctl enable docker
sudo systemctl start docker

sudo docker login --username ${DOCKER_USERNAME} --password ${DOCKER_PASSWORD}

sudo docker pull mendesco/manos-node-back:${BACK_VERSION}
sudo docker pull mendesco/manos-node-front:${FRONT_VERSION}

sudo kill -9 $(sudo lsof -t -i:8082)
sudo docker run -tdp 8082:8082 --name manos-back mendesco/manos-node-back:${BACK_VERSION}
sudo docker start manos-back

sudo kill -9 $(sudo lsof -t -i:3000)
sudo docker run -tdp 3000:3000 --name manos-front mendesco/manos-node-front:${FRONT_VERSION}
sudo docker start manos-front

# ALIASES
sudo echo "alias stop-back='sudo docker stop manos-back'" >>$HOME/.bash_aliases
sudo echo "alias stop-front='sudo docker stop manos-front'" >>$HOME/.bash_aliases
sudo echo "alias stop-all='stop-back && stop-front'" >>$HOME/.bash_aliases

sudo echo "alias start-back='sudo docker start manos-back'" >>$HOME/.bash_aliases
sudo echo "alias start-front='sudo docker start manos-front'" >>$HOME/.bash_aliases
sudo echo "alias start-all='start-back && start-front'" >>$HOME/.bash_aliases

sudo echo "alias rm-back='sudo docker rm -f manos-back'" >>$HOME/.bash_aliases
sudo echo "alias rm-front='sudo docker rm -f manos-front'" >>$HOME/.bash_aliases
sudo echo "alias rm-all='rm-back && rm-front'" >>$HOME/.bash_aliases

sudo echo "alias clean-port-back='sudo kill -9 $(sudo lsof -t -i:8082)'" >>$HOME/.bash_aliases
sudo echo "alias clean-port-front='sudo kill -9 $(sudo lsof -t -i:3000)'" >>$HOME/.bash_aliases
sudo echo "alias clean-port-all='clean-port-back && clean-port-front'" >>$HOME/.bash_aliases

sudo echo "alias run-back='rm-back && clean-port-back && sudo docker run -tdp 8082:8082 --name manos-back mendesco/manos-node-back:${BACK_VERSION}'" >>$HOME/.bash_aliases
sudo echo "alias run-front='rm-front && clean-port-front && sudo docker run -tdp 3000:3000 --name manos-front mendesco/manos-node-front:${FRONT_VERSION}'" >>$HOME/.bash_aliases
sudo echo "alias run-all='run-back && run-front'" >>$HOME/.bash_aliases
