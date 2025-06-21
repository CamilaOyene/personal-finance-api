import { Table, Tag, Empty } from 'antd';

const TransactionsTable = ({ data, loading }) => {
    const columns = [
        {
            title: 'Tipo',
            dataIndex: 'type',
            key: 'type',
            render: (text) => (
                <Tag color={text === 'ingreso' ? 'green' : 'volcano'}>
                    {text.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: 'Categoría',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Monto',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount) => `${amount.toFixed(2)}`,
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