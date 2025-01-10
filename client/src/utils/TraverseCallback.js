export function traverse_callback(array,callback,...args){
    for (let i = array.length-1;i>=0;i--){
        if(array[i].callback(...args)){
            return true;
        }
    }
    return false;
}