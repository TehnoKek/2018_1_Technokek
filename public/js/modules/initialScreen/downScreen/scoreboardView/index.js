'use strict';

import SectionView from "../../../toolViews/sections/sectionView/index.js";
import SMTableSectionsView from "../../../toolViews/sections/smTableSectionsView/index.js";
import tabbarsOptions from "../../../../components/globalData/tabbarsOptions.js";

class ScoreboardView extends SectionView {
    constructor({ tabModel }) {
        super({
            tabModel,
            tmpl: window.scoreboardViewTemplate
        });

        this._tables = new SMTableSectionsView({
            parentName: this._name,
            tabbarOptions: tabbarsOptions.SCOREBOARD,
        });
    }

    render() {
        super.render();
        this._tables.render().renderTo(this._el);
        super._changeHidden();
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

export default ScoreboardView;