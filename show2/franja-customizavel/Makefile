PIP=pip
DOCKER=docker
ENV=qa
PYTHON_VERSION=$(shell python --version)
SHELL=/bin/bash

.PHONY: python-sandbox-setup run-python run docker-update publish release build

qa:
	@$(eval ENV := qa)

dev:
	@$(eval ENV := dev)

prod:
	@$(eval ENV := prod)

# Download latest version of show-sandbox docker-compose file
setup:
	curl https://s3.glbimg.com/v1/AUTH_0f153e85af7b4a24818a803d8c11d487/open-tools/docker-compose.yml > docker-compose.yml


build:
	mkdir -p dist
	cp src/{javascripts,stylesheets}/* dist/


# Run Show Sandbox using a docker container
run: build
	@echo "Running Show Sandbox and Show Node Render using docker-compose"
	-$(DOCKER) stop sandbox && docker rm sandbox
	-$(DOCKER) stop show-node-render && docker rm show-node-render
	$(DOCKER) pull docker-pull.artifactory.globoi.com/backstage/show-node-render:latest
	$(DOCKER) pull docker-pull.artifactory.globoi.com/backstage/show-sandbox:latest
	docker-compose up


docker-update: setup
	-$(DOCKER) stop sandbox && docker rm sandbox
	-$(DOCKER) stop show-node-render && docker rm show-node-render
	$(DOCKER) rmi docker-pull.artifactory.globoi.com/backstage/show-sandbox -f
	$(DOCKER) rmi docker-pull.artifactory.globoi.com/backstage/show-node-render -f
	$(DOCKER) pull docker-pull.artifactory.globoi.com/backstage/show-sandbox:latest
	$(DOCKER) pull docker-pull.artifactory.globoi.com/backstage/show-node-render:latest


# Run Show Sandbox using a python active on the system
run-python: python-sandbox-setup
	@echo "Running Show Sandbox (${ENV}) using Python active on the system"
	show-sandbox --env ${ENV}


python-sandbox-setup:
	@echo "Setting up Show Sandbox using ${PYTHON_VERSION} (Recommended version is 3.6.8)"
	$(PIP) install show-sandbox --index-url https://artifactory.globoi.com/artifactory/api/pypi/pypi-all/simple --upgrade
