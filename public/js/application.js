'use strict';

import profileModel from './models/profile/model.js';
import RootView from './modules/rootView/index.js';
import router from './components/router/router.js';
import redirectFilter from './components/redirectFilter/filter.js';
import routerPaths from './components/router/routerPaths.js';
import filterMasks from './components/redirectFilter/masks.js';

profileModel.checkAuth();

const body = document.querySelector('body');

const rootView = new RootView();
rootView.create().renderTo(body);

// Добавить редиректы
redirectFilter.set({
    path: routerPaths.USER_ME,
    mask: filterMasks.AUTH_REQUIRED,
    redirectPath: routerPaths.LOGIN
}).set({
    path: routerPaths.USER_EDIT,
    mask: filterMasks.AUTH_REQUIRED,
    redirectPath: routerPaths.LOGIN
}).set({
    path: routerPaths.LOGIN,
    mask: filterMasks.DEAUTH_REQUIRED,
    redirectPath: routerPaths.USER_ME
}).set({
    path: routerPaths.SIGNUP,
    mask: filterMasks.DEAUTH_REQUIRED,
    redirectPath: routerPaths.USER_ME
});

router.start();

window.router = router;