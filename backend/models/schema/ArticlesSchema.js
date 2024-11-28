const Schema = mongoose.Schema;


const ArticlesSchema = new Schema({
   title: { type: String, required: true },
   sortDesccription: { type: String, required: true },
   image: String,
   fullDescriptions: { type: String, required: true },
   status: {
      type: String,
      enum: ['Active', 'Deactive'],
      default: 'Active'
   },
},
   { timestamps: true }
);


module.exports = mongoose.model('Articles', ArticlesSchema);