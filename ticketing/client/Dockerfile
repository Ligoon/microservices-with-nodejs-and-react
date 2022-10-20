FROM node:alpine

WORKDIR /app
# copy the package.json into working directory
COPY package.json .
RUN npm install
COPY . .

CMD ["npm", "run", "dev"]