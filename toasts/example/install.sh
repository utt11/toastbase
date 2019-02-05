#!/bin/bash

echo "I need the firebase credentials"

read -p "Enter API_KEY: " API_KEY
read -p "Enter PROJECT_ID: " PROJECT_ID
read -p "Enter SENDER_ID: " SENDER_ID

DOT_ENV="NODE_PATH=src/
REACT_APP_API_KEY=${API_KEY}
REACT_APP_PROJECT_ID=${PROJECT_ID}
PROJECT_ID=${PROJECT_ID}
REACT_APP_DATABASE_NAME=${PROJECT_ID}
REACT_APP_BUCKET=${PROJECT_ID}
REACT_APP_SENDER_ID=${SENDER_ID}"

NAME="example"
echo "${DOT_ENV}" > toasts/${NAME}/.env

FIREBASE_RC="{
  \"projects\": {
    \"default\": \"${PROJECT_ID}\"
  }
}"

echo "${FIREBASE_RC}" >> toasts/${NAME}/.firebaserc

read -e -p "Enter path to a picture of bully: " BULLY_IMAGE_PATH

BULLY_IMAGE_PATH=${BULLY_IMAGE_PATH//'~'/$HOME}
cp $BULLY_IMAGE_PATH toasts/$NAME/public/images/bully

echo "Okay. Now let's talk about your bully. What's their name?"
read -p "Enter bully name: " BULLY

CONFIG="export default {
  name: '${BULLY}'
};
"

echo $CONFIG > toasts/${NAME}/src/config.js

INDEX="<!DOCTYPE html>
<html lang=\"en\">
  <head>
    <meta charset=\"utf-8\" />
    <link rel=\"shortcut icon\" href=\"%PUBLIC_URL%/images/homescreen64.png\" />
    <meta
      name=\"viewport\"
      content=\"width=device-width, initial-scale=1, shrink-to-fit=no\"
    />
    <meta name=\"theme-color\" content=\"#000000\" />
    <!--
      manifest.json provides metadata used when your web app is added to the
      homescreen on Android. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
    <link rel=\"manifest\" href=\"%PUBLIC_URL%/manifest.json\" />
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the \`public\` folder during the build.
      Only files inside the \`public\` folder can be referenced from the HTML.

      Unlike \"/favicon.ico\" or \"favicon.ico\", \"%PUBLIC_URL%/favicon.ico\" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running \`npm run build\`.
    -->
    <title>Punish ${BULLY}</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id=\"root\"></div>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run \`npm start\` or \`yarn start\`.
      To create a production bundle, use \`npm run build\` or \`yarn build\`.
    -->
  </body>
</html>
"

echo $INDEX > toasts/${NAME}/public/index.html

MANIFEST="{
  \"short_name\": \"Punish ${BULLY}\",
  \"name\": \"Punish ${BULLY}\",
  \"icons\": [
    {
      \"src\": \"images/homescreen64.png\",
      \"sizes\": \"64x64 32x32 24x24 16x16\",
      \"type\": \"image/png\"
    },
    {
      \"src\": \"images/homescreen512.png\",
      \"sizes\": \"192x192\",
      \"type\": \"image/png\"
    },
    {
      \"src\": \"images/homescreen192.png\",
      \"sizes\": \"512x512\",
      \"type\": \"image/png\"
    }
  ],
  \"start_url\": \".\",
  \"display\": \"standalone\",
  \"theme_color\": \"#ffffff\",
  \"background_color\": \"#ffffff\"
}"

echo $MANIFEST > toasts/${NAME}/public/manifest.json

echo
echo "Let's talk about music now."
echo

PS3="What do you want to listen while punishing ${BULLY}? Type a number: "
options=("Metallica - Enter Sandman" "Slayer - Raining blood" "Judas Priest - Night Crawler")
select opt in "${options[@]}"
do
    case $opt in
        "Metallica - Enter Sandman")
            MUSIC="Metallica.mp3"
            echo "you chose Metallica - Enter Sandman"
            break
            ;;
        "Slayer - Raining blood")
            MUSIC="Slayer.mp3"
            echo "you chose Slayer - Raining blood"
            break
            ;;
        "Judas Priest - Night Crawler")
            MUSIC="JudasPriest.mp3"
            echo "you chose Judas Priest - Night Crawler"
            break
            ;;
        *)
            MUSIC="JudasPriest.mp3"
            echo "you chose Judas Priest - Night Crawler"
            break
            ;;
    esac
done

rm -f toasts/${NAME}/public/music/theme.mp3
ln -s "./${MUSIC}" toasts/${NAME}/public/music/theme.mp3

docker-compose up -d $NAME
docker-compose exec $NAME bash -c "source ~/.profile
cd /var/www/repo/public/images
convert -remap Palette_NTSC.png bully -resize 256x256^ -gravity Center -extent 256x256 -scale 200% homescreen512.png
convert homescreen512.png -resize 192x192 homescreen192.png 
convert homescreen512.png -resize 64x64 homescreen64.png
"

docker-compose exec $NAME bash /scripts/deploy.sh
docker-compose stop $NAME
