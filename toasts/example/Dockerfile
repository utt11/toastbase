FROM toastbase:basement

RUN apt-get update && apt-get install -y curl vim wget git libmagick++-dev python build-essential imagemagick
RUN echo 'export PATH=`ls -d /usr/lib/\`uname -p\`-linux-gnu/ImageMagick-*/bin-q16 | head -n 1`:$PATH' >> ~/.profile
