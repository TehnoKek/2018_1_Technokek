'use strict';

import View from "../../../../view/index.js";
import viewNames from "../../../../viewNames.js";
import SMTableSectionsView from "../../../../toolViews/sections/smTableSectionsView/index.js";
import tabbarsOptions from "../../../../../components/globalData/tabbarsOptions.js";

class HistorySection extends View {
    constructor({ parentName }) {
        super({
            parentName,
            name: viewNames.HISTORY_SECTION,
            tmpl: window.historysectionViewTemplate
        });

        this._tables = new SMTableSectionsView({
            parentName: this._name,
            tabbarOptions: tabbarsOptions.HISTORY
        });
    }

    render() {
        super.render();
        this._tables.render();        
        this._tables.renderTo(this._el);
        return this;
    }

    show() {
        super.show();
        this._tables.show();
        return this;
    }

    hide() {
        super.hide();
        this._tables.hide();
        return this;
    }
}

export default HistorySection;