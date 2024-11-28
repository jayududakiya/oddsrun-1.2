const Schema = mongoose.Schema;


const CronsSchema = new Schema({
   sport: { type: String, required: true, enum : [
    "soccer",
    "tennis",
    "basketball",
    "hockey",
    "handball",
    "baseball",
    "volleyball",
    "cricket",
    "snooker",
    "darts",
    "boxing",
    "badminton",
    "esports",
    "mma",
    "american-football",
    "futsal",
    "rugby-union",
    "rugby-league"
] },
   intervalInMinutes : { type: Number, required: true },
   lastUpdatedOdds : Date,
   totalAPICalls : { type: Number, default : 0 },
   totalNumberOfMatches : { type: Number, default : 0 },
   hasError : { type: String, default : '0' },
   status : { type: String, default : 'Activate' , enum : ['Activate', 'Deactivate']},
},
{ timestamps: true }
);


module.exports = mongoose.model('Crons', CronsSchema);