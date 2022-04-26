
# A Dockerfile is a text document that contains the instructions to assemble a Docker image.

FROM node:latest
# Create app directory
WORKDIR /SDC-Review

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .
EXPOSE 3001

CMD [ "npm", "start" ]