const connection = require("../database/connection");

module.exports = {
  async create(request, response) {
    const { id } = request.body;

    const ong = await connection("ongs")
        .select("name")
        .where("id", id)
        .first();

    if(!ong) {
      return response.status(400).send("Unkwon ONG");
    }
    return response.json(ong);
  }
}