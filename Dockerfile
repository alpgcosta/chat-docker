FROM ubuntu
RUN apt update
RUN apt install -y npm nodejs
RUN mkdir chat-docker
WORKDIR chat-docker
COPY package.json .
RUN npm install
COPY . .
CMD nodejs server.js
EXPOSE 80
