'use strict';

function generateTemplate(eventType) {
    return (mixinName) => `routable:${mixinName}/${eventType}`;
}

const eventTemplates = {
    // Открыть
    OPEN: name => generateTemplate('open')(name),       
    // Закрыть
    CLOSE: name => generateTemplate('close')(name),     
    
    // Уже открыт
    CLOSED: name => generateTemplate('closed')(name),   
    // Уже закрыт
    OPENED: name => generateTemplate('opened')(name),   
};

export default eventTemplates;