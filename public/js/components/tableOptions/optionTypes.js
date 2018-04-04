'use strict';

class TableRow {
    constructor({
        active = false
    } = {}) {
        
    }
}

class TableColumnOptions {
    constructor({
        title = '',
        name = '',
        template = ''
    } = {}) {
        Object.assign(this, arguments[0]);
    }
}

class TableOptions {
    constructor({
        name = '',
        controllerClass = {},
        columns = [],
    } = {}) {
        Object.assign(this, arguments[0]);        
    }
}

const tableOptionTypes = {
    Table: TableOptions,
    Column: TableOptions
};

export default tableOptionTypes;