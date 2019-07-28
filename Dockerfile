FROM nginx:stable-alpine
#复制编译内容到nginx目录
COPY dist/  /usr/share/nginx/html/
#对外暴露80
EXPOSE 80