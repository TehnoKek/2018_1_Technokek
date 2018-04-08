'use strict';

import View from "../view/index.js";
import viewNames from "../viewNames.js";

class LobbyScreen extends View {
    constructor({ parentName }) {
        super({
            name: viewNames.LOBBY_SCREEN,
            parentName,
            tmpl: window.lobbyscreenTmplTemplate
        });
    }
}
export default LobbyScreen;