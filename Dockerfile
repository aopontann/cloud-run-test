FROM node:14.15.5 as builder
WORKDIR /app
COPY package.json package*.json tsconfig.json /app/
COPY prisma/schema.prisma /app/prisma/
ENV DATABASE_URL=${DATABASE_URL}
RUN npm install
COPY src /app/src/
RUN npm run tsc

FROM node:14.15.5 as relese
WORKDIR /app
COPY --from=builder /app/dist /app/package.json /app/package-lock.json /app/prisma/schema.prisma /app/
ENV DATABASE_URL=${DATABASE_URL}
RUN npm install --production
CMD [ "npm", "start" ]