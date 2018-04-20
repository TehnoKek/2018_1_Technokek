'use strict';

import View from "../../../view/index.js";
import viewNames from "../../../viewNames.js";

class SectionsBarView extends View {
    constructor({
        parentName,
        tabbarModel,
        tmpl
    }) {
        super({
            parentName,
            name: viewNames.SECTIONS_BAR(tabbarModel),
            tmpl,
            attrs: { tabbarModel }
        })._createSections();
    }

    initRoutable() {
        // Подсоединяемся к миру с помощью псевдонимов для детей
        for (let tab of this._attrs.tabbarModel.tabs) {
            this._initRoutableByName(viewNames.SECTION_PARENT(tab));
        }
        return this;
    }

    _createSections() {
        this._sections = this._attrs.tabbarModel.tabs.map(
            tab => new tab.sectionType({
                tabModel: tab
            })
        );
        return this;
    }

    render() {
        super.render();
        for (let section of this._sections) {
            section.render().renderTo(this._el);
        }
        return this;
    }

    show(name) {
        if (super.show().allowed()) {
            let fromChild = false;
            for(let tab of this._attrs.tabbarModel.tabs) {
                console.log('CHECK', name, viewNames.SECTION_PARENT(tab));
                if (name === viewNames.SECTION_PARENT(tab)) {
                    fromChild = true;
                    break;
                }
            }

            if (!fromChild) {
                this._attrs.tabbarModel.activateFirst();
            }
        }
        return this;
    }
}

export default SectionsBarView;