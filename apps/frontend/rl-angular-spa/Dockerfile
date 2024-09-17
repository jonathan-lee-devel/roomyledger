FROM --platform=linux/x86_64 nginx:1.25.3-alpine

WORKDIR /app

COPY ./ui/roomyledger-ui-spa/dist/roomyledger-ui-spa/browser /usr/share/nginx/html

COPY ./ui/roomyledger-ui-spa/nginx/default.conf /etc/nginx/conf.d

EXPOSE 80
