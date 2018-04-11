'use sctrict';


const TITLE_CHANGED_NAME = 'title';
const ACTIVE_CHANGED_NAME = 'active';
const AVALIABLE_CHANGED_NAME = 'avaliable';

const _tabbarEventsTemplate = ({
    tabbarName = '',
    actionName = ''
} = {}) => `/tabbar:${tabbarName}/do:${actionName}`;

const _tabbarTabEventsTemplate = ({
    tabbarName = '',
    tabName = '',
    actionName = ''
} = {}) => 
    `/tabbar:${tabbarName}/${tabName}/changed:${actionName}`;


// Шаблоны событий таббара
const tabbarEvents = {
    // Изменение заголовка
    TITLE_CHANGED: ({tabbarName = '', tabName = ''} = {}) => 
        _tabbarTabEventsTemplate({tabbarName, tabName, actionName: TITLE_CHANGED_NAME}),
    
    // Изменение состояния активности
    ACTIVE_CHANGED: ({tabbarName = '', tabName = ''} = {}) => 
        _tabbarTabEventsTemplate({tabbarName, tabName, actionName: ACTIVE_CHANGED_NAME}),
    
    // Изменение состояния возможности к использованию
    AVALIABLE_CHANGED: ({tabbarName = '', tabName = ''} = {}) => 
        _tabbarTabEventsTemplate({tabbarName, tabName, actionName: AVALIABLE_CHANGED_NAME}),

    DEACTIVATE_ALL: ({tabbarName} = {}) => 
        _tabbarEventsTemplate({tabbarName, actionName:'deactivateAll'}),

    ACTIVATE_FIRST: ({tabbarName} = {}) =>
        _tabbarEventsTemplate({tabbarName, actionName: 'activateFirsl'}),
};


export default tabbarEvents;