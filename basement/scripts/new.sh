#!/bin/bash

source ~/.profile
firebase login --no-localhost

cd /var/www/repo
firebase init

yarn start
