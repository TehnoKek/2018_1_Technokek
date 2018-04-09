'use strict';

import View from "../../view/index.js";
import viewNames from "../../viewNames.js";
import Header from "./header/index.js";
import Central from "./central/index.js";

class MainScreen extends View {
    constructor({ parentName }) {
        super({
            name: viewNames.MAIN_SCREEN,
            parentName,
            tmpl: window.mainscreen1TmplTemplate
        });

        this._header = new Header({ parentName: this._name });
        this._cental = new Central({ parentName: this._name });
    }

    render() {
        super.render();

        this._header.render().renderTo(this._el);
        this._cental.render().renderTo(this._el);

        return this;
    }

    // TODO: another
}

export default MainScreen;
