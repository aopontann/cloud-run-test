FROM node:14.15.5
WORKDIR /app
COPY package.json package*.json tsconfig.json /app/
COPY prisma/schema.prisma /app/prisma/
ENV DATABASE_URL=${DATABASE_URL}
RUN npm install
COPY src /app/src/
RUN npm run tsc
CMD [ "npm", "start" ]