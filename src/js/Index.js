import{ App } from './App';
import { Header } from '../components/header/index';
import { Carousel } from '../components/carousel/index';
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
        $('body').prepend(this.$app);
    }
}

new Index(jQuery)