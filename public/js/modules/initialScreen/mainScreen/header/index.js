'use strict';

import View from "../../../view/index.js";
import viewNames from "../../../viewNames.js";

class Header extends View {
    constructor({ parentName }) {
        super({
            name: viewNames,
            parentName,
            tmpl: window.header1TmplTemplate
        });
    }
}

export default Header;