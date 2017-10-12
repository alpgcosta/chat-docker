FROM ubuntu
RUN apt update
RUN apt install -y npm
RUN git clone https://github.com/rcrs3/chat-docker.git
EXPOSE 80
