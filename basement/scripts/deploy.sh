#!/bin/bash

source ~/.profile
firebase login --no-localhost

cd /var/www/repo

yarn
yarn build
firebase deploy --project $PROJECT_ID
