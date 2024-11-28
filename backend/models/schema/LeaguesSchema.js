const Schema = mongoose.Schema;


const LeaguesSchema = new Schema({
  sport: {
    type: String,
    required: true,
  },
  leagues: []
},
  { timestamps: true }
);


module.exports = mongoose.model('Leagues', LeaguesSchema);