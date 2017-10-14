FROM ubuntu
RUN apt update
RUN apt install -y npm nodejs
RUN mkdir chat-docker
WORKDIR chat-docker
COPY package.json .
RUN npm install
RUN npm install express --save
RUN npm install socket.io --save
RUN npm install socket.io-client --save
COPY . .
CMD nodejs server.js
EXPOSE 80
