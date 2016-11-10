#created by miaojing-243127395@qq.com on 2016-11-09 17:58:58

# see http://www.ruanyifeng.com/blog/2015/03/build-website-with-make.html
# for more info on Makefile
PATH  := node_modules/.bin:$(PATH)
SHELL := /bin/bash
DOCKER_APP_NAME := interaction/js_fullstack_playground
DOCKER_NODE_PORT := 9000

.PHONY: test

test:
	echo "test makefile"

run:
	node server/index.js

tsc:
	tsc

tscw:
	tsc -w

tsct:
	tsc -w --traceResolution

docker_build:
	$(MAKE) tsc
	npm shrinkwrap
	docker build -t $(DOCKER_APP_NAME) .

docker_run:
	docker run -p 9000:$(DOCKER_NODE_PORT) --detach $(DOCKER_APP_NAME)

# `$$(pwd)` escape to $(pwd)
# http://stackoverflow.com/questions/7654386/how-do-i-properly-escape-data-for-a-makefile
# deprecated, failed to work under this approach
# docker run -p 9000:9000 -v $(pwd):/code:slave interaction/js_fullstack_playground
# docker run -v $(pwd):/data: <image>

# docker_run_dev:
# 	docker run -p 9000:$(DOCKER_NODE_PORT) -v $$(pwd):/code $(DOCKER_APP_NAME)
