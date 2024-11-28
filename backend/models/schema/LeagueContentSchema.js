const Schema = mongoose.Schema;


const LeagueContentSchema = new Schema({
  sport : {
    type : String,
    required : true
  },
  country : {
    type : String,
    required : true
  },
  league : {
    type : String,
    required : true
  },
  fullDescriptions : { 
    type: String, 
    required: true 
  },
},
{ timestamps: true }
);


module.exports = mongoose.model('LeagueContent', LeagueContentSchema);