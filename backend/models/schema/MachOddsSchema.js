const Schema = mongoose.Schema;


const MachOddsSchema = new Schema({
  sport : {
    type : String,
    required : true,
  },
  match : {
   type : String,
   required : true,
  },
  market : {
   type : String,
   required : true,
  },
  subMarket : {
    type : String,
    default : ''
   },
  date : {
    type : String,
    required : true,
   },
  data : {},
  odds : {},
  matchDetails : {},
  maxBookmarkers : {},
},
{ timestamps: true }
);


module.exports = mongoose.model('MachOdds', MachOddsSchema);