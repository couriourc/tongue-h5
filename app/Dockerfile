FROM node

COPY "." "/app"

WORKDIR "/app"

RUN npm i -g pnpm
RUN pnpm install

ENTRYPOINT ["node","app.js"]
