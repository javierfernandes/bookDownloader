# Book Downloader Script

# Setup

```bash
yarn
```

# Usage

```js
node index.js --url=https://link.springer.com/book/10.1007%2F978-3-319-64410-3
```

Replacing the URL of course.

By default it will download the content to `./downloaded/${ISBN}/`

You can match the ISBN since it is the last part of the URL. For the given sample URL that is `978-3-319-64410-3`

You can change the target folder by passing the argument `--to`

You will see something like this

```bash
node index.js --url=https://link.springer.com/book/10.1007%2F978-3-319-94463-0
> parsing html
> Parsed {
>  "_isbn": "978-3-319-94463-0",
>  "preview": "https://media.springernature.com/w306/springer-static/cover-hires/book/978-3-319-94463-0",
>  "pdf": "https://link.springer.com/content/pdf/10.1007%2F978-3-319-94463-0.pdf",
>  "ebook": "https://link.springer.com/download/epub/10.1007%2F978-3-319-94463-0.epub"
>}
> DOWNLOADING FILE: /Users/blah/Downloads/bookDownloader/downloaded/978-3-319-94463-0/10.1007%2F978-3-319-94463-0.epub
> DOWNLOADING FILE: /Users/blah/Downloads/bookDownloader/downloaded/978-3-319-94463-0/10.1007%2F978-3-319-94463-0.pdf
> DOWNLOADING FILE: /Users/blah/Downloads/bookDownloader/downloaded/978-3-319-94463-0/978-3-319-94463-0
> done
> done
> done
```

And it creates a folder structure like this

```bash
downloaded
├── 978-1-4471-6684-9
│   ├── 10.1007%2F978-1-4471-6684-9.pdf
│   └── 978-1-4471-6684-9
├── 978-3-319-64410-3
│   ├── 10.1007%2F978-3-319-64410-3.epub
│   ├── 10.1007%2F978-3-319-64410-3.pdf
│   ├── 978-3-319-64410-3
│   └── 978-3-319-64410-3.jpg
└── 978-3-319-94463-0
    ├── 10.1007%2F978-3-319-94463-0.epub
    ├── 10.1007%2F978-3-319-94463-0.pdf
    └── 978-3-319-94463-0
```
