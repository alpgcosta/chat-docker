FROM ubuntu
RUN apt update
RUN apt install -y npm
RUN apt install -y git
RUN mkdir chat-docker
WORKDIR chat-docker
COPY . .
EXPOSE 80
