# PartyPlanner ![alt text](http://emojipedia-us.s3.amazonaws.com/cache/28/cc/28cc4d727f2a24d7ad1c0eae86edd166.png)
A web application that help you planning stuff like party or any kind of events

## Wanted features
- Date choice (including vote if user want)
- Place choice (including vote if user want) or GPS position selection
- shopping list for attendees
- probably more !


## Techs
It will implement the MEAN stack but with angular 2.  

List of tech used in the MEAN stack :  

- MongoDB
- Express.js
- Angular
- Node.js

## How to install ?

You must have mongo installed and running :)  

```bash
# add required global libraries
$ npm install -g typings webpack webpack-dev-server concurrently

# install the repo with npm
$ npm install

# build code
$ npm run build

# start up the stack

# this command runs two commands in parallel via `concurrently`:
# `npm run server` starts up `webpack-dev-server` allowing for
# hot module reloading
# `npm` run watch` uses `webpack` to watch the necessary files
# and build on file change
$ npm start

# in a separate terminal:
# start `Express` server
$ gulp serve
```

The app is now running right here :  [http://localhost:3000/](http://localhost:3000/) 

<p align="center">
    <img src="https://media.giphy.com/media/hsBZfDG7wiWHu/giphy.gif">
</p>



Made with :heart: by Dan
