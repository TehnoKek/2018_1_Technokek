'use strict';

import utiles from "../../../components/utiles.js";
import eventBus from "../../../components/arcitectureElements/eventBus.js";
import tableEvents from "../../../models/table/eventsNames.js";
import View from "../../view/index.js";
import viewNames from "../../viewNames.js";

class TableView extends View {
    constructor({
        parentName,
        tableModel
    }) {
        super({
            parentName,
            name: viewNames.TABLE(tableModel.name),
            tmpl: window.tableViewTemplate
        });
        
        console.log(`TABLE ${this._name}; PARENT_NAME ${this._parentName}`);

        this._tableModel = tableModel;
        this._initRowTemplate().
            _connectToEventBus();
    }
    
    _initRowTemplate() {
        this._rowTemplate = this._tableModel.columns.map( option => option.template ).join(' ');        
        return this;
    }
    
    _connectToEventBus() {
        eventBus.on(tableEvents.DATA_CHANGED(this._tableModel.name), (rows) => {
            if (this._active) {
                this.reset().extendRows(rows);
            }
        });

        return this;
    }
    
    render() {
        return super.render().
            _renderHeader().
            reset().
            extendRows(this._tableModel.rows);
    }
    
    _renderHeader() {
        const header = this._el.querySelector('.js-table-header');
        header.style['grid-template-columns'] = this._rowTemplate;
        
        for (let column of this._tableModel.columns) {
            const template = window.headercellViewTemplate({
                cell: {
                    class: `js-header-${column.name}`,
                    text: column.title
                }
            });
            const newCell = utiles.htmlToElements(template)[0];
            header.appendChild(newCell);            
        }

        return this;
    }
    
    reset() {
        const rows = this._el.querySelector(`.js-table-rows`);
        while (rows.firstChild) {
            rows.removeChild(rows.firstChild);
        }
        return this;
    }

    extendRows(rows = []) {
        for (let row of rows) {
            this.appendRow(row);
        }
        return this;
    }

    appendRow(row) {
        const rowsContainer = this._el.querySelector(`.js-table-rows`);
        
        const rowArray = this._tableModel.columns.map(column => row[column.name]);
        const rowTemplate = window.tablerowViewTemplate({
            rowArray,
            active: row.active ? 'active-row' : ''
        });
        const rowElement = utiles.htmlToElements(rowTemplate)[0];
        rowElement.style['grid-template-columns'] = this._rowTemplate;
        rowsContainer.appendChild(rowElement);
        return this;
    }

    hide() {
        console.log('HIDE TABLE');
        this._tableModel.clear();
        return super.hide();
    }

    show() {
        this.reset();
        if (super.show().allowed()) {
            this._tableModel.reload();
        }
        return this;
    }

}

export default TableView;