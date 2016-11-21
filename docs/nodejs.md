# NodeJS
## debug:
* [mocha test](http://blog.andrewray.me/how-to-debug-mocha-tests-with-chrome/)

    node-inspector
    mocha [options] --debug-brk  
    
    
* node --inspect index.js # only works for node 7.x


## logging
pipe logs to Elasticsearch, and leverage kibana to further analyze your app's logs


with docker:
>Note that if your application is deployed in a Docker container there are other ways 
of handling logs, for example by Docker logging drivers or agents like Sematext Docker Agent 
– probably the easiest way to deal with this issue! 

## Notes
* [nodejs global objects](https://nodejs.org/api/globals.html)


## Links
* [19 things I learnt reading the NodeJS docs](https://hackernoon.com/19-things-i-learnt-reading-the-nodejs-docs-8a2dcc7f307f#.ibos50cqi)

! nodejs at scale:    
* [Node.js at Scale - Understanding the Node.js Event Loop](https://blog.risingstack.com/node-js-at-scale-understanding-node-js-event-loop/)

logging:  
* [pino nodejs logger](http://www.nearform.com/nodecrunch/sematext-guest-post-pino-fastest-node-js-logger-production/?utm_source=nodeweekly&utm_medium=email)