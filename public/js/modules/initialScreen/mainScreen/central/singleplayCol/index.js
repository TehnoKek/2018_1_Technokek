'use strict';

import View from "../../../../view/index.js";
import viewNames from "../../../../viewNames.js";

class SingleplayCol extends View {
    constructor({ parentName }) {
        super({
            name: viewNames.SINGLEPLAY_COL,
            parentName,
            tmpl: window.singleplaycolTmplTemplate
        });
    }
}

export default SingleplayCol;