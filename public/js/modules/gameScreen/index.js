'use strict';

import View from "../view/index.js";
import viewNames from "../viewNames.js";

class GameScreen extends View {
    constructor({ parentName }) {
        super({
            name: viewNames.GAME_SCREEN,
            parentName,
            tmpl: window.gamescreenTmplTemplate
        });
    }
}

export default GameScreen;