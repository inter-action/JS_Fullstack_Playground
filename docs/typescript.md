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
* isolatedModules: 解析不到对应的typescript module 不报错，不会强制安装types
* preserveConstEnums: const enum 的声明默认会从代码移除掉，设置这个就不会移除，使用常量判断就不会在运行时候报错
* suppressImplicitAnyIndexErrors: 
    --noImplicitAny 这个选项启用后, {[key: string]=any}, 这个feature就用不了了，可以用这个选项来禁用掉index any 的error



* "target": "es2015"
    this controls what runtime to include when generating js codes.
    higher target requires higher version of runtime support

## Lang

* import vs require
  require doesnt force typescript check while import enforce type check.
  that means you have to install that module/package types from npm.

* two flavor type conversion

    ```typescript
    // the two does same thing, except `as` keyword work under jsx.
    <Promise<any>> some_variable 

    some_variable as <Promise<any>>
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

* use type `object` over `{}` 
    {} doesn't prevent you from passing primitive type to it
    https://blog.mariusschulz.com/2017/02/24/typescript-2-2-the-object-type

    `Object` is quite like `object` i think, i would prefer `object` over `Object`


## checkpoints:
* tslint


# Links:
* [! typescript deep dive](https://basarat.gitbooks.io/typescript/content/docs/template-strings.html)
* [announcing-typescript-2-2/](https://blogs.msdn.microsoft.com/typescript/2017/02/22/announcing-typescript-2-2/)
types:
* [! extend exsiting type](https://basarat.gitbooks.io/typescript/content/docs/types/lib.d.ts.html)
    * `type_extension.d.ts` this file in project demos this topic.
* [! type assertion](https://basarat.gitbooks.io/typescript/content/docs/types/type-assertion.html)
* [! freshness](https://basarat.gitbooks.io/typescript/content/docs/types/freshness.html)
    > The reason why only object literals are type checked this way is because in this case additional properties that aren't actually used is almost always a typo or a misunderstanding of the API.

    * Allowing extra properties
    ```typescript
    var x: { foo: number, [x: string]: any };
    x = { foo: 1, baz: 2 };  // Ok, `baz` matched by index signature
    ```

* [! moving-types](https://basarat.gitbooks.io/typescript/content/docs/types/moving-types.html)

    * moving-types
    >You can actually use a variable in a type annotation using the typeof operator. This allows you to tell the compiler that one variable is the same type as another. 

    ```typescript
    var foo = 123;
    var bar: typeof foo; // `bar` has the same type as `foo` (here `number`)
    bar = 456; // Okay
    bar = '789'; // ERROR: Type `string` is not `assignable` to type `number`
    ```
        
* [! decorators](https://www.typescriptlang.org/docs/handbook/decorators.html)

* [! Object vs object vs {}](https://blog.mariusschulz.com/2017/02/24/typescript-2-2-the-object-type)