'use strict';

import SectionView from "../../../toolViews/sections/sectionView/index.js";
import SMTableSectionsView from "../../../toolViews/sections/smTableSectionsView/index.js";
import tabbarsOptions from "../../../../components/globalData/tabbarsOptions.js";
import router from "../../../../components/router/router.js";
import routerPaths from "../../../../components/router/routerPaths.js";

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

        router.register({
            path: routerPaths.SCOREBOARD,
            name: this._name
        });
    }

    // initRoutable() {
    //     router.register({
    //         path: routerPaths.SCOREBOARD,
    //         name: this._name
    //     });

    //     return this._initRoutableByName(this._name);
    // }

    render() {
        super.render();
        this._tables.render().renderTo(this._el);
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