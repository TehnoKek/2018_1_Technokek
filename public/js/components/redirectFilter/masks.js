'use strict';

import profileModel from "../../models/profile/model.js";
import routerPaths from "../router/routerPaths.js";

const filterMasks = {
    AUTH_REQUIRED: () => profileModel.authenticated,
    DEAUTH_REQUIRED: () => !profileModel.authenticated,
    REDIRECT_ALL: () => false,
    EXISTS: (path) => {
        for (let realPath of Object.values(routerPaths)) {
            if (path === realPath) {
                return true;
            }
            return false;
        }
    }
};

export default filterMasks;