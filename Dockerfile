FROM node:lts
WORKDIR /app
COPY package.json package*.json ./
COPY prisma/schema.prisma ./prisma
RUN npm install --only=production
COPY . .
CMD [ "npm", "start" ]