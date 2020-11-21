import tpl from './tpl/wrapper.tpl';
import itemTpl from './tpl/item.tpl';
import {ShowBoard} from '../board_show/index';
import './index.scss';

import tools from '../../utils/tools';
import { NoDataTip } from '../noDataTip';

class Tab {
    constructor(el,fieldData,phoneData){
        this.name = 'tab';
        this.$el = el;
        this.fieldData = fieldData;
        this.phoneData = phoneData;
        this.cache = {};
        this.noDataTip = new NoDataTip();
    }

    async init(){
        await this.render();
        this.bindEvent();
    }
    async render(){
        await this.$el.append(tools.tplReplace(tpl(),{
            list:this.makeList()
        }))
    }

    makeList(){
        let list = '';
        this.fieldData.forEach((item,index)=>{
            list += tools.tplReplace(itemTpl(),{
                field:item.field,
                series_name:item.series_name
            })
        })
        return list;
    }

    bindEvent(){
        const $tab = $('.J_tab'),
              $board = $('.J_board'),
              $input = $('#J_search'),
              oShowBoard = new ShowBoard();
              
        $tab.on('click','.tab-item',{$board, oShowBoard},$.proxy(this.tabClick,this))
        
        $input.on('input',{$board,oShowBoard,$tab},tools.throttle($.proxy(this.inputSearch,this),1000))
    }

    tabClick(e){
        
        const tar = e.target,
              $tar = $(tar),
              tagName = tar.tagName.toLowerCase();
            
        const data = e.data,
              $board = data.$board,
              oShowBoard = data.oShowBoard;
        
        if(tagName === 'a'){
            const field = $tar.attr('data-field');
            
            this.tabChange($tar);
            this.appendList(field,$board,oShowBoard)
        }

    }

    

    inputSearch(e){
        const data = e.data,
              $board = data.$board,
              oShowBoard = data.oShowBoard,
              $tab = data.$tab,
              tar = e.target,
              $tar = $(tar),
              value = tools.trimSpace($tar.val()),
              valLen = value.length;
        
        this.tabChange($tab.find('.all'));

        if(valLen <= 0){
            this.appendList('all',$board,oShowBoard);
        }else{
            this.appendList('all',$board,oShowBoard,value);
        }
    }

    tabChange($target){
        $target.parent().addClass('current')
               .siblings().removeClass('current')
    }

    appendList(field,$board,oShowBoard,keyword){
        if(keyword){
            let data = this.filterDatas(this.phoneData,field,keyword),
                dataLen = data.length;

                if(dataLen === 0) {
                    $board.html(this.noDataTip.tpl('未搜索到相关数据'))
                }else{
                    $board.html(oShowBoard.makeList(data));
                }
        }else{
            if(!this.cache[field]){
                this.cache[field] = oShowBoard.makeList(this.filterDatas(this.phoneData,field))
            }
            //缓存board数据
            $board.html(this.cache[field]);
            
            
        }
    }

    filterDatas(data, field,keyword){
        return data.filter((item,index) =>{
            if(keyword){
                const phone_name = item.phone_name.toLowerCase(),
                      slogan = item.slogan.toLowerCase();
                      keyword = keyword.toLowerCase();

                 return phone_name.includes(keyword) || slogan.includes(keyword);
            }else{
                switch (field) {
                    case 'all':
                        return true;
                        break;
                    default:
                        return item.field === field;
                        break;
                }
            }
        })
    }
}

export { Tab };