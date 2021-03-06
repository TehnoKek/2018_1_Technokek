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
        });
        
        this._sections = this._attrs.tabbarModel.tabs.map(section => {
            return new section.sectionType({
                tabModel: section
            });
        });
    }

    initRoutable() {
        for (let tab of this._attrs.tabbarModel.tabs) {
            this._initRoutableByName(viewNames.SECTION_PARENT(tab));
        }
        console.log(this);
        return this;
    }

    render() {
        super.render();

        for (let section of this._sections) {
            section.render().renderTo(this._el)._changeHidden();
        }

        // console.log('ActivateFirst: ', this._attrs.tabbarModel);
        // this._attrs.tabbarModel.activateFirst();

        return this;
    }

    show(name) {
        super.show();
        this._attrs.tabbarModel.activateFirst();

        // let fromChild = false;
        // for(let tab of this._attrs.tabbarModel.tabs) {
        //     console.log('CHECK', name, viewNames.SECTION_PARENT(tab));
        //     if (name === viewNames.SECTION_PARENT(tab)) {
        //         fromChild = true;
        //         break;
        //     }
        // }

        // if (!fromChild) {
        //     this._attrs.tabbarModel.activateFirst();
        // }

        return this;
    }
}

export default SectionsBarView;