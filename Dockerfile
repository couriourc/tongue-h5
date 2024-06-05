#构建阶段
FROM node:alpine as builder
WORKDIR '/app'
COPY "./dist" .

#运行阶段
FROM nginx
COPY --from=builder /app /usr/share/nginx/html

