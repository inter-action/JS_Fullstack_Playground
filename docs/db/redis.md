## Set up redis

    docker pull redis:3
    
    # first run
    docker run -p 6379:6379 --name some-redis -d redis:3

    # later run
    docker start some-redis
    
    # download redis gui tool:  https://github.com/luin/medis 




# Links
* [redis tutorialspoint](https://www.tutorialspoint.com/redis/)


