# instagram-widget

A standalone widget server for viewing a single user's recent photos.

## Config

First fill out a `config/production.json` akin to `config/default.json`

```json
{
  "cache": true,
  "instagram": {
    "access_token": "YOUR AUTHENTICATED ACCESS TOKEN",
    "users": {
      // ALLOWABLE USERS
    }
  }
}
```

Then commit that file forcibly into a new local branch

```
git checkout -b sensitive
git add config/production.json -f
git commit -m "sensitive information"
```

## Deployments

Uses Heroku.

```
heroku create
git push heroku sensitive:master
```

## License

MIT License found in `LICENSE` file.