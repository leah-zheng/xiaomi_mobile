import tpl from './tpl/board.tpl';
import tplItem from './tpl/board_item.tpl';
import './index.scss';

import tools from '../../utils/tools';
import { NoDataTip } from '../noDataTip';

class ShowBoard{
    constructor(el,phoneData){
        this.name = "showBoard";
        this.$el = el;
        this.phoneData = phoneData
    }

    init(){
        this.render();
    }

    render(){
        this.$el.append(tools.tplReplace(tpl(),{
            list:this.makeList(this.phoneData) || new NoDataTip().tpl('未搜索到相关数据')
        }))
    }

    makeList(data){
        let list = '';
        data.forEach((item,index) => {
            list += tools.tplReplace(tplItem(),{
                isFirst: index % 5 == 0? 'first' :'',
                id:item.id,
                pic:$.parseJSON(item.pics)[0][0][0],
                phone_name:item.phone_name,
                slogan:item.slogan.substr(1,15),
                default_price:item.default_price
            })
        })

        return list;
    }
}

export { ShowBoard }
