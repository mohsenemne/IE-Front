FROM node:10.15.3-alpine
WORKDIR /app
COPY . .
COPY package.json /app/package.json
RUN npm install node-sass --silent
RUN npm install --silent
RUN npm run build
RUN npm -g add serve
CMD ["serve", "-p", "3000", "-s", "build"]