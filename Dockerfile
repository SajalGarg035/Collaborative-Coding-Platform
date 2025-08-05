FROM node:alpine

LABEL version="1.0"
LABEL description="Code Editor."
LABEL maintainer=["mohitur669@gmail.com"]

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

RUN npm run build

ENV REACT_APP_BACKEND_URL=http://localhost:5000
ENV SERVER_PORT=5000
ENV NODE_ENV=production

RUN mkdir -p /app/temp

EXPOSE 5000
EXPOSE 8000
EXPOSE 3000

CMD ["npm", "run", "start:docker"]
