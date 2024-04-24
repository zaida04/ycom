FROM oven/bun:1
WORKDIR /usr/src/app

COPY package.json bun.lockb ./

RUN bun install --frozen-lockfile
COPY src ./src

ENV NODE_ENV=production
USER bun

EXPOSE 3001
WORKDIR /usr/src/app/src/ws
ENTRYPOINT ["bun", "server.ts"]
