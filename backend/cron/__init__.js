const { collectAllTheMatches, saveMatchesOdds, saveDroppingOdds, saveSureBets, saveResults } = require('./services');
const { SPORT_MARKET } = require('./sports-market');



var CronJob = require('cron').CronJob;


module.exports = {

    __init__: () => {

        // Database backup
        // var job = new CronJob('*/50 * * * *', function() {
        //     require('./db-backup').start();
        // }, null, true);

        // job.start();



    },

    __matches__: async () => {

        var job = new CronJob('*/8 * * * *', function () {
            console.log('CRON RUNNING')


            // require('./all-sports-matches').start()

            // require('./soccer-matches').start()
            // require('./tennis-matches').start()
            // require('./basketball-matches').start()
            // require('./hockey-matches').start()
            // require('./handball-matches').start()
            // require('./baseball-matches').start()
            // require('./cricket-matches').start()

            const condition = {
                createdAt: {
                    $lte: moment().subtract(1, 'day').toDate()
                }
            }

            _MachOdds.deleteMany(condition);

        }, null, true);

        job.start();


    },
    __calculateDroppingOdds__: async () => {

        // Every 3 hours
        var job = new CronJob('0 */3 * * *', function () {


            // calculate doping odds and surebets
            saveDroppingOdds();
            saveSureBets();

        }, null, true);

        job.start();


    },

    __sportCron: async () => {

        var job = new CronJob('* * * * *', async function () {

            try {

                const now = new Date();

                const condition = {
                    status: 'Activate'
                }

                // const crons = [
                //     // {
                //     //     sport: 'cricket',
                //     //     intervalInMinutes: 120,
                //     //     updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
                //     // },
                // ];
                const crons = await Model._find(_Cron, condition);
                // console.log('crons',crons)
                if (!crons) throw new Error('No any crons found');

                const updated_sports = []
                var allSportsMatches = [];

                for (let index = 0; index < crons.length; index++) {
                    const cron = crons[index];

                    const { sport, intervalInMinutes, lastUpdatedOdds, updatedAt } = cron;
                    const market = SPORT_MARKET[sport][0].key

                    const nextRunTime = new Date(lastUpdatedOdds);
                    nextRunTime.setMinutes(nextRunTime.getMinutes() + intervalInMinutes);

                    console.log('Now', now)
                    console.log('nextRunTime', nextRunTime, now >= nextRunTime)

                    if (now >= nextRunTime) {

                        console.log(`Running script for sport: ${sport}`);

                        try {
                            const { sportMatches, totalAPICalls } = await collectAllTheMatches(sport);
                            console.log(`Sport ${sport} and Market ${market} Matches : `, sportMatches.length);
                            cron.lastUpdatedOdds = now;
                            cron.totalAPICalls = cron.totalAPICalls ? (+cron.totalAPICalls + totalAPICalls) : totalAPICalls;
                            cron.totalNumberOfMatches = sportMatches.length;
                            cron.save();
                            await saveMatchesOdds(sport, sportMatches, market);
                            updated_sports.push(sport)
                            allSportsMatches = [...allSportsMatches, ...sportMatches]
                        } catch (error) {
                            console.log('Error in __sportCron ', error);
                            cron.hasError = error.message
                            cron.save();
                            continue;
                        }



                    }


                }

                // console.log('allSportsMatches',allSportsMatches)

                if (allSportsMatches.length !== 0) {

                    var deletedMatches = await _Matches.deleteMany({
                        'match.sport-url-name': {
                            $in: updated_sports
                        }
                    });
                    console.log('Deleted Matches ', deletedMatches)

                    await _Matches.insertMany(allSportsMatches);
                    saveResults(allSportsMatches)


                }



            } catch (error) {
                console.log('Error In Cron', error);
            }

        }, null, true);

        job.start();

        // require('./hot-matches').start()


    },


}