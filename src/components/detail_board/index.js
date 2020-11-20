import tpl from './index.tpl';
import './index.scss';
import {DetailTitle} from './detail_title/index';
import { ContentItem } from './content_item/index';
import { BtnGroup } from './btn_group/index';
import { DetailModel } from '../../models/detail';

import tools from '../../utils/tools';

class DetailBoard {
    constructor(el,phoneData){
        this.name = 'detailBoard';
        this.phoneData = phoneData;
        this.$el = el;
        this.detailModel = new DetailModel();
    }

    init(){
        this.initPhoneData();
        this.render();
        this.initUserPhoneInfo();
        this.bindEvent();
    }

    
    //初始化phoneData
    initPhoneData(){
        const phoneData = this.phoneData;
        phoneData.color = $.parseJSON(phoneData.color);
        phoneData.version_info = $.parseJSON(phoneData.version_info);
        phoneData.pics = $.parseJSON(phoneData.pics);

    }

    initUserPhoneInfo(){
        const phoneData = this.phoneData;
       
        this.userPhoneInfo = {
            id:phoneData.id,
            color:phoneData.color[0],
            pics:phoneData.pics[0][0][0],
            price:phoneData.version_info[0].price,
            version:phoneData.version_info[0].version,
        }
    }

    render(){
        const detailTitle = new DetailTitle(),
              contentItem = new ContentItem(),
              btnGroup = new BtnGroup(),
              phoneData = this.phoneData;

              
        let versionList = '',
            colorList = '';
        
        phoneData.color.forEach((item,index) => {
            colorList += contentItem.tpl(item,null,phoneData.pics[index][index][0],index);
        })

        phoneData.version_info.forEach((item,index) =>{
            versionList += contentItem.tpl(item.version,item.price,phoneData.pics[0][0][0],index)
        })

        this.$el.append(tools.tplReplace(tpl(),{
            pic_url:phoneData.pics[0][0][0],
            phone_name:phoneData.phone_name,
            slogan:phoneData.slogan,
            default_price:phoneData.default_price,
            title_1:detailTitle.tpl('手机版本'),
            title_2:detailTitle.tpl('手机颜色'),
            versions:versionList,
            colors:colorList,
            btnGroup:btnGroup.tpl()
        }))
    }

    bindEvent(){
        const $versions = this.$el.find('.J_versions'),
              $colors = this.$el.find('.J_colors'),
              $btnGroup = this.$el.find('.J_btnGroup');
        

        // this.versionItems = $versions.children('.content-item');
        // this.colorItems = $colors.children('.content-item');
        this.detailPic = this.$el.find('.J_detailPic');
        
        $versions.on('click', '.content-item', { _this: this }, this.onVersionsClick);
        $colors.on('click', '.content-item', { _this: this }, this.onColorsClick);
        $btnGroup.on('click','.detail-btn',{ _this:this },this.onBtnClick);
    }

    onBtnClick(ev){
        const e = ev || window.event,
              _this = e.data._this;
        let field = $(this).attr('data-field');

        switch (field) {
            case 'purchase':
                _this.purchase();
                break;
            case 'addToCart':
                _this.addToCart();
                break;
        
            default:
                break;
        }
    }

    onVersionsClick(ev){
        const e = ev || window.event,
              _this = e.data._this; 

        _this.onVersionsChange(this);
    }

    onColorsClick(ev){
        const e = ev || window.event,
              _this = e.data._this; 
        
        _this.onColorsChange(this);
    }

    onVersionsChange(target){
        const $target = $(target);
              
        //改变用户选择的数据
        this.userPhoneInfo.version = $target.attr('data-content');
        this.userPhoneInfo.price = $target.attr('data-price');
        //改变当前选中的样式
        $target.addClass('content-item current')
            .siblings().removeClass('current')
        
        
    }

    onColorsChange(target){
        const $target = $(target);
              
        //改变用户选择的数据
        this.userPhoneInfo.color = $target.attr('data-content');
        this.userPhoneInfo.pics = $target.attr('data-pic');
        //改变当前选中的样式
        $target.addClass('content-item current')
            .siblings().removeClass('current');

        this.detailPic.attr('src',$target.attr('data-pic'));
        
    }

    purchase(){
        this.detailModel.purchase(this.userPhoneInfo)
    }

    addToCart(){
        this.detailModel.addToCart(this.userPhoneInfo);
    }
}

export {DetailBoard}