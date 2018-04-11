'use strict';

import Init from './modules/init/init.js';
import profileModel from './models/profile/model.js';
import RootView from './modules/rootView/index.js';
import routerMap from './components/routerOptions/options.js';
import router from './components/router/router.js';

// const init = new Init('body');
// init.render();
profileModel.checkAuth();

const body = document.querySelector('body');

const rootView = new RootView();
rootView.create().renderTo(body);

for (let option of routerMap) {
    router.addRoutable(option);
}

router.start();

window.router = router;