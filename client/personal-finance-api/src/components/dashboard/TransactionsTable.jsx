import { Card, Table } from 'antd';

const TransacionsTable = () => {

    //Transacciones de ejemplo
    const transactios = [
        {
            key: '1',
            descriptions: 'Sueldo',
            amount: 4000,
            type: 'income',
            date: '2025-05-01',
        },
        {
            key: '2',
            description: 'Supermercado',
            amount: 1200,
            type: 'expense',
            date: '2025-05-03',
        },
    ]

    //Columnas de la tabla 
    const columns = [
        {
            title: 'Descripción',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Monto',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount, record) => (
                <span style={{ color: record.type === 'income' ? 'green' : 'red' }}>
                    ${amount}
                </span>
            ),
        },
        {
            title: 'Tipo',
            dataIndex: 'type',
            key: 'type',
            render: type => (type === 'income' ? 'Ingreso' : 'Gasto'),
        },
        {
            title: 'Fecha',
            dataIndex: 'date',
            key: 'date',
        },
    ];

    return (
        <Card title='Últimas transacciones' >
            <Table columns={columns} dataSource={transactios} pagination={false} />
        </Card>
    );
};
export default TransacionsTable;