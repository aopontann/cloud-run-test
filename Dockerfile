FROM node:lts
WORKDIR /app
COPY package.json package*.json ./
COPY .env ./
COPY prisma/schema.prisma ./prisma/
RUN npm install --only=production
COPY ./src ./src
# ↓これやらないとうまくbuildできない
RUN npm install @prisma/client
RUN npx prisma generate
CMD [ "npm", "start" ]