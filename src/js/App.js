import { IndexModels } from '../models/Index'
import '../scss/common.scss'

class App {
    constructor($, options){
        this.$app = $('<div id="app">');
        this.cache = null;
        
        this.swiper = options.swiper,
        this.phone = options.phone,
        this.field = options.field

        this.init();
    }

    async init(){
        await this.getDatas();
        this.render();
    }

    async getDatas(){
        const indexModels = new IndexModels();
        
        const data = await indexModels.getDatas({
            swiper:this.swiper,
            phone:this.phone,
            field:this.field
        })

        this.cache = {
            phoneData : data.phone_data || null,
            swiperData: data.swiper_data || null,
            fieldData: data.field_data|| null
        }
    }

    filterPhoneData(field){
        return this.cache.phoneData.filter((item,index)=>{
           switch (field) {
               case 'new':
                   return item.new == 1
                   break;
               case 'valuable':
                   return item.most_value == 1
                   break;
               case 'recom':
                   return item.recom == 1
                   break;
           
               default:
                   break;
           }
       })
   }
}

export { App }