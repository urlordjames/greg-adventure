FROM node:13-stretch

COPY src .
RUN npm install
ENTRYPOINT npm run