FROM node:lts-buster-slim AS base
RUN apt-get update && apt-get install libssl-dev ca-certificates -y
WORKDIR /app

COPY package.json yarn.lock ./

FROM base as build
RUN export NODE_ENV=production
RUN yarn

COPY . .
RUN yarn run prisma:generate
RUN yarn build



# prod build layer
FROM base as prod-build

RUN yarn install --production
COPY prisma prisma
RUN yarn run prisma:generate
RUN cp -R node_modules prod_node_modules

# prod layer
FROM base as prod

COPY --from=prod-build /app/prod_node_modules /app/node_modules
COPY --from=build  /app/.next /app/.next
COPY --from=build  /app/prisma /app/prisma

EXPOSE 80
CMD ["yarn", "start"]