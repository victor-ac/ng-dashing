'use strict';

var logger = require('log4js').getLogger('dummy.job');
logger.trace('starting job');

const axios = require('axios');

function timeLeft(str) {
    var result = ( ( new Date(str).getTime() - new Date().getTime() ) / 3600000);
    result = Math.round(result * 100) / 100;
    return result + 'h';
}

let addresses = [
    {
        name: 'John Doe',
        age: '43',
        city: 'London'
    },
    {
        name: 'Mickey Mouse',
        age: '100',
        city: 'Disney'
    },
    {
        name: 'Harry Potter',
        age: '18',
        city: 'Hogwarts'
    }
];

setInterval(function () {
    send_event('countdown', {'value': new Date(2019, 0)});
    send_event('currentDate', {'value': new Date()});
    send_event('guy', {'value': 'Thanks!'});
    var cloudifyData = {
        'deadlines': {
            'value': {
                'headers': ['title', 'left'],
                'rows': [
                    ['sprint7 code freeze', timeLeft('2019/March/9 18:00')],
                    ['sprint7 end', timeLeft('2019/March/12 18:00')],
                    ['sprintRC start', timeLeft('2019/March/15 18:00')],
                    ['sprintRC code freeze', timeLeft('2019/March/22 18:00')],
                    ['sprintRC end', timeLeft('2019/March/25 18:00')],
                    ['sprint7 code freeze', timeLeft('2019/March/9 18:00')],
                    ['sprint7 end', timeLeft('2019/March/12 18:00')],
                    ['sprintRC start', timeLeft('2019/March/15 18:00')],
                    ['sprintRC code freeze', timeLeft('2019/March/22 18:00')],
                    ['sprintRC end', timeLeft('2019/March/25 18:00')]
                ]

            }
        }
    };
    send_event('cloudifyDeadline', cloudifyData.deadlines);
}, 1000);

//Get a random dog image
function fetchDogImage () {
    // Dog image widget
    const dataUrl = "https://random.dog/woof.json";
    axios.get(dataUrl)
        .then(function (response) {
            let acceptableFileTypes = ['jpg', 'gif', 'png'];
            let imageUrl = "";
            if (response.data && response.data.url) {
                imageUrl = response.data.url;
                if (acceptableFileTypes.indexOf(imageUrl.slice(-3).toLowerCase()) !== -1) {
                    send_event('dogImage', { 'imageUrl': imageUrl });
                }
            }
        })
        .catch(function (error) {
            console.error(error);
            send_event('dogImage', { 'imageUrl': '', 'error': true });
        });
}
setInterval(function () {
    fetchDogImage();
    send_event('addressBook', {'value': addresses});
}, 15000);
