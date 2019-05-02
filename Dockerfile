FROM node:9.2.0-alpine
EXPOSE 3000
RUN mkdir /tmp/build
COPY . /tmp/build
RUN cd /tmp/build && npm i && npm run build
CMD cd /tmp/build && npm run start
