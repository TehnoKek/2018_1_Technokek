'use strict';

const baseUrl = {
    //NEW: '/new',
    NEW: location.hostname === "localhost" ? "/new" : "https://technokek2018.herokuapp.com",
    BASE: ''
};

export default baseUrl;