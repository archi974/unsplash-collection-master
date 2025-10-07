import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
  title: { type: String, required: true },
  photos: [{ type: String }], // URLs des images
  createdAt: { type: Date, default: Date.now },
});

// Pour éviter de recréer le modèle à chaque appel
export default mongoose.models.Album || mongoose.model("Album", albumSchema);