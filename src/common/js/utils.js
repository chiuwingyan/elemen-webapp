/**
 * 解释url参数，将url参数转化成对象
 */
export  function urlParse() {
    let url=window.location.search,
        obj={},
        reg=/[?&][^?&]+=[^?&]+/g,
        arr=url.match(reg);//输出['?id=1234','&a=b']

        if(arr){
            arr.forEach((item)=>{
                let tempArr=item.substring(1).split('=');
                let key=decodeURIComponent(tempArr[0]);
                let val=decodeURIComponent(tempArr[1]);
                obj[key]=val;
            })
        }
        console.log('obj',obj)
        return obj;
}