import tpl from './index.tpl';
import './index.scss';

import tools from '../../../utils/tools';

class ContentItem{
    constructor(){
        this.name = 'contentItem';
    }

    tpl(content,price,pic,name,index){
        return tools.tplReplace(tpl(),{
            isCurrent:index === 0? 'content-item current':'content-item',
            content,
            dataPrice:price,
            price:price ?price+'元' :'',
            pic,
            name
        })
    }
}

export { ContentItem }