import { Table, Tag, Empty} from 'antd';

const TransactionsTable = ({ data }) => {
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

    return (
        <Table
            columns={columns}
            dataSource={data?.map((item) => ({ ...item, key: item.id })) || []}
            pagination={{ pageSize: 5 }}
            locale={{
                emptyText: <Empty description="No hay transacciones registradas" />
            }}
        />
    );
};


export default TransactionsTable;