#!/bin/bash

source ~/.profile
firebase login --no-localhost

cd /var/www/repo

yarn
yarn build
# firebase deploy --project $PROJECT_ID
echo "Deployed to https://demonstration-5aa44.firebaseapp.com/"
