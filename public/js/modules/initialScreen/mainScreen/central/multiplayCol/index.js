'use strict';

import View from "../../../../view/index.js";
import viewNames from "../../../../viewNames.js";

import ButtonView from "../../../../toolViews/buttonView/index.js";
import buttonTypes from "../../../../toolViews/buttonView/types.js";
import eventBus from "../../../../../components/arcitectureElements/eventBus.js";
import profileEvents from "../../../../../models/profile/eventsNames.js";


class MultiplayCol extends View {
    constructor({ parentName }) {
        super({
            name: viewNames.MULTIPLAY_COL,
            parentName,
            tmpl: window.multiplaycolTmplTemplate
        });

        this._playWithStrangerBtn = new ButtonView({
            parentName: this._name,
            text: 'Play with stranger',
            style: buttonTypes.PLAY
        });

        this._playWithFriendBtn = new ButtonView({
            parentName: this._name,
            text: 'Play with friend',
            style: buttonTypes.PLAY
        });
    }

    render() {
        super.render();
        
        const playButtonsContainer = this._el.querySelector('.js-play-buttons-container');
        this._playWithStrangerBtn.render().renderTo(playButtonsContainer);
        this._playWithFriendBtn.render().renderTo(playButtonsContainer);

        return this;
    }

    _initAllowingDependencies() {
        eventBus.on(profileEvents.AUTHORIZED(), this.show.bind(this)).
            on(profileEvents.DEAUTHORIZED(), this.hide.bind(this));

        return this;
    }
}

export default MultiplayCol;