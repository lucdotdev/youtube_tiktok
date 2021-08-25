FROM node:lts-buster

RUN set -xe \
 && apt update \
 && apt install -y curl dumb-init fonts-noto-cjk xvfb xz-utils \
 && curl -sSL https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-amd64-static.tar.xz \
    | tar xJC /usr/bin/ ffmpeg-4.4-amd64-static/ffprobe ffmpeg-4.4-amd64-static/ffmpeg --strip 1 \
 && ffmpeg -version \
 && ffprobe -version \
 && rm -rf /var/lib/apt/lists/*

RUN npm install --global --unsafe-perm editly


# ADD ./webapp /opt/webapp/
# WORKDIR /opt/webapp


ENTRYPOINT ["/usr/bin/dumb-init", "--", "xvfb-run", "--server-args", "-screen 0 1280x1024x24 -ac", "editly"]


# Run the app.  CMD is required to run on Heroku
# $PORT is set by Heroku			
CMD npm start


