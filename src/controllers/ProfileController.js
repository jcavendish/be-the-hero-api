const connection = require("../database/connection");

module.exports = {
  async index(request, response) {
    const ong_id = request.headers.authorization;
    const incidents = await connection("incidents")
        .join("ongs", "incidents.ong_id", "ongs.id")
        .where("incidents.ong_id", ong_id)
        .select("incidents.*", "ongs.name", "ongs.email", "ongs.whatsapp", "ongs.city", "ongs.uf");

    return response.json(incidents);
  }
}