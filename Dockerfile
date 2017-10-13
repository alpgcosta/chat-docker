FROM ubuntu
RUN apt update
RUN apt install -y npm
RUN apt install -y git
RUN mkdir chat-docker
WORKDIR chat-docker
COPY . .
CMD ls
EXPOSE 80
