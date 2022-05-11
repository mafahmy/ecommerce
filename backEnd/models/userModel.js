import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    isVerified: { type: Boolean, default:false },
    status: { type: String, default: "Active" },
    emailVerificationToken: { type: String },
    tickets: { 
      active: {type: Boolean, default: false},
      ticket: {type: String},
     }
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
export default User;
