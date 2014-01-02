
var config = require('config')
  , instagram = require('instagram-node').instagram({agent: require('https').globalAgent})
  , q = require('q')

instagram.use({access_token: config.instagram.access_token})

module.exports = {
  getInstagramMedia: getInstagramMedia,
  getUserId: getUserId
}

function *getUserId(username) {
  return config.instagram.users[username]
}

function getInstagramMedia(userid, options) {
  var deferred = q.defer();

  console.log('instagram get', userid, options)
  instagram.user_media_recent(userid, options, function(err, medias, pagination, limit) {
    console.log('user media recent', err, medias)
    if (err)
      deferred.reject(err)
    else
      deferred.resolve(medias)
  })

  return deferred.promise
}