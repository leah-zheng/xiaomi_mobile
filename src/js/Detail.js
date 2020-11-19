import { App } from './App';
import { Header } from '../components/header/index';
import { Footer } from '../components/footer';
import { DetailBoard } from '../components/detail_board';

import tools from '../utils/tools';
import { DetailTitle } from '../components/detail_board/detail_title';

class Detail extends App{
    constructor($){
        super($, {
            phone:true,
            swiper:false,
            field:true
        });

        this.phoneId = tools.getUrlQueryValue('id');
    }

    render(){
        new Header(this.$app,this.cache.fieldData,this.cache.phoneData).init();
        new DetailBoard(this.$app,this.getPhoneId(this.phoneId)).init();
        new Footer(this.$app).init();
        $('body').prepend(this.$app);
        
    }

    getPhoneId(id){
        let phoneData = null;
        this.cache.phoneData.forEach(item =>{
            if(id === item.id){
                phoneData = item;
            }
        })
        
        return phoneData;
    }
}

new Detail(jQuery)