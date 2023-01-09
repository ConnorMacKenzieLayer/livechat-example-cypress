FROM ubuntu:18.04 AS build

RUN apt-get update && \
    apt-get install -y curl ca-certificates && \
    curl -sL https://deb.nodesource.com/setup_14.x | bash && \
    apt-get install -y nodejs &&  \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY ./services/web/Dockerfile/package.json package-lock.json ./
RUN npm install --production

COPY ./services/web/src src
COPY ./services/web/public public
RUN npm run build


FROM ubuntu:18.04

RUN apt-get update && \
    apt-get install -y curl ca-certificates unzip && \
    curl -sL https://deb.nodesource.com/setup_14.x | bash && \
    apt-get install -y nodejs &&  \
    rm -rf /var/lib/apt/lists/*

WORKDIR /tmp/download
COPY ./services/web/Dockerfile/download.sh /tmp/download.sh
RUN mkdir public && bash /tmp/download.sh && rm /tmp/download.sh
RUN npm install -g http-server-spa

WORKDIR /app
COPY --from=build /app/build/ .
RUN cp -a /tmp/download/public/static/* ./static/
CMD ["http-server-spa", ".", "index.html", "80"]
