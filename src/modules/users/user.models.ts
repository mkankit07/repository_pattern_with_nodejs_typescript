import mongoose, { Schema } from "mongoose";

export const userSchema = new Schema(
  {
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    user_email: {
      type: String,
    },
    is_email_verified: {
      type: Boolean,
      default:false,
    },
    user_name: {
      type: String,
    },
    user_password: {
      type: String,
    },
    role_id: {
      type: String,
    },
    profile_picture: {
      type: String,
    },
    phone_number: {
      type: String,
    },
    stutus: {
      type: Number,
      default: 1,
      enum: [1, 2, 3],
    },
  },
  {
    timestamps: true,
  }
);
export const userModels = mongoose.model("users", userSchema);
