const http = require('https')
const cheerio = require('cheerio')
const fs = require('fs')
const args = require('minimist')(process.argv.slice(2));


const url = args.url
const to = args.to || `${__dirname}/downloaded`

const fetch = url => new Promise((resolve, reject) => {
  http.get(url, resolve)
    .on('error', error => {
      console.error(`ERROR fetching URL ${url}`, error)
      reject(error)
    })
})

const processHtml = response => new Promise((resolve, reject) => {
  let string = ''
  response.on('end', () => resolve(string))
  response.on('data', data => { string += data.toString() })
  response.on('error', reject)
})

const parseHtml = string => {
  console.log('parsing html')
  return cheerio.load(string)
}

const prependUrl = s => s && `https://link.springer.com${s}`

const parseBook = $ => ({
  _isbn: $('input[name=facet-eisbn]').attr('value'),
  preview: $('.test-cover-image').attr('src'),
  pdf: prependUrl($('.test-bookpdf-link').attr('href')),
  ebook: prependUrl($('.test-bookepub-link').attr('href')),
})

const mkDirP = dir => {
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir)
  }
}

const downloadFile = (isbn, url) => response => new Promise((resolve, reject) => {
  const folder = `${to}/${isbn}`
  mkDirP(folder)
  const path = `${folder}/${url.slice(url.lastIndexOf('/') + 1)}`
  console.log('DOWNLOADING FILE:', path)
  
  const file = fs.createWriteStream(path)
  const stream = response.pipe(file)
  stream
    .on('finish', function() {
      resolve()
      file.close()
    })
    .on('error', e => {
      console.error('Error downloading file to path', path)
      reject(e)
      file.close()
    })
})

const downloadFiles = urls => 
  Promise.all(Object.entries(urls)
    .filter(([key, _]) => !key.startsWith('_'))
    .map(([_, url]) => url ? fetch(url).then(downloadFile(urls._isbn, url)) : null)
  )
  .then(() => urls)

const request = fetch(url)
  .then(processHtml)
  .then(parseHtml)
  .then(parseBook)
  .then(r => {
    console.log('Parsed', JSON.stringify(r, null, 2))
    return r
  })
  .then(downloadFiles)
  .then(() => {
    console.log('All done ! Happy reading !!')
  })
  .catch(err => console.error('ERROR', err))