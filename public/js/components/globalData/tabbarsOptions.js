
'use strict';

import tablesNames from "./tablesNames.js";
import tablesOptions from "./tablesOptions.js";
import modes from "./modes.js";

import ProfileView from "../../modules/initialScreen/downScreen/profileView/index.js";
import RulesView from "../../modules/initialScreen/downScreen/rulesView/index.js";
import ScoreboardView from "../../modules/initialScreen/downScreen/scoreboardView/index.js";
import MainView from "../../modules/initialScreen/downScreen/mainView/index.js";

import TableSectionView from "../../modules/toolViews/sections/tableSectionView/index.js";
import routerPaths from "../router/routerPaths.js";


const tabbarsOptions = {
    MAIN: {
        name: 'main',
        tabs: [
            {
                name: 'main',
                title: 'Mimimi-tro',
                avaliable: true,
                active: false,
                authDepends: false,
                sectionType: MainView,
                routerPath: routerPaths.BASE
            },
            {
                name: 'profile',
                title: 'Profile',
                avaliable: false,
                active: false,
                authDepends: true,
                sectionType: ProfileView,
                routerPath: routerPaths.USER
            },
            {
                name: 'about',
                title: 'About',
                avaliable: true,
                active: false,
                authDepends: false,
                sectionType: RulesView,
                routerPath: routerPaths.ABOUT
            },
            {
                name: 'scoreboard',
                title: 'Scoreboard',
                avaliable: true,
                active: false,
                authDepends: false,
                sectionType: ScoreboardView,
                routerPath: routerPaths.SCOREBOARD
            },
        ]
    },
    HISTORY: {
        name: 'history',
        tabs: [
            {
                name: 'singleplayer',
                title: 'Singleplayer',
                avaliable: true,
                active: false,
                authDepends: false,
                sectionType: TableSectionView,
                sectionData: {
                    table: tablesOptions[tablesNames.HISTORY][modes.SP],
                }
            },
            {
                name: 'multiplayer',
                title: 'Multiplayer',
                avaliable: true,
                active: false,
                authDepends: false,
                sectionType: TableSectionView,
                sectionData: {
                    table: tablesOptions[tablesNames.HISTORY][modes.MP]
                }
            }
        ]
    },
    SCOREBOARD: {
        name: 'scoreboard',
        tabs: [
            {
                name: 'singleplayer',
                title: 'Singleplayer',
                avaliable: true,
                active: false,
                authDepends: false,
                sectionType: TableSectionView,
                sectionData: {
                    table: tablesOptions[tablesNames.SCOREBOARD][modes.SP]
                }
            },
            {
                name: 'multiplayer',
                title: 'Multiplayer',
                avaliable: true,
                active: false,
                authDepends: false,
                sectionType: TableSectionView,
                sectionData: {
                    table: tablesOptions[tablesNames.SCOREBOARD][modes.MP]
                }
            }
        ]
    }
};

export default tabbarsOptions;