import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema({
  name: [{ type: String, required: true }],
  email: [{ type: String, required: true }],
});

const Enquiry = mongoose.model("EnquirySchema", enquirySchema);
export default Enquiry