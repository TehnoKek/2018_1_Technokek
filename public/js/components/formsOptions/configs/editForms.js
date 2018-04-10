'use strict';

import emailFormConfig from "./email.js";
import nicknameFormConfig from "./nickname.js";
import passwordFormConfig from "./password.js";
import formFieldNames from "../fieldNames.js";

const editFormsConfig = {
    [formFieldNames.edit.email.EMAIL]: emailFormConfig,
    [formFieldNames.edit.nickname.NICKNAME]: nicknameFormConfig,
    [formFieldNames.edit.password.PASSWORD]: passwordFormConfig
};

export default editFormsConfig;