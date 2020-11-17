import tpl from './tpl/swiper.tpl';
import itemTpl from './tpl/item.tpl';
import indicatorTpl from './tpl/indicator.tpl';
import controlTpl from './tpl/control.tpl';

import './index.scss'

import tools from '../../utils/tools';

class Carousel {
    constructor(el, data){
        this.name = 'carousel';
        this.$el = el;
        this.data = data;
        this.dataLen = this.data.length;
        this.curIdx = 0;
    }

    async init(){
        await this.render();
        this.autoPlay()
    }
    
    async render(){
        await this.$el.append(this.makeItem());

        this.$carousel = $('.J_carousel');
        this.$carItems = $('.car-item');
        this.$indicator = this.$carousel.find('.indicator-item');
    }

    autoPlay(){
        Carousel.timer = setInterval(this.run.bind(this,'next'), 3000);
    }

    run(dir){
        switch (dir) {
            case 'next':
                if(this.curIdx >= this.dataLen -1){
                    this.curIdx = 0
                }else{
                    this.curIdx++;
                }
                break;
            case 'prev':
                if(this.curIdx === 0){
                    this.curIdx = this.dataLen -1;
                }else{
                    this.curIdx--;
                }
                break;
        
            default:
                break;
        }
        this.fadeAction(this.curIdx)
    }

    fadeAction(index){
        this.$carItems.eq(index).fadeIn()
                      .siblings().fadeOut();
        this.$carIndicator.eq(index).addClass('current')
                          .siblings().removeClass('current');
    }

    makeItem(){
        let list = "";
        list = tools.tplReplace(tpl(),{
            list:this.makeList(),
            indicatorW:18 * this.dataLen,
            indicator:this.makeIndicator(),
            control:controlTpl()
        })
        return list;
    }

    makeIndicator(){
        let list = "";
        for(var i = 0;i < this.dataLen; i++){
            list += tools.tplReplace(indicatorTpl(),{
                isCurrent:i === 0?'current':''
            })
        }
        return list;
    }

    makeList(){
        let list = "";

        this.data.forEach((item,idx) => {
            list += tools.tplReplace(itemTpl(),{
                id:item.phoneId,
                swiper_img:item.pic,
                alt:item.alt,
                isActive:idx === 0 ? 'active' : ""
            })
        })

        return list;
    }

}

export { Carousel }