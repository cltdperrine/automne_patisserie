import databaseClient from "../../../services/database.js";

export default async function getUser(req, res) {
    const { id } = req.params;

    try {
        const result = await databaseClient`
    SELECT * FROM users WHERE id = ${id}`
        console.log(result)
        if (result.length === 0) {
            return res.status(404).send("User not found")
        }

        return res.json(result[0])



    } catch (error) {
        console.log(error)
        return res.status(500).send("Error during user retrieval")
    }
}