#created by miaojing-243127395@qq.com on 2016-11-09 17:58:58

# see http://www.ruanyifeng.com/blog/2015/03/build-website-with-make.html
# for more info on Makefile
PATH  := node_modules/.bin:$(PATH)
SHELL := /bin/bash

.PHONY: test

test:
	echo "test makefile"