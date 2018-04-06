'use strict';


import profileModel from "../../models/profile/model.js";
import modes from "../globalData/modes.js";

class ScoreboardBaseMixin {
    assignTo(base) {
        Object.defineProperty(base, '_httpCallback', {
            value: this._httpCallback.bind(base)
        });
        Object.defineProperty(base, '_ejectMe', {
            value: this._ejectMe.bind(base)
        });
        Object.defineProperty(base, '_checkMeIndex', {
            value: this._checkMeIndex.bind(base)
        });
    }

    _httpCallback(err, resp) {
        if (err || resp.successful === false) {
            return;
        }

        let rows = resp.message.another;
        const me = resp.message.me;

        if (me) {
            rows = this._ejectMe(rows, me);
        }

        this._addRows(rows);
    }
    
    _ejectMe(rows, me) {
        if (this._checkMeIndex(me.index, rows)) {
            return rows;
        }

        if (this._checkMeIndex(me.index, this._rows)) {
            this._dataChanged();
            return rows;
        }

        // TODO: should be realizes in child
        const myRow = this._constructMe(me);
        

        rows.append(myRow);
        return rows;
    }

    _checkMeIndex(index, rows) {
        for (let row of rows) {
            if (row.index === index) {
                row.active = true;
                return rows;
            }
        }
    }
}

class ScoreboardSingleplayerHttpMixin extends ScoreboardBaseMixin {
    assignTo(base) {
        super.assignTo(base);
        Object.defineProperty(base, '_constructMe', {
            value: this._constructMe.bind(base)
        });
    }

    _constructMe(me) {
        return {
            index: me.index,
            nickname: profileModel.nickname,
            score: profileModel.score,
            active: true
        };
    }
}

class ScoreboardMultiplayerHttpMixin extends ScoreboardBaseMixin {
    assignTo(base) {
        super.assignTo(base);
        Object.defineProperty(base, '_constructMe', {
            value: this._constructMe.bind(base)
        });
    }
    
    _constructMe(me) {
        return {
            index: me.index,
            nickname1: profileModel.nickname,
            nickname2: me.nickname2,
            score: me.score,
            active: true
        };
    }
}

class HistorySingleplayerMixin {
    assignTo(base) {
        Object.defineProperty(base, '_httpCallback', {
            value: this._httpCallback.bind(base)
        });
    }

    _httpCallback(err, resp) {
        if (err || !resp.successful) {
            return;
        }

        this._addRows(resp.message);
    }
}

const httpCollbackMixins = {
    Scoreboard: {
        [modes.SP]: ScoreboardSingleplayerHttpMixin,
        [modes.MP]: ScoreboardMultiplayerHttpMixin
    },
    History: HistorySingleplayerMixin
};

export default httpCollbackMixins;