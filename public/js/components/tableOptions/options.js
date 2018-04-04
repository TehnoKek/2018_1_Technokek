'use sctrict';

import modes from "../globalData/modes.js";
import tablesNames from "../globalData/tablesNames.js";
import tableOptionTypes from "./optionTypes.js";


const tablesOptions = {
    [tablesNames.SCOREBOARD]: {
        [modes.SP]: new tableOptionTypes.Table({
            name: `scoreboard/${modes.SP}`,
            columns: [
                new tableOptionTypes.Column({
                    title: '#',
                    name: 'index',
                    template: '60px'
                }),
                new tableOptionTypes.Column({
                    title: 'Nickname',
                    name: 'nickname',
                    template: 'auto'
                }),
                new tableOptionTypes.Column({
                    title: 'Score',
                    name: 'score',
                    template: '110px'
                })
            ]
        }),
        [modes.MP]: new tableOptionTypes.Table({
            name: `scoreboard/${modes.MP}`,
            columns: [
                new tableOptionTypes.Column({
                    title: '#',
                    name: 'index',
                    template: '60px'
                }),
                new tableOptionTypes.Column({
                    title: 'Nickname',
                    name: 'nickname1',
                    template: 'minmax(30%, 40%)'
                }),
                new tableOptionTypes.Column({
                    title: 'Nickname',
                    name: 'nickname2',
                    template: 'minmax(30%, 40%)'
                }),
                new tableOptionTypes.Column({
                    title: 'Score',
                    name: 'score',
                    template: 'minmax(90px, auto)'
                })
            ]
        })
    },
    [tablesNames.HISTORY]: {
        [modes.SP]: new tableOptionTypes.Table({
            name: `history/${modes.SP}`,
            columns: [
                new tableOptionTypes.Column({
                    title: '#',
                    name: 'index',
                    template: '60px'
                }),
                new tableOptionTypes.Column({
                    title: 'Date',
                    name: 'date',
                    template: 'auto'
                }),
                new tableOptionTypes.Column({
                    title: 'Score',
                    name: 'score',
                    template: '120px'
                })
            ]
        }),
        [modes.MP]: new tableOptionTypes.Table({
            name: `history/${modes.MP}`,
            columns: [
                new tableOptionTypes.Column({
                    title: '#',
                    name: 'index',
                    template: '60px'
                }),
                new tableOptionTypes.Column({
                    title: 'Date',
                    name: 'date',
                    template: '120px'
                }),
                new tableOptionTypes.Column({  
                    title: 'Partner',
                    name: 'partner',
                    template: 'auto'
                }),
                new tableOptionTypes.Column({
                    title: 'Score',
                    name: 'score',
                    template: '120px'
                }),
            ]
        })
    }
};

export default tablesOptions;