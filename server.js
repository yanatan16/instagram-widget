// instagram widget backend server


var path = require('path')
  , koa = require('koa')
  , config = require('config')
  , instagram = require('./instagram')
  , app = koa()

// app.use(require('koa-logger')())

if (config.cache) {
  app.use(require('koa-static-cache')(path.join(__dirname, 'static')))
} else {
  app.use(require('koa-static')(path.join(__dirname, 'static')))
}

// parse query parameters
var regex = /^\/([^\/]+)\/feed/i
app.use(function *(next) {
  this.instagram = {}
  try {
    this.instagram.username = this.path.match(regex)[1]
    if (!this.instagram.username) throw null
  } catch (e) {
    this.status = 404
    this.body = 'path not found'
    return
  }

  this.instagram.userid = yield instagram.getUserId(this.instagram.username);
  if (!this.instagram.userid) {
    this.status = 404
    this.body = 'user-id not found'
    return
  }

  this.instagram.count = this.query.count
  if (!this.instagram.count || typeof this.instagram.count !== 'number') {
    this.instagram.count = 2
  }

  yield next;
})

// go to instagram and grab the data
app.use(function *(next) {
  this.medias = yield instagram.getInstagramMedia(this.instagram.userid, {count: this.instagram.count})
  yield next
})

// render the response
app.use(function *() {
  this.body = this.medias
})

app.listen(config.port)
console.log('widget server listening on ' + config.port)
