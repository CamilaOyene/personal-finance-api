import { Card, Col, Row, Typography } from 'antd';

const { Title } = Typography;

const SummaryCards = () => {
    //Datos de ejemplo. 
    const totalBalance = 7500;
    const totalIncome = 12000;
    const totalExpenses = 4500;

    return (
        <Row gutter={[16, 16]}>


            {/*Balance total */}
            <Col xs={24} sm={12} md={8}>
                <Card title='Balance total'>
                    <Title level={3}> Balance total - ${totalBalance}</Title>
                </Card>
            </Col>



            {/*Ingresos */}
            <Col xs={24} sm={12} md={8}>
                <Card title='Ingresos'>
                    <Title level={3} style={{ color: 'green' }}>Ingresos - ${totalIncome}</Title>
                </Card>
            </Col>



            {/*Gastos */}
            <Col xs={24} sm={12} md={8}>
                <Card title='Gastos'>
                    <Title level={3}>Gastos - ${totalExpenses}</Title>
                </Card>
            </Col>

        </Row>

    );
};

export default SummaryCards;