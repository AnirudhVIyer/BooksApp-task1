const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    trim: true,
    lowecase: true,
  },
  Email: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("invalid email");
      }
    },
  },
  ReferredUser: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
  isPaymentMade: {
    type: Boolean,
    default: false,
  },
  totalEarnings: {
    type: Number,
    default: 0,
  },
});

// to prevent password and tokens from showing, runs automatic
// express will run json.stringify to all the user objects sent
UserSchema.methods.toJSON = function () {
  const user = this;
  const jsonObject = user.toObject();

  delete jsonObject.isPaymentMade;

  return jsonObject;
};

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
