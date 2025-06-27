import { Table, Tag, Empty, Popconfirm, Button } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const TransactionsTable = ({ data, loading, onEdit, onDelete }) => {
    const navigate = useNavigate();

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
        {
            title: 'Acciones',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button icon={<EyeOutlined />} onClick={() => navigate(`/transactions/$record._id`)}>Ver</Button>
                    <Button icon={<EditOutlined />} onClick={() => onEdit(record)}>Editar</Button>
                    <Popconfirm
                        title='¿Seguro que querés eliminar esta transacción?'
                        onText='Sí'
                        cancelText='No'
                        onConfirm={() => onDelete(record._id)}
                    >
                        <Button danger icon={<DeleteOutlined />}>
                            Eliminar
                        </Button>
                    </Popconfirm>
                </Space>
            )
        }
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