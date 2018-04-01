'use strict';

const apiUrls = {
    get: {
        ME: () => `/user/me`,
        USER: (id) => `/user/${id}`,
        SCOREBOARD: (mode, page) => `/scoreboard/${mode}/${page}`,
        HISTORY: (mode, page) => `/history/${mode}/${page}`,
        AVATAR: (avatar) => `/avatar/${avatar}`,
        ABOUT: () => `/about`,
        RULES: () => `/rules`,
    },
    post: {
        LOGIN: `/login`,
        REGISTRATION: `/signup`,
        UPLOAD_AVATAR: `/upload/avatar`,
        EDIT_PROFILE: `/user/edit`,
        LOGOUT: `/logout`
    }
};

export default apiUrls;