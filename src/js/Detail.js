import { App } from './App';
import { Header } from '../components/header/index';
import { Footer } from '../components/footer';
import { DetailBoard } from '../components/detail_board';
import { DetailModel } from '../models/detail';

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

    async render(){
        const data = await this.getPhoneInfo(this.phoneId);

        new Header(this.$app,this.cache.fieldData,this.cache.phoneData).init();
        new DetailBoard(this.$app, data).init();
        new Footer(this.$app).init();
        $('body').prepend(this.$app);
        
    }

    getPhoneInfo(id){
        const detailModel = new DetailModel();
        return detailModel.getPhoneInfo(id);
    }
}

new Detail(jQuery)