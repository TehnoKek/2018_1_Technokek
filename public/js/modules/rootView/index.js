'use strict';

import View from "../view/index.js";
import viewNames from "../viewNames.js";

import InitialScreen from "../initialScreen/index.js";
import LobbyScreen from "../lobbyScreen/index.js";
import GameScreen from "../gameScreen/index.js";

class RootView extends View {
    constructor() {
        super({
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
        
        const initialScreenRoot = this._el.querySelector('.js-initial-screen');
        this._initialScreen.render().renderTo(initialScreenRoot);

        const lobbyScreenRoot = this._el.querySelector('.js-lobby-screen');
        this._lobbyScreen.render().renderTo(lobbyScreenRoot);

        const gameScreenRoot = this._el.querySelector('.js-game-screen');
        this._gameScreen.render().renderTo(gameScreenRoot);

        return this;
    }
}

export default RootView;