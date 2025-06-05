import { useState } from 'react';
import { Button, Modal } from 'antd';
import Filters from '../components/Transactions/Filters';
import TransactionsTable from '../components/Transactions/TransactionsTable';
import NewTransactionForm from '../components/Transactions/NewTransactionForm';


const TransactionsPage = () => {
    const [filters, setFilters] = useState({
        type: 'all',
        category: '',
        dateRange: []
    });

    const [transactions, setTransactions] = useState([

        {
            id: 1,
            type: 'ingreso',
            category: 'Sueldo',
            amount: 1000,
            date: '2025-06-01'
        },
        {
            id: 2,
            type: 'gasto',
            category: 'Comida',
            amount: 200,
            date: '2025-06-03'
        }
    ]);

    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleAddTransaction = (tx) => {
        const newTx = { ...tx, id: Date.now() };
        setTransactions([...transactions, newTx]);
        setIsModalVisible(false);
    };

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
            <TransactionsTable date={filteredTransactions} />

        </div>
    );


};


export default TransactionsPage;