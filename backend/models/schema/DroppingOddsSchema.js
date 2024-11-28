const Schema = mongoose.Schema;


const DroppingOddsSchema = new Schema({
  key : String,
  oddsData : []
},
{ timestamps: true }
);


module.exports = mongoose.model('DroppingOdds', DroppingOddsSchema);