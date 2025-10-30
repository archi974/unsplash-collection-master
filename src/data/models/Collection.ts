import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPhoto {
  src: string;
  alt: string;
  unsplashId: string;
  height: number;
  width: number;
}

export interface ICollection extends Document {
  title: string;
  photos: IPhoto[];
  createdAt: Date;
}

const photoSchema = new Schema<IPhoto>({
    src: { type: String, required: true },
    alt: { type: String, required: true },
    unsplashId: { type: String, required: true },
    height: { type: Number, required: true },
    width: { type: Number, required: true },
});

const collectionSchema = new Schema<ICollection>({
  title: { type: String, required: true },
  photos: [photoSchema],
  createdAt: { type: Date, default: Date.now },
});

const Collection: Model<ICollection> = 
  mongoose.models.Collection ||
  mongoose.model<ICollection>("Collection", collectionSchema);

export default Collection;