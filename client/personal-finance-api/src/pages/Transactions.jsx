import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, message } from 'antd';
import Filters from '../components/Transactions/Filters';
import TransactionsTable from '../components/Transactions/TransactionsTable';
import NewTransactionForm from '../components/Transactions/NewTransactionForm';
import { getAllTransactions, createTransaction, updateTransaction, deleteTransaction } from '../features/transactions/transactionsSlice';

const TransactionsPage = () => {
    const dispatch = useDispatch();
    const { transactions, loading, error, currentPage, total } = useSelector((state) => state.transactions);

    //Estado para filtros 
    const [filters, setFilters] = useState({
        type: 'all',
        category: '',
        dateRange: []
    });

    //Estado para paginación
    const [pagination, setPagination] = useState({ page: 1, limit: 10 });

    //Estado local para el modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);

    const parseFilters = (filters) => {
        const parsed = {
            ...filters,
            startDate: filters.dateRange?.[0]?.toISOString(),
            endDate: filters.dateRange?.[1]?.toISOString()
        };
        delete parsed.dateRange;
        return parsed;
    };


    //Traer transacciones cuando cambian filtros o paginación 
    useEffect(() => {
        const parsedFilters = parseFilters(filters);
        dispatch(getAllTransactions({
            filters: parsedFilters,
            page: pagination.page,
            limit: pagination.limit
        }))
    }, [dispatch, filters, pagination]);


    //Nueva transacción
    const handleAddTransaction = () => {
        setEditingTransaction(null);
        setIsModalVisible(true);
    };

    //Editar transacción
    const handleEdit = (transaction) => {
        setEditingTransaction(transaction);
        setIsModalVisible(true);
    };

    //Eliminar transacción
    const handleDelete = (id) => {
        dispatch(deleteTransaction(id))
            .unwrap()
            .then(() => {
                message.success('Transacción eliminada');
                const parsedFilters = parseFilters(filters);
                dispatch(getAllTransactions({
                    filters: parsedFilters,
                    page: pagination.page,
                    limit: pagination.limit
                }));
            });
    };

    //Crear o actualizar transacción 
    const handleSaveTransaction = async (transactionData) => {
        try {
            if (editingTransaction) {
                await dispatch(updateTransaction({ id: editingTransaction._id, data: transactionData })).unwrap();
                message.success('Transacción actualizada');
            } else {
                await dispatch(createTransaction(transactionData)).unwrap();
                message.success('Transacción creada');
            }
            setIsModalVisible(false);
            setEditingTransaction(null);

            const parsedFilters = parseFilters(filters);
            dispatch(getAllTransactions({
                filters: parsedFilters,
                page: pagination.page,
                limit: pagination.limit
            }));
        } catch (error) {
            message.error(`Error al guardar la transacción: ${error}`);
        }
    };

    //Cuando cambian los filtros volver a la página 1 
    const handleFiltersChange = (newFilters) => {
        setFilters(newFilters);
        setPagination((prev) => ({ ...prev, page: 1 }));
    };

    return (
        <>
            <Row justify='center'>
                <Col xs={24} sm={24} md={20} lg={16}>


                    <h1 style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
                        Transacciones
                    </h1>


                    {/* Filtros */}
                    <Filters filters={filters} setFilters={handleFiltersChange} />



                    {/**Botón para nueva transacción */}
                    <div style={{ textAlign: 'right', marginBottom: 16 }}>
                        <Button type='primary' onClick={handleAddTransaction}>
                            +Nueva Transacción
                        </Button>
                    </div>



                    {/**Modal con formulario */}
                    <Modal
                        title={editingTransaction ? 'Editar transacción' : 'Nueva Transacción'}
                        open={isModalVisible}
                        footer={null}
                        onCancel={() => {
                            setIsModalVisible(false);
                            setEditingTransaction(null);
                        }}
                    >
                        <NewTransactionForm onSave={handleSaveTransaction} initialValues={editingTransaction} />
                    </Modal>


                    {/**Tabla */}
                    <TransactionsTable
                        data={transactions}
                        loading={loading}
                        pagination={{
                            current: currentPage,
                            total,
                            pageSize: pagination.limit,
                            onChange: (page) => setPagination((prev) => ({ ...prev, page }))
                        }}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />

                    {/**Error */}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </Col>
            </Row>
        </>
    )



}

export default TransactionsPage