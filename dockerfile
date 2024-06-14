FROM node:18-alpine

RUN apk add --no-cache python3 make g++

# Install dependencies
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn

# Copy source files into application directory
COPY . /app
