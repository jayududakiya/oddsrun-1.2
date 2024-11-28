var nrc = require('node-run-cmd');

module.exports = {
    start : () => {

        console.log('starting getting backup');

        const DB_NAME = CONFIG.DB_NAME;
        const backup_name = 'Metakampus-' +  Date.now();
        const DB_BACKUP_PATH = path.join(APP_PATH,'db',backup_name);

        console.log(` mongodump -d ${DB_NAME} --gzip --archive=${DB_BACKUP_PATH}`)

        nrc.run(` mongodump -d ${DB_NAME} --gzip --archive=${DB_BACKUP_PATH}`).then(function(exitCodes) {

            _Mail({
                to : '',
                subject : '',

            });

            const mail = {
                to  : `kdmakwana43@gmail.com`,
                subject : 'Database backup',
                template :'backup.html',
                context :{
                    template :'backup.html',
                    COMPANY : 'Codenatial',
                    attachments : [
                        {
                            filename : backup_name,
                            path : DB_BACKUP_PATH
                        }
                    ]
                }
            }
    
            _Mail(mail);


        }, function(err) {

            console.log('Failed to get db backup',err)

        });
    }
}