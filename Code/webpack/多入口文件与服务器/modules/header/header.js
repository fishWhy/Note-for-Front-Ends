console.log('header')

//发送ajax请求
let xhr = new XMLHttpRequest();

xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
        if(xhr.status === 200 || xhr.status === 304){
            console.log('success', xhr.responseText)
        }
    }
}
//打开链接
xhr.open('GET','/data/test.json',true);
xhr.send();
