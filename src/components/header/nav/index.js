import navTpl from './tpl/nav.tpl';
import navItemTpl from './tpl/nav_item.tpl';

import './index.scss'

import { NavMenu } from './nav_menu/index'

import tools from '../../../utils/tools';

class Nav{
    constructor(){
        this.name = 'nav';
        this.navmenu = new NavMenu()
    }   

    tpl(data){
        let list = '';
        data.forEach((item,index) => {
            list += tools.tplReplace(navItemTpl(), {
                field: item.field,
                seriesName: item.series_name
            })
        })

        return tools.tplReplace(navTpl(), {
            navItems:list,
            navMenu:this.navmenu.tpl()
        })
        
    }

    navMouseIn(e){
        const data = e.data,
            phoneData = data.phoneData,
            oNav = data.oNav;
        const field = $(this).attr('data-field'),
              $navMenu = $('.J_navMenu');
              
        $navMenu.html(oNav.navmenu.apendMenuCard(phoneData.filter(item => {
                return item.field == field
            })))
    }
}

export { Nav }