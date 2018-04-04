'use strict';

import modes from "../components/globalData/modes.js";

import profileModel from "../models/profile/model.js";


class ScoreboardController {
    constructor({
        url = '',
        mode = modes.SP
    } = {}) {
        this._url = url;
        this._mode = mode;
    }

    _ejectMe(rows, me) {
        if (!me || !profileModel.authenticated) {
            return rows;
        }

        for (let row of rows) {
            if (row.index === me.index) {
                row.active = true;
                return rows;
            }
        }

        let myRow = {};

        if (this._mode === modes.SP) {
            myRow = {
                index: me.index,
                nickname: profileModel.nickname,
                score: profileModel.score,
                active: true
            };
            // TODO: Добавить в модель
        }

        if (this._mode === modes.MP) {
            myRow = {
                index: me.index,
                nickname1: profileModel.nickname,
                nickname2: me.nickname2,
                score: me.score,
                active: true
            };
        }

        rows.append(myRow);
        return rows;
    }
}

export default ScoreboardController;