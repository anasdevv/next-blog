FROM node:20-alpine


WORKDIR /app


EXPOSE 3001


CMD [ "npm" , "run" , "dev" ]

COPY package*.json ./

RUN npm install 

COPY . .

# RUN npx tsx prisma/seed.ts

