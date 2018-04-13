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
            name: viewNames.SECTIONS_BAR(tabbarModel.name),
            tmpl,
            attrs: { tabbarModel }
        });
        
        this._sections = this._attrs.tabbarModel.tabs.map(section => {
            return new section.sectionType({
                tabModel: section
            });
        });
    }

    initRoutable() {
        this._initRoutableByName(this._name);
        for (let tab of this._attrs.tabbarModel.tabs) {
            this._initRoutableByName(viewNames.SECTION_PARENT(tab));
        }
        return this;
    }

    render() {
        super.render();

        for (let section of this._sections) {
            section.render().renderTo(this._el);
        }

        this._attrs.tabbarModel.activateFirst();

        return this;
    }
}

export default SectionsBarView;