# pull official base image
FROM node:latest
#RUN apk add g++ make python3
RUN apt-get update || : && apt-get install python -y
RUN apt-get install python3-pip -y
RUN apt-get install libudev-dev

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm install react-scripts@3.4.1 -g

# add app
COPY . ./

# start app
CMD ["npm", "start"]


