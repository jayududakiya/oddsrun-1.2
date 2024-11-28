
// db.createUser({
//     user: "KD_MASTER",
//     pwd: "MASTER_DB_PASS_1010",
//     roles: [
//         { role: "dbOwner", db: "ODDS_DB_20_MARCH_2024_V1" }
//     ]
// })



// db.createUser({
//     user: "KD_MASTER_2",
//     pwd: "MASTER_DB_PASS_1010_2",
//     roles: [
//         { role: "dbOwner", db: "ODDS_DB_21_MAY_2024_V1" }
//     ]
// })

const connectDB = async () => {
    try {
        await mongoose.connect(`${CONFIG.MODE != "Local" ?  CONFIG.DB_URL :  CONFIG.DB_URL_LOCAL}`,{ useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to database');

        // CRONS
        if(CONFIG.CRON){
            // require('../cron/__init__').__matches__();
            require('../cron/__init__').__sportCron()
            require('../cron/__init__').__calculateDroppingOdds__();
        }


        // require('../cron/__init__').__sportCron()

        // require('../cron/soccer-matches').start()
        // require('./tennis-matches').start()
        // require('../cron/basketball-matches').start()
        // require('./hockey-matches').start()
        // require('./handball-matches').start()
        // require('./baseball-matches').start()
        // require('../cron/cricket-matches').start()


        // require('../cron/all-sports-matches').start()
        // require('../cron/soccer-matches').start()
        // require('../cron/cricket-matches').start()

        // require('../cron/__init__').__matches__();

    } catch (error) {
        console.log('Error while connecting to db',error)
    }
}

connectDB()