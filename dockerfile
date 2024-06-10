FROM node:20-alpine

# Install dependencies
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn

# Copy source files into application directory
COPY . /app
