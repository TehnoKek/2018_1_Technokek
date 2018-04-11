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
            tmpl
        });

        this._attrs.tabbarModel = tabbarModel;

        this._sections = this._attrs.tabbarModel.tabs.map(section => {
            return new section.sectionType({
                tabModel: section
            });
        });
    }

    render() {
        super.render();

        console.log(this._el);
        for (let section of this._sections) {
            section.render().renderTo(this._el);
        }

        return this;
    }
}

export default SectionsBarView;