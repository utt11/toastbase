# Toastbase

<p align="center">
  <img src="https://github.com/utt11/toastbase/raw/master/toaster.png"/>
</p>

Toastbase is a serverless constructor of serverless PWA.

However it sounds, it is a very little repository-collection of `Dockerfile`-s, `docker-compose.yml`, several `bash` scripts and a template for quick start.

## How does it work?

Toastbase is a docker multi-container application. Each PWA has a corresponding service in the docker environment (called a Toast). Toastbase defines image "toastbase:basement" which uses `yarn` and `firebase`, and it is used by every toast.

A toast can be used for both developing and deploying the app.

## Commands

You are free to use docker by your own, but usually you do not need to. There are several commands in `/bin`, which cover most usages.

```
bash bin/init.sh
```

Creates image needed by toasts. You should run it before any other command.

```
NAME=name API_KEY=api_key PROJECT_ID=project_id SENDER_ID=sender_id bash bin/new.sh
```

Creates a new PWA. It neither starts the development server, nor deploys it.

```
NAME=name bash bin/start.sh
```

Starts the development server of one PWA. It does not deploy it. You can look up its port in `docker-compose.yml`.

```
NAME=name bash bin/stop.sh
```

Stops the development server of one PWA.

```
NAME=name bash bin/logs.sh
```

Follows logs of one PWA.

```
NAME=name bash bin/deploy.sh
```

Deploys PWA to Firebase.

# Getting started

### Create new project

Open https://console.firebase.google.com/ and create a new project.

### Enable Google Auth

Inside firebase console, turn on Google authentication.

### Initialize your DB

Inside firebase console, create a realtime database.

### Collect your project credentials

Go to project info and get your API_KEY, PROJECT_ID and MESSAGING_SENDER_ID (it is called SENDER_ID here).

### Initialize your PWA

Run the following command with data from the previous step:

```
bash bin/init.sh
NAME=name API_KEY=api_key PROJECT_ID=project_id SENDER_ID=sender_id bash bin/new.sh
```

Please, be careful, NAME is only a local name.

### Start the development server

Now you've got your `docker-compose.yml` updated and you can start a development server. Run the following command:

```
NAME=name bash bin/start.sh
```

You will be logged in firebase and then the app will be compiled. After that you can go to browser and see your new PWA.

### Deploy your PWA

For this hard task, run a simple command:

```
NAME=name bash bin/deploy.sh
```

You'll see the public URL of your PWA.

# Toast description

<p align="center">
  <img src="https://github.com/utt11/toastbase/raw/master/toast.png"/>
</p>

What is a toast? It is a directory in `/toasts` which satisfies:

- It has `Dockerfile` which starts from "template:basement".
- The development mode is started by the command `yarn start`.
- The development server is served on port `3000`.
- `yarn build` builds the application into `/build`.

You are free to use any type of toast you would like. React/redux template is used for illustration.
