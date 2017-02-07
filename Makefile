#created by miaojing-243127395@qq.com on 2016-11-09 17:58:58

# see https://www.tutorialspoint.com/makefile/makefile_dependencies.htm
# for more info on Makefile
PATH  := node_modules/.bin:$(PATH)
SHELL := /bin/bash

DOCKER_APP_NAME := interaction/js_fullstack_playground
DOCKER_NODE_PORT := 9000
DOCKER_MYSQL_CONTAINER_NAME := some_mysql 

PATH_SRC_ROOT := server
PATH_SRC_TEST := test

PATH_BUILD_ROOT := build/$(PATH_SRC_ROOT)
PATH_BUILD_TEST := build/$(PATH_SRC_TEST)


PATH_PRJ_ROOT := $$(pwd)
PATH_LOG := $(PATH_PRJ_ROOT)/blob/logs/myapp.log

MYSQL_ROOT_PASSWORD := jkliop

.PHONY: test

init:
	mkdir -p blob/logs

clean:
	rm -rf build
	
run: init
	@printf "server started on port $(DOCKER_NODE_PORT)\n"
	nodemon $(PATH_BUILD_ROOT)/index.js > $(PATH_LOG)

run-debug:
	nodemon --inspect $(PATH_BUILD_ROOT)/index.js

test: clean tsc test-unit test-functional
	
test-unit:
	NODE_ENV=test mocha --recursive $(PATH_BUILD_ROOT)
	
test-functional:
	NODE_ENV=test mocha --recursive $(PATH_BUILD_TEST)

testw: tsc
	NODE_ENV=test mocha --recursive --watch $(PATH_BUILD_TEST) $(PATH_BUILD_ROOT)

tsc:
	tsc

tscw:
	tsc -w

tsct:
	tsc -w --traceResolution

docker_build: tsc
	npm shrinkwrap
	docker build -t $(DOCKER_APP_NAME) .

docker_run:
	docker run -p 9000:$(DOCKER_NODE_PORT) --detach $(DOCKER_APP_NAME)

docker_mysql_init:
	docker run -p 3306:3306 --name $(DOCKER_MYSQL_CONTAINER_NAME) -v $$(pwd)/blob/mysql_data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=$(MYSQL_ROOT_PASSWORD) -d mysql:5.7

docker_mysql_start:
	docker start $(DOCKER_MYSQL_CONTAINER_NAME)

docker_mysql_stop:
	docker stop $(DOCKER_MYSQL_CONTAINER_NAME)

# `$$(pwd)` escape to $(pwd)
# http://stackoverflow.com/questions/7654386/how-do-i-properly-escape-data-for-a-makefile
# deprecated, failed to work under this approach
# docker run -p 9000:9000 -v $(pwd):/code:slave interaction/js_fullstack_playground
# docker run -v $(pwd):/data: <image>

# docker_run_dev:
# 	docker run -p 9000:$(DOCKER_NODE_PORT) -v $$(pwd):/code $(DOCKER_APP_NAME)

# create lint by
# tslint --init
lint:
	tslint --format verbose --project .

readlog:
	tail -f $(PATH_LOG) | pino -lt