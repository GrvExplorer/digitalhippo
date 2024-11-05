import {Model, Schema, model, models} from "mongoose";
import type {AdapterSession} from "next-auth/adapters";


const sessionSchema = new Schema<AdapterSession>({
  expires: {
    type: Date,
    trim: true,
  },
  sessionToken: {
    type: String,
    trim: true,
  },
  userId: {
    type: String,
    ref: "User",
  },
}, {
  timestamps: true,
});


const registeredModel: Model<AdapterSession> = models?.Session;
export default registeredModel ||
  model<AdapterSession>("Session", sessionSchema);