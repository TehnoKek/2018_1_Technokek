'use strict';

import View from "../../../../view/index.js";
import viewNames from "../../../../viewNames.js";

class MultiplayCol extends View {
    constructor({ parentName }) {
        super({
            name: viewNames.MULTIPLAY_COL,
            parentName,
            tmpl: window.multiplaycolTmplTemplate
        });
    }
}

export default MultiplayCol;