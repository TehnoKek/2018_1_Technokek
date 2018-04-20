'use strict';

import View from "../view/index.js";
import viewNames from "../viewNames.js";

import InitialScreen from "../initialScreen/index.js";
import LobbyScreen from "../lobbyScreen/index.js";
import GameScreen from "../gameScreen/index.js";

class RootView extends View {
    constructor() {
        super({
            parentName: null,
            name: viewNames.ROOT,
            tmpl: window.rootviewTmplTemplate,
            active: true,
        });

        this._initialScreen = new InitialScreen({ parentName: this._name });
        this._lobbyScreen = new LobbyScreen({ parentName: this._name });
        this._gameScreen = new GameScreen({ parentName: this._name });
    }



    render() {
        super.render();

        this._initialScreen.render().renderTo(this._el);
        this._lobbyScreen.render().renderTo(this._el);
        this._gameScreen.render().renderTo(this._el);

        return this;
    }
}

export default RootView;