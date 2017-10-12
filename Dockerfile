FROM ubuntu
RUN apt update
RUN apt install -y npm
RUN apt install -y git
RUN git clone https://github.com/rcrs3/chat-docker.git
EXPOSE 80
