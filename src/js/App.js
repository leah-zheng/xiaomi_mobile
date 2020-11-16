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
        
        await indexModels.getDatas({
            swiper:this.swiper,
            phone:this.phone,
            field:this.field
        }).then(res => {
            this.cache = {
                phoneData : res.phone_data,
                swiperData: res.swiper_data,
                fieldData: res.field_data
            }
        })
    }
}

export { App }