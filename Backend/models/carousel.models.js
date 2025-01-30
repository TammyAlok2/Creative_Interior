import mongoose from "mongoose";

const carouselSchema = new mongoose.Schema({
  images: [
    {
      public_id: {
        type: String,
      },
      secure_url: {
        type: String,
      },
     
    },
  ],

});



const Carousel = mongoose.model("Carousel", carouselSchema);

export default Carousel;
