FROM node:lts

WORKDIR /app

COPY backend/package.json package-lock.json ./

RUN npm install

COPY backend .

RUN npx prisma generate

RUN npm run build

EXPOSE 7002

CMD ["npm", "run", "start"]

