function ajax(
  methods,
  url
) {
  const xhr = new XMLHttpRequest();

  xhr.open(methods, url, true);

  xhr.withCredentials = true;

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
        console.log(xhr.response);
      }
    }
  }  

  xhr.send();
}