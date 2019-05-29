FROM node:9
WORKDIR /app
COPY . .
COPY package.json /app/package.json
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent
CMD ["npm", "start"]