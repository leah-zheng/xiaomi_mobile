import config from '../utils/config';

class IndexModels{
    getDatas(options){
        let url = `getDatas?swiper=${options.swiper}&phone=${options.phone}&field=${options.field}`;
        
        return new Promise((resolve,reject)=>{
            $.ajax({
                url:config.API.base_url+ url,
                type:'GET',
                dataType:'JSONP',
                jsonp:'cb',
                success(data){
                    resolve(data)
                }
            })
        })
        
    }
}

export { IndexModels }

