
# A Dockerfile is a text document that contains the instructions to assemble a Docker image.
# what type of env / what existing docker image to choose
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
# make port available outside docker container
EXPOSE 4000

CMD [ "npm", "start" ]