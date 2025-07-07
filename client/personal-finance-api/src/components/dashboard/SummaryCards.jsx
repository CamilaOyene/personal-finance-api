import { Card, Col, Row, Typography } from 'antd';
import { useSelector } from 'react-redux';

const { Title } = Typography;

const SummaryCards = () => {
    const { balance, totalIncome, totalExpense, loading } = useSelector((state) => state.dashboard);

    return (
        <Row gutter={[16, 16]}>


            {/*Balance total */}
            <Col xs={24} sm={12} md={8}>
                <Card title='Balance total' loading={loading}>
                    <Title level={3}>Balance total - ${balance} </Title>
                </Card>
            </Col>



            {/*Ingresos */}
            <Col xs={24} sm={12} md={8}>
                <Card title='Ingresos' loading={loading}>
                    <Title level={3} style={{ color: 'green' }}>${totalIncome}</Title>
                </Card>
            </Col>



            {/*Gastos */}
            <Col xs={24} sm={12} md={8}>
                <Card title='Gastos'  loading={loading}>
                    <Title level={3}>Gastos - ${totalExpense}</Title>
                </Card>
            </Col>

        </Row>

    );
};

export default SummaryCards;