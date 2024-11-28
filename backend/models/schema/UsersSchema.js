const Schema = mongoose.Schema;


const UsersSchema = new Schema({
   name: { type: String, required: true },
   email: { type: String, required: true },
   password: { type: String, required: true },
},
{ timestamps: true }
);


module.exports = mongoose.model('Users', UsersSchema);