#!/bin/bash

source ~/.profile
firebase login --no-localhost

cd /var/www/repo

npm i
npm build
firebase deploy --project $PROJECT_ID
