const connection = require("../database/connection");

module.exports = {
  async index(request, response) {
    const ong_id = request.headers.authorization;
    const ong = await connection("ongs")
        .select("id")
        .where("id", ong_id)
        .first();
    if (!ong) {
      return response
          .status(403)
          .send("You cannot access this resource");
    }

    const incidents = await connection("incidents")
        .join("ongs", "incidents.ong_id", "ongs.id")
        .where("incidents.ong_id", ong_id)
        .select("incidents.*", "ongs.name", "ongs.email", "ongs.whatsapp", "ongs.city", "ongs.uf");

    return response.json(incidents);
  }
}