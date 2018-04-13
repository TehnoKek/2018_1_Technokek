'use strict';

import View from "../../../../../view/index.js";
import viewNames from "../../../../../viewNames.js";
import buttonTypes from "../../../../../toolViews/buttonView/types.js";
import ButtonView from "../../../../../toolViews/buttonView/index.js";

class SingleplayCol extends View {
    constructor({ parentName }) {
        super({
            name: viewNames.SINGLEPLAY_COL,
            parentName,
            tmpl: window.singleplaycolTmplTemplate
        });

        this._playBtn = new ButtonView({
            parentName: this._name,
            text: 'Singleplay!',
            style: buttonTypes.PLAY
        });
    }

    render() {
        super.render();

        const playButtonsContainer = this._el.querySelector('.js-play-buttons-container');
        this._playBtn.render().renderTo(playButtonsContainer);

        return this;
    }
}

export default SingleplayCol;