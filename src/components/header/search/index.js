import tpl from './index.tpl';
import './index.scss';

import tools from '../../../utils/tools';

class Search {
    constructor(){
        this.name = 'search';
        this.tpl = tpl;
    }

    searchPhone(){
        const $searchInput = $('#J_keyword'),
              $searchForm = $('#J_searchForm'),
              inputValue  = tools.trimSpace($searchInput.val()),
              valueLen = inputValue.length,
              action = $searchForm.prop('action');

        if(valueLen > 0) {
            window.open(action + '?keyword='+inputValue);
        }
    }
}

export { Search }