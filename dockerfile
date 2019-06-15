FROM node:8.14-alpine
WORKDIR /app
VOLUME /app/build
COPY package.json .
COPY yarn.lock .
COPY package-lock.json .
RUN yarn install

COPY ./src ./src
COPY .babelrc .
COPY .editorconfig .
COPY .eslintrc.json .
COPY CHANGELOG.md .
COPY CODE_OF_CONDUCT.md .
COPY index.html .
COPY webpack.config.js .
COPY webpack.production.config.js .

CMD ["yarn", "deploy"]

