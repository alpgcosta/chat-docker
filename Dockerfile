FROM ubuntu
RUN apt update
RUN apt install -y npm node.js
RUN mkdir chat-docker
WORKDIR chat-docker
COPY package.json .
RUN npm install
COPY . .
CMD npm start
EXPOSE 80
