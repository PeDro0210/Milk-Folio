FROM node:lts-alpine as build

#Container for building
WORKDIR /milk-webview-dir

ARG VITE_BACKEND_URL

RUN echo VITE_BACKEND_URL=$VITE_BACKEND_URL > /milk-webview-dir/.env

#Creating build
COPY package*.json ./

RUN npm ci --force

COPY . .


RUN npm run build

#Creating the other container
FROM nginx

#Nginx side
COPY --from=build /milk-webview-dir/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 5173/tcp

CMD ["nginx", "-g", "daemon off;"]
