#!/bin/bash

BACK_VERSION=1.0.0
FRONT_VERSION=1.0.2
NGINX_VERSION=1.0.0

echo "updating system..."
sudo apt update && sudo apt upgrade -y

clear
echo "installing docker..."
sudo apt install docker.io -y
sudo systemctl enable docker
sudo systemctl start docker

clear
echo "downloading docker images..."
sudo docker pull mendesco/manos-node-back:${BACK_VERSION}
sudo docker pull mendesco/manos-node-front:${FRONT_VERSION}
sudo docker pull mendesco/manos-nginx-webserver:${NGINX_VERSION}

clear
echo "running containers..."
sudo kill -9 $(sudo lsof -t -i:8082)
sudo docker run -td --network host --name manos-back mendesco/manos-node-back:${BACK_VERSION}
sudo docker start manos-back

sudo kill -9 $(sudo lsof -t -i:3000)
sudo docker run -tdp 3000:3000 --name manos-front mendesco/manos-node-front:${FRONT_VERSION}
sudo docker start manos-front

sudo kill -9 $(sudo lsof -t -i:80)
sudo docker run -tdp 80:80 --name manos-nginx mendesco/manos-nginx-webserver:${NGINX_VERSION}
sudo docker start manos-nginx

clear
echo "creating aliases..."
# ALIASES
sudo echo "alias stop-back='sudo docker stop manos-back'" >>$HOME/.bash_aliases
sudo echo "alias stop-front='sudo docker stop manos-front'" >>$HOME/.bash_aliases
sudo echo "alias stop-all='stop-back && stop-front'" >>$HOME/.bash_aliases
sudo echo "alias stop-nginx='sudo docker stop manos-nginx'" >>$HOME/.bash_aliases
sudo echo "alias stop-all-nginx='stop-back && stop-front && stop-nginx'" >>$HOME/.bash_aliases

sudo echo "alias start-back='sudo docker start manos-back'" >>$HOME/.bash_aliases
sudo echo "alias start-front='sudo docker start manos-front'" >>$HOME/.bash_aliases
sudo echo "alias start-all='start-back && start-front'" >>$HOME/.bash_aliases
sudo echo "alias start-nginx='sudo docker start manos-nginx'" >>$HOME/.bash_aliases
sudo echo "alias start-all-nginx='start-back && start-front && start-nginx'" >>$HOME/.bash_aliases

sudo echo "alias rm-back='sudo docker rm -f manos-back'" >>$HOME/.bash_aliases
sudo echo "alias rm-front='sudo docker rm -f manos-front'" >>$HOME/.bash_aliases
sudo echo "alias rm-all='rm-back && rm-front'" >>$HOME/.bash_aliases
sudo echo "alias rm-nginx='sudo docker rm -f manos-nginx'" >>$HOME/.bash_aliases
sudo echo "alias rm-all-nginx='rm-back && rm-front && rm-nginx'" >>$HOME/.bash_aliases

sudo echo "alias rmi-back='sudo docker rmi -f mendesco/manos-node-back:${BACK_VERSION}'" >>$HOME/.bash_aliases
sudo echo "alias rmi-front='sudo docker rmi -f mendesco/manos-node-front:${FRONT_VERSION}'" >>$HOME/.bash_aliases
sudo echo "alias rmi-all='rmi-back && rmi-front && sudo docker image prune --filter="dangling=true"'" >>$HOME/.bash_aliases
sudo echo "alias rmi-nginx='sudo docker rmi -f mendesco/manos-nginx-webserver:${NGINX_VERSION}'" >>$HOME/.bash_aliases
sudo echo "alias rmi-all-nginx='rmi-back && rmi-front && rmi-nginx && sudo docker image prune --filter="dangling=true"'" >>$HOME/.bash_aliases

sudo echo "alias clean-port-back='sudo kill -9 $(sudo lsof -t -i:8082)'" >>$HOME/.bash_aliases
sudo echo "alias clean-port-front='sudo kill -9 $(sudo lsof -t -i:3000)'" >>$HOME/.bash_aliases
sudo echo "alias clean-port-all='clean-port-back && clean-port-front'" >>$HOME/.bash_aliases
sudo echo "alias clean-port-nginx='sudo kill -9 $(sudo lsof -t -i:80)'" >>$HOME/.bash_aliases
sudo echo "alias clean-port-all-nginx='clean-port-back && clean-port-front && clean-port-nginx'" >>$HOME/.bash_aliases

sudo echo "alias run-back='sudo docker run -td --network host --name manos-back mendesco/manos-node-back:${BACK_VERSION}'" >>$HOME/.bash_aliases
sudo echo "alias run-front='sudo docker run -tdp 3000:3000 --name manos-front mendesco/manos-node-front:${FRONT_VERSION}'" >>$HOME/.bash_aliases
sudo echo "alias run-all='run-back && run-front'" >>$HOME/.bash_aliases
sudo echo "alias run-nginx='sudo docker run -tdp 80:80 --name manos-nginx mendesco/manos-nginx-webserver:${NGINX_VERSION}'" >>$HOME/.bash_aliases
sudo echo "alias run-all-nginx='run-back && run-front && run-nginx'" >>$HOME/.bash_aliases

sudo echo "alias clean-run-back='rm-back && clean-port-back && run-back'" >>$HOME/.bash_aliases
sudo echo "alias clean-run-front='rm-front && clean-port-front && run-front'" >>$HOME/.bash_aliases
sudo echo "alias clean-run-all='rm-all && clean-port-all && run-all'" >>$HOME/.bash_aliases
sudo echo "alias clean-run-nginx='rm-nginx && clean-port-nginx && run-nginx'" >>$HOME/.bash_aliases
sudo echo "alias clean-run-all-nginx='rm-all-nginx && clean-port-all-nginx && run-all-nginx'" >>$HOME/.bash_aliases

sudo echo "alias manos-help='
echo ""stop-back -\> stops manos-back container""
echo ""stop-front -\> stops manos-front container""
echo ""stop-all -\> stop all containers""
echo ""stop-nginx -\> stops manos-nginx container""
echo ""stop-all-nginx -\> stop all containers including nginx""
echo ""start-back -\> starts manos-back container""
echo ""start-front -\> starts manos-front container""
echo ""start-all -\> start all containers""
echo ""start-nginx -\> starts manos-nginx container""
echo ""start-all-nginx -\> start all containers including nginx""
echo ""rm-back -\> removes manos-back container""
echo ""rm-front -\> removes manos-front container""
echo ""rm-all -\> remove all containers""
echo ""remove-nginx -\> removes manos-nginx container""
echo ""remove-all-nginx -\> remove all containers including nginx""
echo ""rmi-back -\> removes manos-back image""
echo ""rmi-front -\> removes manos-front image""
echo ""rmi-all -\> remove all images""
echo ""remove-nginx -\> removes manos-nginx image""
echo ""remove-all-nginx -\> remove all images including nginx""
echo ""clean-port-back -\> clean back port from other processes that is used by manos-back""
echo ""clean-port-front -\> clean front port from other processes that is used by manos-front""
echo ""clean-port-all -\> clean all ports to be used""
echo ""clean-port-nginx -\> clean nginx port from other processes that is used by manos-nginx""
echo ""clean-port-all-nginx -\> clean all ports to be used including nginx""
echo ""run-back -\> runs manos-back container""
echo ""run-front -\> runs manos-front container""
echo ""run-all -\> run all containers""
echo ""run-nginx -\> runs manos-nginx container""
echo ""run-all-nginx -\> runsrun all containers including nginx""
echo ""clean-run-back -\> cleaning runs manos-back container""
echo ""clean-run-front -\> cleaning runs manos-front container""
echo ""clean-run-all -\> cleaning run all containers""
echo ""clean-run-nginx -\> cleaning runs manos-nginx container""
echo ""clean-run-all-nginx -\> cleaning run all containers including nginx""
'" >>$HOME/.bash_aliases

echo "use 'manos-help' to list commands"

sleep 3

exec bash
