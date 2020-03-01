function jsonp ({
  url,
  params,
  cb
}) {
  return new Promise(function(resolve, reject) {
    let script = document.createElement('script');

    window[cb] = function(data) {
      resolve(data);
      document.body.removeChild(script);
    }

    params = { ...params, cb};

    let arrs = [];

    for(let key in params) {
      arrs.push(`${key}=${params[key]}`);
    }

    script.src = `${url}?${arrs.join('&')}`;
    document.body.appendChild(script);
  })
}