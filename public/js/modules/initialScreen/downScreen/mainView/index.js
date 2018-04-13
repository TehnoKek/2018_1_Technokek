'use strict';

import Central from "./central/index.js";
import SectionView from "../../../toolViews/sections/sectionView/index.js";

class MainView extends SectionView {

// -----------------------------------------------------------------------
// CREATING
// -----------------------------------------------------------------------

    constructor({ tabModel }) {
        super({
            tabModel,
            tmpl: window.mainViewTemplate
        });

        this._cental = new Central({ parentName: this._name });
    }

    render() {
        super.render();
        this._cental.render().renderTo(this._el);
        return this;
    }
}

export default MainView;
