const request = require('request'),
      FeedParser = require('feedparser'),
      Iconv = require('iconv').Iconv,
      zlib = require('zlib');

module.exports = {

  aggregateNewsArticles: (req, res) => {
    let feeds = ['http://feeds.bbci.co.uk/sport/formula1/rss.xml?edition=uk#'];
    let promiseOne = new Promise((resolve, reject) => {
      module.exports.fetch(feeds[0]).then( (result) => { res.send(result)});
    });

    // let promise = new Promise((resolve, reject) => {
    //   module.exports.fetch(feeds[0]).then( (result) => {resolve(result)});
    // }).then( (prom1result) => {
    //   let secondPromise = new Promise((resolve, reject) => {
    //     module.exports.fetch(feeds[1]).then( (result) => {resolve(result)});
    //   }).then((prom2result) => {
    //     res.send(prom1result.concat(prom2result));
    //   })
    // })
  },

  fetch: (feed) => {
    let promise = new Promise((resolve, reject) => {
      let postsArray = [];
      let req = request(feed, {timeout: 10000, pool: false});
      req.setMaxListeners(50);
      req.setHeader('accept', 'text/html,application/xhtml+xml');

      let feedparser = new FeedParser();

      req.on('error', (err) => {console.log(err);});

      req.on('response', (res) => {
        if(res.statusCode !== 200) {
          return this.emit('error', new Error('Bad status code'));
        }
        let encoding = res.headers['content-encoding'] || 'identity';
        let charset = module.exports.getParams(res.headers['content-type'] || '').charset;
        res = module.exports.maybeDecompress(res, encoding);
        res = module.exports.maybeTranslate(res, charset);
        res.pipe(feedparser);
      });

      feedparser.on('error', (err) => { reject(Error)});
      feedparser.on('end', (done) => {
        resolve(postsArray);
      });
      feedparser.on('readable', () => {
        let post;
        while(post = feedparser.read()) {
          postsArray.push(post);
        }
      });
    });
    return promise;
  },

  maybeDecompress: (res, encoding) => {
    let decompress;
    if (encoding.match(/\bdeflate\b/)) {
      decompress = zlib.createInflate();
    } else if (encoding.match(/\bgzip\b/)) {
      decompress = zlib.createGunzip();
    }
    return decompress ? res.pipe(decompress) : res;
  },

  maybeTranslate: (res, charset) => {
    let iconv;
    if (!iconv && charset && !/utf-*8/i.test(charset)) {
      try {
        iconv = new Iconv(charset, 'utf-8');
        console.log('Converting from charset %s to utf-8', charset);
        iconv.on('error', exports.done);
        res = res.pipe(iconv);
      } catch(err) {
        res.emit('error', err);
      }
    }
    return res;
  },

  getParams: (str) => {
    var params = str.split(';').reduce( (params, param) => {
      var parts = param.split('=').map( (part) =>  { return part.trim(); });
      if (parts.length === 2) {
        params[parts[0]] = parts[1];
      }
      return params;
    }, {});
    return params;
  },

  done: (err) => {
    if (err) {
      console.log(err, err.stack);
      return process.exit(1);
    }
    console.log('error')
  }

}
