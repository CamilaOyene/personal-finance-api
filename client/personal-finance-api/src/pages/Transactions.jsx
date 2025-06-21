import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal } from 'antd';
import Filters from '../components/Transactions/Filters';
import TransactionsTable from '../components/Transactions/TransactionsTable';
import NewTransactionForm from '../components/Transactions/NewTransactionForm';
import { getAllTransactions, createTransaction } from '../features/transactions/transactionsSlice';

const TransactionsPage = () => {

    const dispatch = useDispatch();
    //Datos desde el store
    const { transactions, loading } = useSelector((state) => state.transactions);
    //filtros, mantenemos estado local
    const [filters, setFilters] = useState({
        type: 'all',
        category: '',
        dateRange: []
    });
    //Modal para agregar
    const [isModalVisible, setIsModalVisible] = useState(false);


    //Traer las transacciones al montar
    useEffect(() => {
        dispatch(getAllTransactions());
    }, [dispatch])

    //Agregar nueva transacción
    const handleAddTransaction = async (txData) => {
        try {
            await dispatch(createTransaction(txData)).unwrap();
            setIsModalVisible(false);
        } catch (error) {
            console.error('Error al crear transacción', error);
        }
    }
    //Filtrado(se hace sobre las transacciones del store)
    const filteredTransactions = transactions.filter((tx) => {
        const matchType = filters.type === 'all' || tx.type === filters.type;
        const matchCategory = !filters.category || tx.category === filters.category;
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
                <Button type='primary' onClick={() => setIsModalVisible(true)}>
                    + Nueva transacción
                </Button>
            </div>

            {/*Modal con formulario */}
            <Modal
                title='Nueva Transacción'
                open={isModalVisible}
                footer={null}
                onCancel={() => setIsModalVisible(false)}
            >
                <NewTransactionForm onSave={handleAddTransaction} />
            </Modal>
            <TransactionsTable data={filteredTransactions} loading={loading} />

        </div>
    );


};


export default TransactionsPage;