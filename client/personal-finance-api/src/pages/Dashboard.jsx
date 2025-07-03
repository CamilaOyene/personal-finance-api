import { Row, Col, Divider, Typography } from "antd";
import SummaryCards from '../components/dashboard/SummaryCards';
import TransacionsTable from '../components/dashboard/TransactionsTable';
import IncomeExpenseChart from '../components/dashboard/IncomeExpenseCharts';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import getDashboardData from "../features/dashboard/dashboardSlice";

const { Title } = Typography;

const Dashboard = () => {

    return (
        <Row gutter={[16, 16]}>
            {/* Summary Cards ocupa el ancho completo */}
            <Col span={24}>
                <SummaryCards />
            </Col>

            {/* Gráfico ocupa el ancho completo */}
            <Col xs={24} md={12}>
                <IncomeExpenseChart />
            </Col>

            {/* Tabla ocupa el ancho completo */}
            <Col span={24}>
                <TransacionsTable />
            </Col>
        </Row>
    );
};

export default Dashboard;