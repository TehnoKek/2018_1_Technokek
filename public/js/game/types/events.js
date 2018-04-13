'use strict';

// сокращаем названия событий
const GAME = 'gm';
const CREATE = 'crt';
const DELETE = 'dlt';
const UPDATE = 'upd';

const START = 'start';
const END = 'end';

const GAME_EVENTS = {};

GAME_EVENTS.PRIMITIVE = {
    CREATE: (primitiveType) => `${GAME}:${CREATE}:${primitiveType}`,
    UPDATE: (primitiveType) => `${GAME}:${UPDATE}:${primitiveType}`,
    DELETE: (primitiveType) => `${GAME}:${DELETE}:${primitiveType}`,
};

GAME_EVENTS.RESOURECES = {
    
}

GAME_EVENTS.PROCESS = {
    START: () => `${GAME}:${START}`,
    END: () => `${GAME}:${END}`
};


export default GAME_EVENTS;