import { Card, Table, Button, Empty, Spin } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const TransacionsTableDashboard = () => {
    const { latestTransactions, loading } = useSelector((state) => state.dashboard);
    const navigate = useNavigate();


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
            render: (type) => (
                <Tag color={type  === 'income' ? 'green' : 'red'}>
                    {type === 'income' ? 'Ingreso' : 'Gasto'}
                </Tag>
            ),
        },
        {
            title: 'Fecha',
            dataIndex: 'date',
            key: 'date',
            render: (date) => dayjs(date).format('DD/MM/YYYY'),
        },
    ];


    // Spinner mientras carga
    if (loading) {
        return (
            <Card title="Últimas transacciones">
                <Spin />
            </Card>
        );
    }

    // Mensaje si no hay datos
    if (!latestTransactions || latestTransactions.length === 0) {
        return (
            <Card title="Últimas transacciones">
                <Empty description="No hay transacciones recientes" />
            </Card>
        );
    }

    return (
        <Card title='Últimas transacciones' >
            <Table columns={columns} dataSource={latestTransactions} rowKey={'_id'} loading={loading} pagination={false} />
            <div style={{ marginTop: 16, textAlign: 'right' }}>
                <Button type='link' onClick={() => navigate('/transactions')}>
                    Ver más
                </Button>
            </div>
        </Card>
    );
};
export default TransacionsTableDashboard;