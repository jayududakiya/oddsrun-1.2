const Schema = mongoose.Schema;


const LeagueMatchesSchema = new Schema({
  league : {
   type : String,
   required : true,
  },
  matches : []
},
{ timestamps: true }
);


module.exports = mongoose.model('LeagueMatches', LeagueMatchesSchema);