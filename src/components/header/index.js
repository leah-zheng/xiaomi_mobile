import tpl from './index.tpl';
import './index.scss';

import {Logo} from './logo/index';
import { Nav } from './nav/index';

import tools from '../../utils/tools';

class Header {
    constructor(el,fieldData,phoneData){
        this.name = 'header';
        this.$el = el;
        this.logo = new Logo();
        this.nav = new Nav();
        this.fieldData = fieldData;
        this.phoneData = phoneData;
    }

    async init(){
        await this.render();
        this.bindEvent()
    }

    async render(){
        await this.$el.append(tools.tplReplace(tpl(),{
            logo: this.logo.tpl(),
            nav: this.nav.tpl(this.fieldData)
        }));
    }

    bindEvent(){
        const $nav = $('.J_nav');
        $nav.on('mouseenter','.nav-item',{phoneData:this.phoneData,oNav:this.nav},this.nav.navMouseIn)
    }
}

export { Header };