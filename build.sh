docker build -t ugc/vue:latest .
docker run -d -p 80:80 --name ugcVue  ugc/vue:latest
