const Schema = mongoose.Schema;


const SurebetsSchema = new Schema({
  sureBets : []
},
{ timestamps: true }
);


module.exports = mongoose.model('Surebets', SurebetsSchema);