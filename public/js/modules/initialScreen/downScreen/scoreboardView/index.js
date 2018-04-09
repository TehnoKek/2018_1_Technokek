'use strict';

import SectionView from "../../../toolViews/sections/sectionView/index.js";

class ScoreboardView extends SectionView {
    constructor({ tabModel }) {
        super({
            tabModel,
            tmpl: window.scoreboardviewTmplTemplate
        });
    }
}

export default ScoreboardView;