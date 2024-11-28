const Schema = mongoose.Schema;


const HotMatchesSchema = new Schema({
  sport : {
   type : String,
   required : true,
  },
  date : {
    type : String,
    required : true,
   },
  matches : []
},
{ timestamps: true }
);


HotMatchesSchema.pre('save', function(next) {
  this.matches.sort((a, b) => {

       // Concatenate date and email values for comparison
       const keyA = `${a.match['date-start-timestamp']}${a.match['tournament-url']}`.toLowerCase();
       const keyB = `${b.match['date-start-timestamp']}${b.match['tournament-url']}`.toLowerCase();

       // Compare concatenated values
       return keyA.localeCompare(keyB);

  });
  next();
});


module.exports = mongoose.model('HotMatches', HotMatchesSchema);