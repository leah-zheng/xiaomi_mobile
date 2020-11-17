import tpl from './index.tpl';
import './index.scss';

import {Logo} from './logo/index';
import { Nav } from './nav/index';
import { Search } from './search';

import tools from '../../utils/tools';


class Header {
    constructor(el,fieldData,phoneData){
        this.name = 'header';
        this.$el = el;
        this.logo = new Logo();
        this.nav = new Nav();
        this.search = new Search();
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
            nav: this.nav.tpl(this.fieldData),
            search: this.search.tpl()
        }));
    }

    bindEvent(){
        const $nav = $('.J_nav'),
              $searchBtn = $('.J_searchBtn');

        //事件委托鼠标进入触发事件并传参
        $nav.on('mouseenter','.nav-item',{phoneData:this.phoneData,oNav:this.nav},this.nav.navMouseIn);
        //绑定点击事件执行搜索函数
        $searchBtn.on('click', this.search.searchPhone);
    }
}

export { Header };