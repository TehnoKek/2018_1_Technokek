'use strict';

import profileModel from './models/profile/model.js';
import RootView from './modules/rootView/index.js';
import router from './components/router/router.js';
import redirectFilter from './components/redirectFilter/filter.js';
import routerPaths from './components/router/routerPaths.js';
import filterMasks from './components/redirectFilter/masks.js';
import eventBus from './components/arcitectureElements/eventBus.js';
import profileEvents from './models/profile/eventsNames.js';
import routerEvents from './components/router/routerEvents.js';

profileModel.checkAuth();

const body = document.querySelector('body');

const rootView = new RootView();
rootView.render().renderTo(body);

// Добавить редиректы
redirectFilter.set({
    path: routerPaths.USER,
    mask: filterMasks.AUTH_REQUIRED,
    redirectPath: routerPaths.BASE
}).set({
    path: routerPaths.USER_EDIT,
    mask: filterMasks.AUTH_REQUIRED,
    redirectPath: routerPaths.BASE
});

eventBus.on(profileEvents.DEAUTHORIZED(), () => 
    eventBus.call(routerEvents.ROUTER_OPEN_PATH(routerPaths.BASE))
);

router.start();
window.router = router;