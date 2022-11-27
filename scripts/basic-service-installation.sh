#!/bin/bash

sudo apt update && sudo apt upgrade

sudo apt-get install curl -y

sudo apt install nodejs -y
sudo ln -s "$(which node)" /usr/bin/node

sudo git clone --branch main --single-branch https://redway-admin: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@github.com/RED-WAY/MANOSite.git $HOME/REDWAY/MANOSite
sudo apt-get install git -y

sudo apt install npm -y

# use '--prefix' to refer specific folder
sudo npm install --prefix $HOME/REDWAY/MANOSite/site

sudo echo "
[Unit]
Description=manOS
After=multi-user.target

[Service]
Type=simple
ExecStart=/usr/bin/node /home/ubuntu/REDWAY/MANOSite/site/app.js
Restart=always
RestartSec=60
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=manOS
User=ubuntu

[Install]
WantedBy=multi-user.target
" >/etc/systemd/system/manOS.service

sudo systemctl enable manOS.service
sudo systemctl start manOS.service
