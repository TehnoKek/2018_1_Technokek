'use sctrict';

const tableEvents = {
    DATA_CHANGED: (tableName) => `/table:${tableName}/dataChanged`,
    LOAD_MORE: (tableName) => `/table:${tableName}/loadMore`
};

export default tableEvents;