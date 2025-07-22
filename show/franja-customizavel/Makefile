PIP=pip
DOCKER=docker
ENV=qa

NPM ?= $(shell which npm)
YARN ?= $(shell which yarn)
PKG_MANAGER ?= $(if $(YARN),$(YARN),$(NPM))
PKG_REGISTRY ?= $(if $(YARN), config set registry, install --registry)
PKG_CODERUN ?= $(if $(YARN), , run)

ENVS = qa01 qa02 qa dev prod

# colors
NO_COLOR=\x1b[0m
RED_COLOR=\033[0;31m
GREEN_COLOR=\033[0;32m
YELLOW_COLOR=\033[1;33m
ADMIN_FOLDER=admin/franja-customizavel

.PHONY: sandbox-setup sandbox-run run docker-update publish release build setup watch remotes-setup

qa:
	@$(eval ENV := qa)

dev:
	@$(eval ENV := dev)

prod:
	@$(eval ENV := prod)

# Admin tasks
setup-admin:
	@echo "[setup-admin] Installing node dependencies..."
	@cd $(ADMIN_FOLDER) && $(PKG_MANAGER) ${PKG_REGISTRY} https://artifactory.globoi.com/artifactory/api/npm/npm-repos

build-admin:
	@cd $(ADMIN_FOLDER) && $(PKG_MANAGER) ${PKG_CODERUN} build
	@$(MAKE) fix-build-admin

run-admin:
	@echo "[run-admin] Running pages sandbox..."
	@cd $(ADMIN_FOLDER) && ADMIN_ENV=qa $(PKG_MANAGER) start

upgrade-admin:
	@cd $(ADMIN_FOLDER) && $(PKG_MANAGER) ${PKG_CODERUN} upgrade backstage-admin --registry https://artifactory.globoi.com/artifactory/api/npm/npm-repos

upgrade-pages:
	@cd $(ADMIN_FOLDER) && $(PKG_MANAGER) ${PKG_CODERUN} upgrade backstage-pages --registry https://artifactory.globoi.com/artifactory/api/npm/npm-repos

lint-admin:
	@cd $(ADMIN_FOLDER) && $(PKG_MANAGER) ${PKG_CODERUN} lint

test-admin:
	@cd $(ADMIN_FOLDER) && $(PKG_MANAGER) ${PKG_CODERUN} test

coverage:
	@cd $(ADMIN_FOLDER) && $(PKG_MANAGER) ${PKG_CODERUN} coverage

fix-build-admin:
	@printf "Removing not needed assets bundle "
	@-rm $(ADMIN_FOLDER)/dist/asset-manifest.json > /dev/null 2>&1 || true
	@-rm $(ADMIN_FOLDER)/dist/*.map > /dev/null 2>&1 || true
	@echo "✓"
	@printf "Fixing the bundle name "
	@-mv $(ADMIN_FOLDER)/dist/main.*.js $(ADMIN_FOLDER)/dist/main.js > /dev/null 2>&1 || true
	@-mv $(ADMIN_FOLDER)/dist/main.*.css $(ADMIN_FOLDER)/dist/main.css > /dev/null 2>&1 || true
	@echo "✓"

# Show Tasks
setup-show:
	@echo "[setup-show] Installing node dependencies..."
	@$(PKG_MANAGER) ${PKG_REGISTRY} https://artifactory.globoi.com/artifactory/api/npm/npm-repos

build-show:
	@$(PKG_MANAGER) ${PKG_CODERUN} build

run-show:
	@echo "[run-show] Running show sandbox (${ENV}) with docker..."
	-$(DOCKER) stop show-sandbox && docker rm show-sandbox
	$(DOCKER) pull docker-pull.artifactory.globoi.com/backstage/show-sandbox:latest
	# The DNS points to QA DNS server
	$(DOCKER) run -t \
		-p 8888:8888 \
		-v `pwd`:/component \
		--dns=10.128.24.2 \
		--dns=10.128.184.2 \
		--name show-sandbox \
		docker-pull.artifactory.globoi.com/backstage/show-sandbox:latest \
		--env ${ENV} \
		--no-debug --disable-swift

watch-show:
	@echo "[watch-show] Watching show assets..."
	@$(PKG_MANAGER) ${PKG_CODERUN} watch

docker-update:
	-$(DOCKER) stop show-sandbox && docker rm show-sandbox
	$(DOCKER) rmi show-sandbox -f
	$(DOCKER) build -t show-sandbox .


# Roadie Tasks
setup-python:
	@echo "[setup-python] Installing python dependencies..."
	-@pip install -r requirements_dev.txt

functions-init:
	@roadie2 function-create $(shell pwd | sed 's/.*\///g') render

functions-publish:
	@roadie2 api-functions-publish ${ENV}

functions-test:
	@roadie2 api-functions-test

# Other Tasks
build: build-show

setup: setup-show

watch: watch-show

run-all: run-show watch-show

run:
	@$(MAKE) --jobs=3 run-all

publish:
	@bash publish.sh --publish

release:
	@bash publish.sh --release

remotes-setup:
	@echo "[remotes-setup] Setup store remote repo..."
	@if test ! `git config remote.store.url` ; then \
		git remote add store bsgit@git.store.backstage.globoi.com:infoglobo/franja-customizavel.git ; \
	fi