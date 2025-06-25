import { Table, Tag, Empty } from 'antd';

const TransactionsTable = ({ data, loading }) => {


    const columns = [
        {
            title: 'Tipo',
            dataIndex: 'type',
            key: 'type',
            render: (text) => (
                <Tag color={text === 'income' ? 'green' : 'volcano'}>
                    {text === 'income' ? 'INGRESO' : 'GASTO'}
                </Tag>
            ),
        },
        {
            title: 'Categoría',
            dataIndex: 'category',
            render: (_, record) => record.category?.name || 'Sin categoría'
        },
        {
            title: 'Cuenta',
            key: 'account',
            render: (_, record) => record.account?.name || 'Sin cuenta',
        },
        {
            title: 'Monto',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount) => `$${amount.toFixed(2)}`,
        },
        {
            title: 'Fecha',
            dataIndex: 'date',
            key: 'date',
            render: (date) => new Date(date).toLocaleDateString('es-AR')
        },
    ];

    const dataSource = data?.map((item) => ({
        ...item,
        key: item._id,
    })) || [];



    return (
        <Table
            columns={columns}
            dataSource={dataSource}
            pagination={{ pageSize: 5 }}
            loading={loading}
            locale={{
                emptyText: <Empty description="No hay transacciones registradas" />
            }}
        />
    );
};


export default TransactionsTable;