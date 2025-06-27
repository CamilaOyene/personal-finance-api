import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getTransactionById, clearSelectedTransaction } from '../../features/transactions/transactionsSlice';
import { Card, Spin, Alert, Button, Typography, Row, Col } from 'antd';

const { Title, Text } = Typography;




const TransactionDetailPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { selectedTransaction, loading, error } = useSelector((state) => state.transactions);
    const { description, amount, type, category, account, date } = selectedTransaction

    useEffect(() => {
        dispatch(getTransactionById(id));
        return () => {
            dispatch(clearSelectedTransaction());
        }
    }, [dispatch, id])

    if (loading) return <Spin>Cargando...</Spin>;
    if (error) return <Alert message='Error' description={error} type='info' showIcon />;
    if (!selectedTransaction) return <Alert message='No se encontró la transacción ' type='info' showIcon />

    return (
        <Row justify='center' style={{ padding: 24 }}>
            <Col xs={24} sm={20} md={16} lg={12}>
                <Card
                    title={<Title level={4}>Detalles de la Transacción</Title>}
                    extra={<Button type='link'><Link to='/transactions' >Volver</Link></Button>}
                >
                    <Row gutter={[0, 16]}>

                        <Col span={24}>
                            <Text strong>Descripción: </Text>
                            <Text>{description}</Text>
                        </Col>

                        <Col span={24}>
                            <Text strong>Monto: </Text>
                            <Text>${amount}</Text>
                        </Col>

                        <Col span={24}>
                            <Text strong>Tipo: </Text>
                            <Text>{type === 'income' ? 'Ingreso' : 'Gasto'}</Text>
                        </Col>

                        <Col span={24}>
                            <Text strong>Categoría: </Text>
                            <Text>{category?.name || '-'}</Text>
                        </Col>

                        <Col span={24}>
                            <Text strong>Cuenta: </Text>
                            <Text>{account?.name || '-'}</Text>
                        </Col>

                        <Col span={24}>
                            <Text strong>Fecha:</Text>
                            <Text>{new Date(date).toLocaleDateString()}</Text>
                        </Col>
             
                    </Row>
                </Card>
            </Col>
        </Row>
    )
}



export default TransactionDetailPage;