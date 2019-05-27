FROM node:chakracore-10.13.0
WORKDIR /app
COPY . .
RUN npm install --prefix /var/task
RUN npm build
RUN npm -g add serve
CMD ["serve", "-p", "3000", "-s", "build"]