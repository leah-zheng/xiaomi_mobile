import navMenu from './tpl/nav_menu.tpl';
import navMenuItem from './tpl/nav_menu_item.tpl'
import './index.scss'

import tools from '../../../../utils/tools'

class NavMenu{
    constructor(){
        this.name = 'navMenu',
        this.tpl = navMenu
    }

    apendMenuCard(data){
        let list = '';
        
        data.forEach((item,idx) => {
            if(idx < 6){
                list += tools.tplReplace(navMenuItem(),{
                    id:item.id,
                    isFrist:idx === 0 ? 'first' :'',
                    pic:JSON.parse(item.pics)[0][0][0],
                    phone_name:item.phone_name,
                    default_price:item.default_price
                })
            }
            
        })
        return list;
    }
}

export { NavMenu }