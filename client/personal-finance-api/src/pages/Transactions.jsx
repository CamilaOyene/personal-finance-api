import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, Space, Popconfirm, message } from 'antd';
import Filters from '../components/Transactions/Filters';
import TransactionsTable from '../components/Transactions/TransactionsTable';
import NewTransactionForm from '../components/Transactions/NewTransactionForm';
import { getAllTransactions, createTransaction, updateTransaction, deleteTransaction } from '../features/transactions/transactionsSlice';

const TransactionsPage = () => {

    const dispatch = useDispatch();
    //Datos desde el store
    const { transactions, loading, error } = useSelector((state) => state.transactions);
    //filtros, mantenemos estado local
    const [filters, setFilters] = useState({
        type: 'all',
        category: '',
        dateRange: []
    });
    //Modal para agregar
    const [isModalVisible, setIsModalVisible] = useState(false);
    //Estado para saber si estamos editando o creando
    const [editingTransaction, setEditingTransaction] = useState(null);



    //Traer las transacciones al montar
    useEffect(() => {
        dispatch(getAllTransactions());
    }, [dispatch])

    //Nueva transacción
    const handleAddTransaction = () => {
        setEditingTransaction(null);
        setIsModalVisible(true);
    }

    //editar transacción 
    const handleEdit = (transaction) => {
        setEditingTransaction(transaction);
        setIsModalVisible(true);
    };

    //Eliminar transacción
    const handleDelete = (id) => {
        dispatch(deleteTransaction(id))
            .unwrap()
            .then(() => message.success('Transacción eliminada'))
    }

    //crear o actualizar transaccion
    const handleSaveTransaction = async (txData) => {
        try {
            if (editingTransaction) {
                await dispatch(updateTransaction({ ...txData, _id: editingTransaction._id })).unwrap();
                message.success('Transacción actualizada');
            } else {
                await dispatch(createTransaction(txData)).unwrap();
                message.success('Transacción creada');
            }
            setIsModalVisible(false);
            setEditingTransaction(null);
        } catch (error) {
            message.error(`Error al guardar la transacción: ${error}`)
        }
    }


    //Filtrado(se hace sobre las transacciones del store)
    const filteredTransactions = transactions.filter((tx) => {
        const matchType = filters.type === 'all' || tx.type === filters.type;
        const matchCategory = !filters.category || tx.category?._id === filters.category;
        const matchDate =
            !filters.dateRange.length ||
            (
                new Date(tx.date) >= filters.dateRange[0]?._d &&
                new Date(tx.date) <= filters.dateRange[1]?._d
            );
        return matchType && matchCategory && matchDate;
    })

    return (

        <div style={{ maxWidth: 1000, margin: '0 auto', padding: 24 }}>
            <h1 style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
                Transacciones
            </h1>

            {/*Filtros */}
            <Filters filters={filters} setFilters={setFilters} />

            {/*Botón para nueva transacción */}
            <div style={{ textAlign: 'right', marginBottom: 16 }}>
                <Button type='primary' onClick={handleAddTransaction}>
                    + Nueva transacción
                </Button>
            </div>

            {/*Modal con formulario */}
            <Modal
                title={editingTransaction ? 'Editar Transacción' : 'Nueva Transacción'}
                open={isModalVisible}
                footer={null}
                onCancel={() => setIsModalVisible(false)}
            >
                <NewTransactionForm onSave={handleSaveTransaction} initialValues={editingTransaction} />
            </Modal>

            <TransactionsTable
                data={filteredTransactions}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete} />
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );


};


export default TransactionsPage;