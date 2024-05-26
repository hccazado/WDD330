export function setStorage(key, content){
    localStorage.setItem(key, JSON.stringify(content));
}

export function getStorage(key){
//return an empty objeject if localStorage is not defined yet
    const content = localStorage.getItem(key);
    return content == null || content == undefined ? [] : JSON.parse(content);
}