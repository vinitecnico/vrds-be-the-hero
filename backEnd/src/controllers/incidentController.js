const crypto = require('crypto');
const connection = require('../database/conection');

module.exports = {
    async index(request, response) {
        const { page = 1, pear_page = 5 } = request.query;

        const [count] = await connection('incidents').count()

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(pear_page)
            .offset((page - 1) * pear_page)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

        response.header('x-total-count', count['count(*)']);

        return response.json(incidents)
    },

    async create(request, response) {
        const { title, description, value } = request.body;

        const { ong_id } = request.headers;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        })

        return response.json({ id })
    },

    async delete(request, response) {
        const { id } = request.params;
        const { ong_id } = request.headers;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first()

        if (incident.ong_id != ong_id) {
            return response.status(401);
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
};