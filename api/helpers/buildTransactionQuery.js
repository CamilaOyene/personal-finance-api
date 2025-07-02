/**
 * Crea el objeto de búqueda para filtrar transacciones
 * @param {Object} filters - Filtros desde el query string
 * @param {String} userId - ID del usuario autenticado
 * @returns {Object} Query para usar en Mongoose
 */

const buildTransactionQuery = (filters, userId) => {
    const { type, category, startDate, endDate } = filters;

    const query = { user: userId };

    if (type) {
        query.type = type;
    }

    if (category) {
        query.category = category;
    }

    if (startDate || endDate) {
        query.date = {};
        if (startDate) query.date.$gte = new Date(startDate);
        if (endDate) query.date.$lte = new Date(endDate);
    }

    return query;

}

export default buildTransactionQuery;