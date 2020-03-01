function ajax(
  methods,
  url
) {
  const xhr = new XMLHttpRequest();

  xhr.open(methods, url, true);

  document.cookie = "name=darrell";

  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.setRequestHeader('name', '123456');
  xhr.setRequestHeader('key', 'darrell');
  xhr.withCredentials = true;


  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
        console.log(xhr.response);
        console.log(xhr.getResponseHeader('name'));
      }
    }
  }  

  xhr.send();
}