'use strict';

import profileModel from "../../models/profile/model.js";

const filterMasks = {
    AUTH_REQUIRED: () => profileModel.authenticated,
    DEAUTH_REQUIRED: () => !profileModel.authenticated,
    REDIRECT_ALL: () => false,
};

export default filterMasks;