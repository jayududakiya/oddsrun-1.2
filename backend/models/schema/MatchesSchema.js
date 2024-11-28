const Schema = mongoose.Schema;


const MatchesSchema = new Schema({
  match : {},
  odds : {},
},
{ timestamps: true }
);


module.exports = mongoose.model('Matches', MatchesSchema);