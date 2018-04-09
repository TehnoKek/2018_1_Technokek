'use strict';

import SectionView from "../../../toolViews/sections/sectionView/index.js";

class ProfileView extends SectionView {
    constructor({ tabModel }) {
        super({
            tabModel,
            tmpl: window.profileviewTmplTemplate
        });
    }
}

export default ProfileView;