import mongoose from "mongoose";

const certificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    issuedBy: {
      type: String,
      required: true,
    },
    issuedDate: {
      type: String,
      required: true,
    },
    credentialId: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Certification = mongoose.model("Certification", certificationSchema);
export default Certification;
