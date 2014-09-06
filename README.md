# Who's Looking for SugarCRM 7.5

This addon puts a new item in the menu that will show you how many other people are looking at the current page you are on.

![Who else is looking at this page](images/whos-looking-example.png "Example")

# Work in Progress

This is a work in progress but you are welome to test it out on development instances.

# Requires

- NodeJS to run the server, can be run on [Heroku], but is currently setup with no configuration.
- SugarCRM 7.5 or newer

# Running Server
You Need NodeJS 0.10.x or newer.

## Running Locally
```bash
node index.js
```

## Running on Heroku
Assuming that you have a [Heroku] account setup, and the [Heroku DevTools] already installed

```
heroku create <application name here>
git push heroku master
```

# Running Client
If you are running the server locally you can just use the zip file found in the root of this Repo, but if you are using Heroku you have to modify the [looking.js](sugarcrm_client/clients/base/views/looking/looking.js) file.

Find and replace the ioServer variable:

```js
ioServer: 'http://localhost:5000',
```

with the url of your Heroku app.  It defaults to port 80.

```js
ioServer: 'https://my-app-name.herokuapp.com',
```

Save the file and run re compile the package by issuing the following command

```bash
rake build_package
```

# ToDo
- Move away from rake into a grunt build system
- Add JS Tests
- Add Config Panel for configuring the ioServer
- Better Documentation

[Heroku]: https://heroku.com
[Heroku DevTools]: https://devcenter.heroku.com/articles/heroku-command
