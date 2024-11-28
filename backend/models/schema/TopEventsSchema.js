const Schema = mongoose.Schema;


const TopEventsSchema = new Schema({
    date: {
        type: String,
        required: true,
    },
    events: [],
},
    { timestamps: true }
);


module.exports = mongoose.model('TopEvents', TopEventsSchema);