import tpl from './index.tpl';
import './index.scss';
import {DetailTitle} from './detail_title/index';
import { ContentItem } from './content_item/index';

import tools from '../../utils/tools';

class DetailBoard {
    constructor(el,phoneData){
        this.name = 'detailBoard';
        this.phoneData = phoneData;
        this.$el = el;
    }

    init(){
        this.render()
    }

    render(){
        const detailTitle = new DetailTitle(),
              contentItem = new ContentItem(),
              colors = $.parseJSON(this.phoneData.color),
              versions = $.parseJSON(this.phoneData.version_info);

        let versionList = '',
            colorList = '';

        colors.forEach((item,index) => {
            colorList += contentItem.tpl(item,null,index);
        })

        versions.forEach((item,index) =>{
            versionList += contentItem.tpl(item.version,item.price,index)
        })

        this.$el.append(tools.tplReplace(tpl(),{
            pic_url:$.parseJSON(this.phoneData.pics)[0][0][0],
            phone_name:this.phoneData.phone_name,
            slogan:this.phoneData.slogan,
            default_price:this.phoneData.default_price,
            title_1:detailTitle.tpl('手机版本'),
            title_2:detailTitle.tpl('手机颜色'),
            versions:versionList,
            colors:colorList
        }))
    }


}

export {DetailBoard}