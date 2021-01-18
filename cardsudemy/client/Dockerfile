FROM node:14-alpine AS deps
WORKDIR /src
COPY package.json .
RUN npm install --ignore-scripts
FROM node:14-alpine
WORKDIR /src
COPY --from=deps /src/node_modules node_modulesn
COPY . .
ENTRYPOINT ["npm", "run", "start", "--", "--disableHostCheck", "--host", "127.0.0.1"]