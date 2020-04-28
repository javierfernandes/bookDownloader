# Book Downloader Script

Usage

```js
node index.js --url=https://link.springer.com/book/10.1007%2F978-3-319-64410-3
```

Replacing the URL of course.

By default it will download the content to `./downloaded/${ISBN}/`

You can match the ISBN since it is the last part of the URL. For the given sample URL that is `978-3-319-64410-3`

You can change the target folder by passing the argument `--to`
