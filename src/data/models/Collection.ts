import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPhoto {
  src: string;
  alt: string;
}

export interface ICollection extends Document {
  title: string;
  photos: IPhoto[];
  createdAt: Date;
}

const photoSchema = new Schema<IPhoto>(
  {
    src: { type: String, required: true },
    alt: { type: String, required: true },
  },
  { _id: false }
)

const collectionSchema = new Schema<ICollection>({
  title: { type: String, required: true },
  photos: [photoSchema],
  createdAt: { type: Date, default: Date.now },
});

const Collection: Model<ICollection> = 
  mongoose.models.Collection ||
  mongoose.model<ICollection>("Collection", collectionSchema);

export default Collection;