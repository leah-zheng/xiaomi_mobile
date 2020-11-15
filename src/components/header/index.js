import tpl from './index.tpl';
import './index.scss';

import {Logo} from './logo/index';

import tools from '../../utils/tools';

class Header {
    constructor(el){
        this.name = 'header';
        this.$el = el;
        this.logo = new Logo();
    }

    init(){
        this.render();
    }

    render(){
        console.log(tpl().replace(/{{(.*?)}}/g,this.logo.tpl()));
        this.$el.append(tpl().replace(/{{(.*?)}}/g,this.logo.tpl()));
        console.log(this.$el[0].outerHTML);
    }
}

export { Header };