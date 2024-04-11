const loadXHR = (url, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => callback(xhr);
  
    xhr.open("GET", url);
    xhr.send();
};

export { loadXHR };