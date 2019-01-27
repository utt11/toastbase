FROM ubuntu:18.04

RUN apt-get update &&\
    apt-get install -y curl wget vim gnupg &&\
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - &&\
    echo "deb http://dl.yarnpkg.com/debian/ stable main" > /etc/apt/sources.list &&\
    apt-get update && apt-get install -y yarn

RUN wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
RUN echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.profile
RUN echo '[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"' >> ~/.profile
RUN bash -c "source ~/.profile && nvm install 8.10.0 && yarn global add firebase-tools"

ENTRYPOINT [ "/docker-entrypoint.sh" ]
