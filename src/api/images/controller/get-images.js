import databaseClient from "../../../services/database.js";

export default async function getImages(req, res) {
  try {
    const images = await databaseClient`
      SELECT * FROM images`;

    return res.status(200).json(images);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error during images retrieval", error: error.message });
  }
}
