export function setInLocalStorage(data: any, key: string) {
   if(data && key) {
       localStorage.setItem(key,JSON.stringify(data));
   }
}

export function getFromLocalStorage( key: string) {
    let data = null; 
    if(key) {
        const state = localStorage.getItem(key)
        state && (data = JSON.parse(state));
        console.log('user_init_from_localstorage', data)
    }
    return data;
 }