# Dev Image
FROM node:22-alpine

# setup work directory
WORKDIR /app

# copy and install dependencies
COPY package*.json ./

RUN npm install

# copy everything else
COPY . .

EXPOSE 4200

CMD ["node_modules/.bin/ng", "serve", "--host", "0.0.0.0"]