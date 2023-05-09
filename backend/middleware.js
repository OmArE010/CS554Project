module.exports = {
  trackUrlRequests(req, res, next) {
    const url = req.originalUrl;

    if (!urlCounts[url]) {
      urlCounts[url] = 1;
    } else {
      urlCounts[url]++;
    }
    const temp = {};
    for (key in req.body) {
      if (key != "password") {
        temp[key] = req.body[key];
      }
    }
    console.log(`${req.method} ${url} ${JSON.stringify(temp)}`);
    console.log(urlCounts[url]);
    next();
  },
  checkLogged(req, res, next) {
    if (!req.session.user) {
      res.status(401).json({ error: "Error: Not logged in!" });
      return;
    }
    next();
  },
  checkNotLogged(req, res, next) {
    if (req.session.user) {
      res.status(401).json({ error: "Error: Already logged in!" });
      return;
    }
    next();
  }
};
