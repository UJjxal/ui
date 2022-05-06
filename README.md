# INCEDO DATA SCIENCE PLATFORM


## Getting Started
To test, contribute or just see what we did follow few easy steps:
- clone the repository
- cd to the directory with the repository
- run `yarn install` (or `npm install` if you don't use yarn)
- run the app using `yarn start` (or `npm start`)
- to build project use `yarn run build` (or `npm run build`)

## Bugs
If you want to report a bug or submit your idea feel fre to open an issue

Before you report a bug, please take your time to find if an issue hasn't been reported yet

We're also open to pull requests

## Something Missing?
If you still have some questions do not hesitate to ask us. 


## Deployment Steps
Docker Image for React base web server
Create a base image (centos:latest) on server (10.11.X.X)
# docker pull centos
Create first container on centos:latest images for react base web server and logged in .
$ docker run -it --name Incedo-DSPlatform -h react-frontend -p 35:22 -p 8035:3000 centos:latest

## Install following services on react container
- $ yum install openssh-server
- $ yum install wget
- $ yum install vim
- $ yum install curl
- $ yum install git

## Install node.js on this container
- $ curl -sL https://rpm.nodesource.com/setup_12.x | bash -
- $ yum -y install nodejs
- $ yum install gcc-c++ make

## Testing nodejs and npm
- $ node --version
- $ npm --version

Need to run following command on container for outside ssh access
- $ ssh-keygen -f /etc/ssh/ssh_host_rsa_key
- $ ssh-keygen -f /etc/ssh/ssh_host_ecdsa_key
- $ ssh-keygen -f /etc/ssh/ssh_host_ed25519_key
- $ /usr/sbin/sshd

install create -react-app in /usr/src/app
- $ mkdir /usr/src/app
- $ cd /usr/src/app
- $ npm install -g create-react-app
create react app 
create-react-app reactapp
- $ cd /reactapp
- $ npm start
npm will run 3000 port by default and able to access 8085 port for outside
URL for npm : http://10.11.X.X:8035
Finally save the npm image
first exit from npm docker container and run this command to commit the npm image 
- $ docker commit -m "npm react installed" react centos:npm-react-frontend
run npm container in exec mode
- $ docker exec -it npm /bin/bash 
- $ /usr/sbin/sshd
