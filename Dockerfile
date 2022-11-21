# See the Contributing.md guide for more information on using this
# https://github.com/ProjectEvergreen/greenwood/blob/master/.github/CONTRIBUTING.md#docker

FROM thegreenhouse/nodejs-dev

# Set the working directory to /workspace when starting the container
WORKDIR /workspace

RUN yarn install
