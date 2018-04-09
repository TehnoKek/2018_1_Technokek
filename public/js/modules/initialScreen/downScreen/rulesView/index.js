'use strict';

import SectionView from "../../../toolViews/sections/sectionView/index.js";

class RulesView extends SectionView {
    constructor({ tabModel }) {
        super({
            tabModel,
            tmpl: window.rulesviewTmplTemplate
        });
    }
}

export default RulesView;