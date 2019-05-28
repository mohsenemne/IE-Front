FROM node:10.15.3-alpine
WORKDIR /app
COPY . .
COPY package.json /app/package.json
RUN npm install node-sass --silent
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent
CMD ["npm", "start"]