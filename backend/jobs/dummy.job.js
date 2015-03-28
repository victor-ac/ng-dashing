var logger = require('log4js').getLogger('dummy.job');
logger.trace('starting job');

function timeLeft(str) {
    var result = ( ( new Date(str).getTime() - new Date().getTime() ) / 3600000);
    result = Math.round(result * 100) / 100;
    return result + 'h';
}
setInterval(function () {
    send_event('guy', {'value': 2001, 'title': 'guy'});
    var cloudifyData = {
        'deadlines': {
            'title': 'Deadlines',
            'value': {
                'headers': ['title', 'left'],
                'rows': [
                    ['sprint7 code freeze', timeLeft('2015/March/9 18:00')],
                    ['sprint7 end', timeLeft('2015/March/12 18:00')],
                    ['sprintRC start', timeLeft('2015/March/15 18:00')],
                    ['sprintRC code freeze', timeLeft('2015/March/22 18:00')],
                    ['sprintRC end', timeLeft('2015/March/25 18:00')]
                ]

            }
        }
    };
    send_event('cloudifyDeadline', cloudifyData.deadlines);
}, 1000);


