const Schema = mongoose.Schema;


const ResultsSchema = new Schema({
  match : {},
  odds : {},
  year : String,
  date : String,
  league : String
},
{ timestamps: true }
);


module.exports = mongoose.model('Results', ResultsSchema);