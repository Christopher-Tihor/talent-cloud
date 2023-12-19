# Makefile

# Run in the bash context and not /bin/sh (default)
SHELL := /bin/bash

# Environment variables for project
export $(sed 's/=.*//' .env)
ENV := $(PWD)/.env
include $(ENV)

# Project
export PROJECT := tc

export CONTAINER_REGISTRY := ""


# Git
export COMMIT_SHA:=$(shell git rev-parse --short=7 HEAD)
export LAST_COMMIT_MESSAGE:=$(shell git log -1 --oneline --decorate=full --no-color --format="%h, %cn, %f, %D" | sed 's/->/:/')
export GIT_LOCAL_BRANCH?=$(shell git rev-parse --abbrev-ref HEAD)
export GIT_LOCAL_BRANCH := $(or $(GIT_LOCAL_BRANCH),dev)

build-test:
	@echo "+\n++ Make: Running test build ...\n+"
	@$(shell echo ./scripts/setenv.sh local ci )
	@docker-compose up --force-recreate -d --build 

test-backend-pipeline:
	@docker exec tc-backend-ci npm run test:pipeline

test-frontend-pipeline:
	@docker exec tc-frontend-ci npm run test:pipeline

build-local:
	@echo "+\n++ Make: Run/Build locally ...\n+"
	@$(shell echo ./scripts/setenv.sh ci local )
	@docker-compose up --force-recreate -d --build 

run-local:
	@echo "+\n++ Make: Running locally ...\n+"
	@$(shell echo ./scripts/setenv.sh ci local )
	@docker-compose up -d

local-frontend-logs:
	@docker logs $(PROJECT)-frontend --tail 25 --follow

local-backend-logs:
	@docker logs $(PROJECT)-backend --tail 25 --follow


local-nginx-logs:
	@docker logs $(PROJECT)-nginx --tail 25 --follow


local-db-logs:
	@docker logs  db --tail 25 --follow

local-db-workspace:
	@docker exec -it $(PROJECT)-db sh

local-backend-workspace:
	@docker exec -it $(PROJECT)-backend sh

local-frontend-workspace:
	@docker exec -it $(PROJECT)-frontend sh

local-nginx-workspace:
	@docker exec -it $(PROJECT)-nginx sh

close:
	@echo "+\n++ Make: Run/Close ...\n+"
	@docker-compose  down -v --remove-orphans

build-prod:
	@echo "+\n++ Make: Run/Build production ...\n+"
	@docker build --platform linux/amd64 -t $(CONTAINER_REGISTRY)/frontend:latest ./frontend
	@docker build --platform linux/amd64 -t $(CONTAINER_REGISTRY)/backend:latest ./backend

push-prod:
	@echo "+\n++ Make: Run/Push production ...\n+"
	@docker push $(CONTAINER_REGISTRY)/frontend:latest
	@docker push $(CONTAINER_REGISTRY)/backend:latest
	
