## auth: passport, JWT


### JWT
jwt is data encoded a single token make up with 3 major parts. It ensure data's integrity, 
the 3rd signed hash make it hard to temper the data it contains.

jwt: 
* [JWT introduction](https://jwt.io/introduction/)
* [understanding jwt](https://medium.com/vandium-software/5-easy-steps-to-understanding-json-web-tokens-jwt-1164c0adfcec#.h2lcdtlr2)

### passport
require session support.

    npm install --save passport-local koa-passport@next  

    .use(convert(session()))
    // req._passport.session = req.session[passport._key];
    // extract data with key `passport._key` from session
    // passport._key is the result of `serializeUser`
    .use(passport.initialize())
    // passport core lib include a session strategy. on success it would set a user 
    // property on req object.
    // var property = req._passport.instance._userProperty || 'user';
    // req[property] = user;
    .use(passport.session())

passport core does some monkey patch on http.IncomingMessage which is request object.
file:  passport/lib/http/request.js
methods: login(user, options, done), logout(), isAuthenticated(): boolean.

* auth flow:

passport will try all the strategies one by one, any error would be throw via `next(err)` call,
if one strategy call `fail()` method, passport accumulates its error then attempts next one,
util one success, or all failed.

if no strategy has successfully authenticated user, passport would fail with 

      if (options.failWithError) {
        return next(new AuthenticationError(http.STATUS_CODES[res.statusCode], rstatus));
      }
      res.end(http.STATUS_CODES[res.statusCode]);


* builded-in session strategy:
    passport-core include a session strategy, which deserialize user using info stored in the session.
    if this field presents itself, session strategy would try to deserialize user, emit an error if it failed.
    if this field not presents itself, then session strategy would simply skip via a `next` call.

    ```
    if (req._passport.session) {
        su = req._passport.session.user;
    }

    if (su || su === 0) {
        //deserialize user, emit error if failed
    }else{
        // strategy.pass(), internally a `next()` call would happen
    }
    ```

* implement a passport strategy:

passport core lib has a builded-in session strategy implementation, you can take it look there and grasp
a concrete feeling how it is been done. 

methods for strategy core: 
  authenticate(req:<Express req object>, options)
    // the only exposed method that is called by passport core lib, or yourself.
    // in this method you call one of following method under various circumstance
    // *   - `session`          Save login state in session, defaults to _true_, 设置为false，session中不会记录user的状态
    // *   - `successRedirect`  After successful login, redirect to given URL
    // *   - `failureRedirect`  After failed login, redirect to given URL
    // *   - `assignProperty`   Assign the object provided by the verify callback to given property

  success(user, info:{})
    // validation success with user

  fail(challenge: {msg: string, type: string}, status)
    // validation failed, continue to try next layer.
    //     @param challenge: obj, info 
    //     @param status: number, status
  redirect(url: String, status: number = 302)
    // url
  pass()
    //pass authentication, skip all together
  error(error: Error)
    // skip all together with an error provided














