'use strict';

import utiles from "../../components/utiles.js";

import View from "../view/index.js";
import viewNames from "../viewNames.js";
import SectionsBar from "../tools/section/sectionsBar.js";
import Mainscreen from "../mainscreen/mainscreen.js";


class InitialScreen extends View {
    constructor({ parentName }) {
        super({
            name: viewNames.INITIAL_SCREEN,
            parentName,
            tmpl: window.initialscreenTmplTemplate,
        });

        this._mainScreen = new Mainscreen({
            parentName: this._name,
        });

        this._downScreen = new SectionsBar({
            parentName: this._name
        });
    }

    // render() {
    //     super.render();

    //     const mainScreenContainer = this._el.querySelector('.js-main-screen-container');
    //     this._mainScreen.render().renderTo(mainScreenContainer);
        
    //     const downScreenContainer = this._el.querySelector('.js-down-screen-container');
    //     this._downScreen.render().renderTo(downScreenContainer);

    //     return this;
    // }
}

export default InitialScreen;
