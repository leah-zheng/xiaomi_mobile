import{ App } from './App';
import { Header } from '../components/header/index';
import { Carousel } from '../components/carousel/index';
import { BoardTitle } from '../components/board_title/index';
import { ShowBoard } from '../components/board_show/index';
import { Footer } from '../components/footer/index'
class Index extends App {
    constructor($){
       super($, {
           phone:true,
           swiper:true,
           field:true
       })
    }
    render(){
        new Header(this.$app,this.cache.fieldData,this.cache.phoneData).init();
        new Carousel(this.$app, this.cache.swiperData).init();
        new BoardTitle(this.$app, '手机上新').init();
        new ShowBoard(this.$app,this.filterPhoneData('new')).init();
        new BoardTitle(this.$app, '超值手机').init();
        new ShowBoard(this.$app,this.filterPhoneData('valuable')).init();
        new BoardTitle(this.$app, '官方推荐').init();
        new ShowBoard(this.$app,this.filterPhoneData('recom')).init();
        new Footer(this.$app).init();
        $('body').prepend(this.$app);
    }

    
}

new Index(jQuery)