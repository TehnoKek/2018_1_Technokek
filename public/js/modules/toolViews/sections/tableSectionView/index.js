'use strict';

import SectionView from "../sectionView/index.js";
import TableView from "../../tableView/index.js";
import ButtonView from "../../buttonView/index.js";
import buttonTypes from "../../buttonView/types.js";
import tableManager from "../../../../models/table/manager.js";
import eventBus from "../../../../components/arcitectureElements/eventBus.js";
import tableEvents from "../../../../models/table/eventsNames.js";
import tabbarEvents from "../../../../models/tabbar/eventsNames.js";

class TableSectionView extends SectionView {
    constructor({
        tabModel,
    }) {
        super({
             tabModel,
             tmpl: window.tablesectionViewTemplate
        });
        this._attrs.section = tabModel;
        this._initTable()._initLoadBtn()._linkTable();
    }

    _initTable() {
        this._tableModel = tableManager.get(this._attrs.section.sectionData.table);
        this._table = new TableView({
            parentName: this._name,
            tableModel: this._tableModel
        });
        return this;
    }

    _initLoadBtn() {
        this._loadBtn = new ButtonView({
            text: 'Load more',
            parentName: this._name,
            style: buttonTypes.PASSIVE,
            wide: true,
            events: [{
                name: 'click',
                handler: (evt) => {
                    evt.preventDefault();
                    eventBus.call(tableEvents.LOAD_MORE(this._tableModel.name));
                }
            }]
        });
        return this;
    }

    render() {
        super.render();
        this._table.render().renderTo(this._el);
        this._loadBtn.render().renderTo(this._el);
        return this;
    }

    _linkTable() {
        eventBus.on(tabbarEvents.ACTIVE_CHANGED({
            tabbarName: this._attrs.section.parentName,
            tabName: this._attrs.section.name
        }), this._reloadTable.bind(this));
        return this;
    }

    _reloadTable(isActive) {
        if (!isActive) {
            this._tableModel.clear();
        }
        else {
            this._tableModel.loadNextPage();
        }
        return this;
    }
}

export default TableSectionView;