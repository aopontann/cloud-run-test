FROM node:14.15.5
WORKDIR /app
COPY package.json package*.json tsconfig.json ./
COPY prisma/schema.prisma ./prisma/
RUN npm install --only=production
COPY . .
# ↓これやらないとうまくbuildできない
RUN npm install @prisma/client
RUN npx prisma generate
RUN  npm build
CMD [ "npm", "start" ]