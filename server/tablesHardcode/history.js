'use sctrict';

const singleplayerHistory = [
    {
        index: 1,
        date: '10-11-2017',
        score: 800
    },
    {
        index: 2,
        date: '10-11-2016',
        score: 600
    },
    {
        index: 3,
        date: '10-11-2015',
        score: 700
    },
    {
        index: 4,
        date: '12-10-2014',
        score: 1000
    },
    {
        index: 5,
        date: '12-10-2013',
        score: 650
    },
    {
        index: 6,
        date: '12-10-2012',
        score: 1000
    },
    {
        index: 7,
        date: '10-11-2011',
        score: 1200
    },
    {
        index: 8,
        date: '12-10-2010',
        score: 1000
    },
    {
        index: 9,
        date: '10-11-2009',
        score: 1200
    },
    {
        index: 10,
        date: '12-10-2008',
        score: 750
    },
    {
        index: 11,
        date: '10-11-2007',
        score: 800
    },
    {
        index: 12,
        date: '10-11-2006',
        score: 600
    },
    {
        index: 13,        
        date: '10-11-2005',
        score: 700
    },
    {
        index: 14,
        date: '12-10-2004',
        score: 1000
    },
    {
        index: 15,
        date: '12-10-2003',
        score: 650
    },
    {
        index: 16,        
        date: '12-10-2002',
        score: 1000
    },
    {
        index: 17,
        date: '10-11-2001',
        score: 1200
    },
    {
        index: 18,
        date: '12-10-2000',
        score: 1000
    },
];

const multiplayerHistory = [
    {
        index: 1,
        date: '10-11-2017',
        score: 800,
        partner: 'Pushkin Alexander'
    },
    {
        index: 2,
        date: '10-11-2016',
        score: 600,
        partner: 'Pushkin Alexander'
    },
    {
        index: 3,
        date: '10-11-2015',
        score: 700,
        partner: 'Pushkin Alexander'
    },
    {
        index: 4,
        date: '12-10-2014',
        score: 1000,
        partner: 'Pushkin Alexander'
    },
    {
        index: 5,
        date: '12-10-2013',
        score: 650,
        partner: 'Pushkin Alexander'
    },
    {
        index: 6,
        date: '12-10-2012',
        score: 1000,
        partner: 'Pushkin Alexander'
    },
    {
        index: 7,
        date: '10-11-2011',
        score: 1200,
        partner: 'Pushkin Alexander'
    },
    {
        index: 8,
        date: '12-10-2010',
        score: 1000,
        partner: 'Pushkin Alexander'
    },
    {
        index: 9,
        date: '10-11-2009',
        score: 1200,
        partner: 'Pushkin Alexander'
    },
    {
        index: 10,
        date: '12-10-2008',
        score: 750,
        partner: 'Pushkin Alexander'
    },
    {
        index: 11,
        date: '10-11-2007',
        score: 800,
        partner: 'Pushkin Alexander'
    },
    {
        index: 12,
        date: '10-11-2006',
        score: 600,
        partner: 'Pushkin Alexander'
    },
    {
        index: 13,
        date: '10-11-2005',
        score: 700,
        partner: 'Pushkin Alexander'
    },
    {
        index: 14,
        date: '12-10-2004',
        score: 1000,
        partner: 'Pushkin Alexander'
    },
    {
        index: 15,
        date: '12-10-2003',
        score: 650,
        partner: 'Pushkin Alexander'
    },
    {
        index: 16,
        date: '12-10-2002',
        score: 1000,
        partner: 'Pushkin Alexander'
    },
    {
        index: 17,
        date: '10-11-2001',
        score: 1200,
        partner: 'Pushkin Alexander'
    },
    {
        index: 18,
        date: '12-10-2000',
        score: 1000,
        partner: 'Pushkin Alexander'
    },
];

exports.histories = {
    MP: multiplayerHistory,
    SP: singleplayerHistory
};

