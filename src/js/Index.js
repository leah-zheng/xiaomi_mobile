import { Header } from '../components/header/index';
import{ App } from './App'
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
        $('body').prepend(this.$app);
    }
}

new Index(jQuery)