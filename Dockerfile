FROM node
    RUN npm install -g nodemon &&
    RUN npm install kafka-node

node producer/producer.js