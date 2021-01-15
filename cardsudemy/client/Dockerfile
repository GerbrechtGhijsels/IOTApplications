FROM node:alpine AS builder
COPY . ./client
WORKDIR /client
RUN npm i
RUN $(npm bin)/ng build --prod

FROM nginx:alpine
COPY --from=builder /client/dist/client/ /usr/share/nginx/html