import { App } from './App';
import { Header } from '../components/header/index';
import { ShowBoard } from '../components/board_show';
import { Footer } from '../components/footer';
import { Tab } from '../components/tab/index';

import tools from '../utils/tools';

class List extends App{
    constructor($){
        super($, {
            phone:true,
            swiper:true,
            field:true
        });

        this.keyword = tools.getUrlQueryValue('keyword')

        console.log(this.keyword);
    }

    render(){
        let tab = new Tab(this.$app,this.cache.fieldData,this.cache.phoneData)
        new Header(this.$app,this.cache.fieldData,this.cache.phoneData).init();
        tab.init();
        new ShowBoard(this.$app,tab.filterDatas(this.cache.phoneData, 'all',this.keyword)).init();
        new Footer(this.$app).init();
        $('body').prepend(this.$app);
    }

}

new List(jQuery);