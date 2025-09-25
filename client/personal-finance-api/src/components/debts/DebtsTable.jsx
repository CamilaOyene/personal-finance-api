import { Table, Button, Popconfirm } from 'antd';

const DebtsTable = ({ debts, onEdit, onDelete, onMarkPaid }) => {
    const columns = [
        {
            title: 'Descripción',
            dataIndex: 'description',
            key: 'decription',
        },
        {
            title: 'Monto',
            dataIndex: 'amount',
            key: 'amount',
            render: (value) => `$${value.toFixed(2)}`,
        },
        {
            title: 'Estado',
            dataIndex: 'status',
            key: 'status',
            render: (status) =>
                status === 'paid' ? '✅ Pagada' : '⏳ Pendiente',
        },
        {
            title: 'Acciones',
            key: 'actions',
            render: (_, record) => (
                <>
                    <Button
                        type='link'
                        onClick={() => onEdit(record)}
                    >
                        Editar
                    </Button>
                    <Popconfirm
                        title='¿Seguro que deseas eliminar esta deuda?'
                        onConfirm={() => onDelete(record._id)}
                    >
                        <Button type='link' danger>
                            Eliminar
                        </Button>
                    </Popconfirm>
                    {record.status !== 'paid' && (
                        <Button
                            type='link'
                            onClick={() => onMarkPaid(record._id, record.account)}
                        >
                            Marcar pagada
                        </Button>
                    )}
                </>
            )
        }
    ]


    return (
        <Table
            rowKey='_id'
            dataSource={debts}
            columns={columns}
            pagination={{ pageSize: 5 }}
        />
    );

};

export default DebtsTable;

