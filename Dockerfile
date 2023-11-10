FROM node:18

ARG PORT

ENV PORT $PORT

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

EXPOSE $PORT
ENTRYPOINT ["npm", "start"]