
import { Header } from '../components/header/index';
import '../scss/common.scss'

class Index{
    constructor(){
        this.$app = $('<div id="app">');
        this.init();
    }

    init(){
        this.render();
    }

    render(){
        new Header(this.$app).init();
        console.log(new Header(this.$app));
        $('body').prepend(this.$app);
    }
}

new Index(jQuery)