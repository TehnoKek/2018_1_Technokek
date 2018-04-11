'use strict';


import httpRequester from "../../components/http.js";
import eventBus from "../../components/arcitectureElements/eventBus.js";
import tableEvents from "./eventsNames.js";
import baseUrl from "../../components/globalData/baseUrl.js";


class TableModel {
    constructor(tableOptions) {
        this._name = tableOptions.name;
        this._urlFunc = tableOptions.urlFunc;
        
        this._columns = tableOptions.columns;
        
        this._rows = [];
        this._curPage = 0;

        tableOptions.httpCallbackMixin.assignTo(this);
        eventBus.on(tableEvents.LOAD_MORE(this._name), this.loadNextPage.bind(this));
    }
    
    clear() {
        this._rows = [];
        this._curPage = 0;

        this._dataChanged();
    }

    get name() {
        return this._name;
    }

    get rows() {
        return this._rows;
    }
    
    get pagesCount() {
        return this._curPage;
    }

    get columns() {
        return this._columns;
    }

    loadNextPage() {
        console.log('loading started');

        httpRequester.doGet({
            base: baseUrl.NEW,
            url: this._urlFunc({page: this._curPage + 1}),
            callback: this._httpCallback.bind(this)
        });
    }

    _addRows(rows) {
        // Явно отсеивается возможный мусор
        // и отфильтровываются только настоящие поля

        for (let row of rows) {
            const newRow = {};
            for (let column of this._columns) {
                newRow[column.name] = row[column.name] ? row[column.name] : '';
                if (row.active) {
                    newRow.active = true;
                }
            }
            this._rows.push(newRow);
        }

        this._curPage += 1;
        this._dataChanged();
    }

    _dataChanged() {
        console.log('data changed', this._rows);
        eventBus.call(tableEvents.DATA_CHANGED(this._name), this._rows);
    }
}


export default TableModel;