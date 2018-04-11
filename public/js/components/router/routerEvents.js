'use strict';

function generateTemplate(eventType) {
    return (mixinName) => `routable:${mixinName}/${eventType}`;
}

const routerEvents = {
    // Открыть
    OPEN: name => generateTemplate('open')(name),       
    // Закрыть
    CLOSE: name => generateTemplate('close')(name),     
    
    // Перед закрытием
    PRE_CLOSING: name => generateTemplate('pre-closing')(name),   
    // Уже закрыт
    OPENED: name => generateTemplate('opened')(name),
};

export default routerEvents;