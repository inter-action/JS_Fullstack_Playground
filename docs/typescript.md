# Typescript


## Typescript compiler
### Compiler Options
* "module": "commonjs",
    this controls how generated code using what kind of module pattern 
    ```js
    //"module": "commonjs",
    const Koa = require("koa");
    exports.default = xx 
    //"module": "es6",
    import * as Koa from 'koa';
    export default xx
    ```

* "target": "es2015"
    this controls what runtime to include when generating js codes.
    higher target requires higher version of runtime support

## Lang

* import vs require
  require doesnt force typescript check while import enforce type check.
  that means you have to install that module/package types from npm.

* two flavor type conversion

    ```typescript
    <Promise<any>> some_variable // convert without typechecking

    some_variable as <Promise<any>> // convert with typechecking
    ```


## Quirks:
*  error TS1192: Module '"./node_modules/@types/koa/index"' has no default export.

    ```js
    import Koa from 'koa'
    //make it to
    import * as Koa from 'koa'
    ```


## Notes

* typescript async support:
    typescript support async es6 runtime, but since 2.1rc es5&es3 is also supported:
    https://blogs.msdn.microsoft.com/typescript/2016/11/08/typescript-2-1-rc-better-inference-async-functions-and-more/



## checkpoints:
* tslint


# Links:
* [typescript deep dive](https://basarat.gitbooks.io/typescript/content/docs/template-strings.html)