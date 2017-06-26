# issues
* when I try to create a shared mount into docker, it failed.
    ```
    docker run -p 9000:9000 -v $(pwd):/code:shared interaction/js_fullstack_playground
    ```
    if I dont add shared or slave tag to it. it cant reflect changes made on host machine
    but after i try to add it, it just failed to start. after digged a little bit, it 
    maybe a issue specifically related to `docker for mac` :
    https://docs.docker.com/docker-for-mac/osxfs/

* typescript cant be loaded into docker workflow, related to npm-shrikwrap doesnt include dev-dependency

#

## start it up

```shell
    docker-compose up
    docker-compose up --build # a rebuild
    docker-compose down #shutdown
    # then open browser @ localhost
```

* start docker regular mode
    ```shell
    make docker_build
    make docker_run
    # open your browser, localhost:9000 
    ```

* common docker ops

    ```shell
    # http://stackoverflow.com/questions/17236796/how-to-remove-old-docker-containers
    # remove all container, note this doesnt delete data volumns
    docker rm $(docker ps -a -q) 
    #or
    docker ps -a | grep 'weeks ago' | awk '{print $1}' | xargs --no-run-if-empty docker rm
    #or
    docker system prune 



    # inspect docker container
    docker inspect <container_id> 
    ```

# docker builder file

* Environment replacement

    ```plain
    syntax:
        ${variable_name} or $variable_name

        ${variable:-word} # result = if (variable) variable else word
        ${variable:+word} # result = if (variable) word else ""


    ```

* CMD vs RUN 
    * The main purpose of a CMD is to provide defaults for an executing container
    * there could only be one CMD in one Dockerfile. last takes effect

* ENTRYPOINT vs CMD
    http://stackoverflow.com/questions/21553353/what-is-the-difference-between-cmd-and-entrypoint-in-a-dockerfile
    * ENTRYPOINT is better used for creating a binary executable image.

* COPY vs ADD:
    http://stackoverflow.com/questions/24958140/what-is-the-difference-between-the-copy-and-add-commands-in-a-dockerfile

    prefer using COPY

## docker builder file best practice:
* prefer `exec form` when using ENTRYPOINT or CMD


## docker key sections:
* data valumn - for sharing data & persist data
    https://docs.docker.com/engine/tutorials/dockervolumes/

# Links
*[docker buld reference](https://docs.docker.com/engine/reference/builder/)
*[! js fullstack with docker](https://www.youtube.com/watch?v=zcSbOl8DYXM)
