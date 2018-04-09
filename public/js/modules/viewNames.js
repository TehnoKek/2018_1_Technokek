'use strict';

const viewNames = {
    ROOT: 'rootView',

    INITIAL_SCREEN: 'initialScreen',
    LOBBY_SCREEN: 'lobbyScreen',
    GAME_SCREEN: 'gameScreen',

    MAIN_SCREEN: 'mainScreen',
    HEADER: 'header',
    CENTRAL: 'central',
    AUTH_SIGNUP_COL: 'authSignupCol',
    AUTH_FORM: 'authForm',
    SIGNUP_FORM: 'signupForm',

    SINGLEPLAY_COL: 'sigleplayCol',
    MULTIPLAY_COL: 'multiplayCol',
    
    FOOTER: 'footer',

    DOWN_SCREEN: 'downScreen',

    TABBAR: tabbarName => `tabbar:${tabbarName}`,
    TAB: (tabbarName, tabName) => `tabbar:${tabbarName}/${tabName}`,
    SECTIONS_BAR: tabbarName => `sections:${tabbarName}`,
    SECTION: (tabbarName, tabName) => `sections:${tabbarName}/${tabName}`,
    FORM: formName => `form:${formName}`,
    FORM_FIELD: (formName, fieldName) => `form:${formName}/${fieldName}`,

    BUTTON: (parentName, buttonText) => `${parentName}/button:[${buttonText}]`
};

export default viewNames;