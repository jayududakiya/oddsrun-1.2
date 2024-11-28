const Schema = mongoose.Schema;


const MatchOddsDetailsSchema = new Schema({
  match : {
   type : String,
   required : true,
  },
  market : {
   type : String,
   required : true,
  },
  date : {
    type : String,
    required : true,
   },
  data : {},
  matchDetails : {},
},
{ timestamps: true }
);


module.exports = mongoose.model('MatchOddsDetails', MatchOddsDetailsSchema);