'use strict';

import View from "../../view/index.js";
import viewNames from "../../viewNames.js";

class DownScreen extends View {
    constructor({ parentName }) {
        super({
            name: viewNames.DOWN_SCREEN,
            parentName
        });
    }
}