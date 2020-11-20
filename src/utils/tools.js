function tplReplace (tpl, replaceObject) {
	return tpl.replace(/{{(.*?)}}/g, (node, key) => {
		return replaceObject[key];
	})
}

function trimSpace(str){
    return str.replace(/\s+/g,'')
}

function getUrlQueryValue(key){
    const reg = RegExp('(^|&)'+key+'=([^&]*)(&|$)','i'),
          res = window.location.search.substr(1).match(reg);
    return res != null ? decodeURIComponent(res[2]) : null;
}

function throttle(fn, delay){
    var t = null,
        begin = new Date().getTime();
  
    return function(){
      var _self = this,
          args = arguments,
          cur = new Date().getTime();
  
      clearTimeout(t);
  
      if(cur - begin >= delay){
        fn.apply(_self, args);
        begin = cur;
      }else{
        t = setTimeout(function(){
          fn.apply(_self, args);
        }, delay);
      }
    }
  }

function getDataTime(){
  const date = new Date();
  
  let year = date.getFullYear(),
      mouth = addZero(date.getMouth() + 1),
      day = addZero(date.getDate()),
      hours = addZero(date.getHours()),
      minutes = addZero(date.getMinutes()),
      seconds = addZero(date.getSeconds());

  function addZero(value){
    return value < 10 ? ('0'+value) : value;
  }
    
  return `${year}-${mouth}-${day} ${hours}:${minutes}:${seconds}`
}


module.exports = {
    tplReplace,
    trimSpace,
    getUrlQueryValue,
    throttle,
    getDataTime
}