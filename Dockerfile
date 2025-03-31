ARG COMPILE_IMAGE="node:16.13.1"
ARG RUN_IMAGE="nginx:mainline-alpine"
ARG APP_HOME=/opt
ARG NPM_INSTALL="npm i --progress=false --loglevel=error --no-update-notifier --no-audit --silent"
ARG NPM_RUN="npm run build"
ARG BUILD_PATH="build"
ARG APP_NAME=XXXXXXXX
ARG APP_ENV=XXXXXXXX
ARG BUILD_NUM=XXXXXXXX
ARG CITADEL_API_KEY=XXXXXXXX
ARG CITADEL_API_PATH=XXXXXXXX
# -----------------------------
FROM ${COMPILE_IMAGE} as compile
ARG COMPILE_IMAGE
ARG APP_NAME
ARG APP_ENV
ARG APP_HOME
ARG NPM_INSTALL
ARG NPM_RUN
ARG CITADEL_API_KEY
ARG CITADEL_API_PATH
COPY . ${APP_HOME}/${APP_NAME}
WORKDIR ${APP_HOME}/${APP_NAME}
RUN npm config --location=project set registry https://nexus.1worldonline.biz/repository/1wo-npm-proxy/ \
    && echo 'NOW NPM RegistryServer ❱❱❱❱ '$(npm config get registry)'' \
    && ${NPM_INSTALL} \
    && curl --output /dev/null --silent --fail -r -1 -H 'x-api-key:'${CITADEL_API_KEY}'' ${CITADEL_API_PATH}/config-raw/${APP_ENV}/${APP_NAME}/.env \ 
    && curl -s -H 'x-api-key:'${CITADEL_API_KEY}'' ${CITADEL_API_PATH}/config-raw/${APP_ENV}/${APP_NAME}/.env -o ${APP_HOME}/${APP_NAME}/.env \
    && ${NPM_RUN} 
# -----------------------------  
FROM ${RUN_IMAGE} 
ARG RUN_IMAGE
ARG BUILD_NUM
ARG BUILD_PATH
ARG APP_NAME
ARG APP_HOME
ENV APP_NAME=${APP_NAME} \
    APP_HOME=${APP_HOME}
COPY --from=compile ${APP_HOME}/${APP_NAME}/${BUILD_PATH} ${APP_HOME}/${APP_NAME}
COPY --from=compile ${APP_HOME}/${APP_NAME}/.devops/env/entrypoint.sh ${APP_HOME}/${APP_NAME}
COPY --from=compile ${APP_HOME}/${APP_NAME}/.devops/nginx/default_matrix.conf /tmp/default_matrix.conf
RUN rm -f /etc/nginx/conf.d/* /etc/nginx/nginx.conf \
    && cat /tmp/default_matrix.conf | sed -E 's/APP_VAL/'${APP_NAME}'/g' > /etc/nginx/conf.d/default.conf \
    && echo ${BUILD_NUM} > /usr/share/nginx/html/version.html \
    && chmod 755 -R ${APP_HOME}/${APP_NAME} \
    && touch /run/nginx.pid \ 
    && chown -R nginx:nginx ${APP_HOME}/${APP_NAME} /run/nginx.pid /var/log/nginx /var/cache/nginx /usr/sbin/nginx \
               /usr/lib/nginx /usr/share/licenses/nginx /usr/share/nginx /etc/logrotate.d/nginx /etc/init.d/nginx /etc/nginx \ 
    && rm -rf /tmp/* 
WORKDIR ${APP_HOME}/${APP_NAME}
COPY --from=compile ${APP_HOME}/${APP_NAME}/.devops/nginx/nginx.conf /etc/nginx/

USER nginx
EXPOSE 8080
STOPSIGNAL SIGTERM
ENTRYPOINT ${APP_HOME}/${APP_NAME}/entrypoint.sh
