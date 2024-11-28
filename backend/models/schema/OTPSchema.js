const Schema = mongoose.Schema;

OTP = new Schema({
  otp: String,
  user: { type: Schema.Types.ObjectId, ref: "Users", default: null },
  status: { type: Number, default: 0 }, // 0 = not-use | 1 = used
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("OTP", OTP);
