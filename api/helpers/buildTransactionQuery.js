/**
 * Crea el objeto de búqueda para filtrar transacciones
 * @param {Object} filters - Filtros desde el query string
 * @param {String} userId - ID del usuario autenticado
 * @returns {Object} Query para usar en Mongoose
 */

const buildTransactionQuery = (filters, userId) => {

    const query = { user: userId };

    if (filters.type && filters.type !== 'all') {
        query.type = filters.type;
    }

    if (filters.category) {
        query.category = filters.category;
    }

    if (filters.startDate || filters.endDate) {
        query.date = {};
        
        if(filters.startDate && !isNaN(new Date(filters.startDate))){
            query.date.$gte = new Date(filters.startDate);
        }

        if(filters.endDate && !isNaN(new Date(filters.endDate))){
            query.date.$lte = new Date(filters.endDate);
        }
    }

    return query;

}

export default buildTransactionQuery;