#!/bin/bash

MONO_VERSION=1.0.0
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
sudo docker pull mendesco/manos-node-mono:${MONO_VERSION}
sudo docker pull mendesco/manos-nginx-webserver:${NGINX_VERSION}

clear
echo "running containers..."
sudo kill -9 $(sudo lsof -t -i:3000)
sudo docker run -tdp 3000:3000 --name manos-mono mendesco/manos-node-mono:${MONO_VERSION}
sudo docker start manos-mono

sudo kill -9 $(sudo lsof -t -i:80)
sudo docker run -tdp 80:80 --name manos-nginx mendesco/manos-nginx-webserver:${NGINX_VERSION}
sudo docker start manos-nginx

clear
echo "creating aliases..."
# ALIASES
sudo echo "alias stop-mono='sudo docker stop manos-mono'" >>$HOME/.bash_aliases
sudo echo "alias stop-nginx='sudo docker stop manos-nginx'" >>$HOME/.bash_aliases
sudo echo "alias stop-all-nginx='stop-mono && stop-nginx'" >>$HOME/.bash_aliases

sudo echo "alias start-mono='sudo docker start manos-mono'" >>$HOME/.bash_aliases
sudo echo "alias start-nginx='sudo docker start manos-nginx'" >>$HOME/.bash_aliases
sudo echo "alias start-all-nginx='start-mono && start-nginx'" >>$HOME/.bash_aliases

sudo echo "alias rm-mono='sudo docker rm -f manos-mono'" >>$HOME/.bash_aliases
sudo echo "alias rm-nginx='sudo docker rm -f manos-nginx'" >>$HOME/.bash_aliases
sudo echo "alias rm-all-nginx='rm-mono && rm-nginx'" >>$HOME/.bash_aliases

sudo echo "alias rmi-mono='sudo docker rmi -f mendesco/manos-node-mono:${MONO_VERSION}'" >>$HOME/.bash_aliases
sudo echo "alias rmi-nginx='sudo docker rmi -f mendesco/manos-nginx-webserver:${NGINX_VERSION}'" >>$HOME/.bash_aliases
sudo echo "alias rmi-all-nginx='rmi-mono && rmi-nginx'" >>$HOME/.bash_aliases

sudo echo "alias clean-port-mono='sudo kill -9 $(sudo lsof -t -i:3000)'" >>$HOME/.bash_aliases
sudo echo "alias clean-port-nginx='sudo kill -9 $(sudo lsof -t -i:80)'" >>$HOME/.bash_aliases
sudo echo "alias clean-port-all-nginx='clean-port-mono && clean-port-nginx'" >>$HOME/.bash_aliases

sudo echo "alias run-mono='sudo docker run -tdp 3000:3000 --name manos-mono mendesco/manos-node-mono:${MONO_VERSION}'" >>$HOME/.bash_aliases
sudo echo "alias run-nginx='sudo docker run -tdp 80:80 --name manos-nginx mendesco/manos-nginx-webserver:${NGINX_VERSION}'" >>$HOME/.bash_aliases
sudo echo "alias run-all-nginx='run-mono && run-nginx'" >>$HOME/.bash_aliases

sudo echo "alias clean-run-mono='rm-mono && clean-port-mono && run-mono'" >>$HOME/.bash_aliases
sudo echo "alias clean-run-nginx='rm-nginx && clean-port-nginx && run-nginx'" >>$HOME/.bash_aliases
sudo echo "alias clean-run-all-nginx='rm-all-nginx && clean-port-all-nginx && run-all-nginx'" >>$HOME/.bash_aliases

sudo echo "alias manos-help='
echo ""stop-mono -\> stops manos-mono container""
echo ""stop-nginx -\> stops manos-nginx container""
echo ""stop-all-nginx -\> stop all containers including nginx""
echo ""start-mono -\> starts manos-mono container""
echo ""start-nginx -\> starts manos-nginx container""
echo ""start-all-nginx -\> start all containers including nginx""
echo ""rm-mono -\> removes manos-mono container""
echo ""remove-nginx -\> removes manos-nginx container""
echo ""remove-all-nginx -\> remove all containers including nginx""
echo ""rmi-mono -\> removes manos-mono image""
echo ""remove-nginx -\> removes manos-nginx image""
echo ""remove-all-nginx -\> remove all images including nginx""
echo ""clean-port-mono -\> clean mono port from other processes that is used by manos-mono""
echo ""clean-port-nginx -\> clean nginx port from other processes that is used by manos-nginx""
echo ""clean-port-all-nginx -\> clean all ports to be used including nginx""
echo ""run-mono -\> runs manos-mono container""
echo ""run-nginx -\> runs manos-nginx container""
echo ""run-all-nginx -\> runsrun all containers including nginx""
echo ""clean-run-mono -\> cleaning runs manos-mono container""
echo ""clean-run-nginx -\> cleaning runs manos-nginx container""
echo ""clean-run-all-nginx -\> cleaning run all containers including nginx""
'" >>$HOME/.bash_aliases

echo "use 'manos-help' to list commands"

sleep 3

exec bash
