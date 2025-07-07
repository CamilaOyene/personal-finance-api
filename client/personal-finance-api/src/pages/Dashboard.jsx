import { Row, Col } from "antd";
import SummaryCards from '../components/dashboard/SummaryCards';
import TransacionsTableDashboard from '../components/dashboard/TransactionsTableDashboard';
import IncomeExpenseChart from '../components/dashboard/IncomeExpenseCharts';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getDashboardData } from "../features/dashboard/dashboardSlice";

const Dashboard = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDashboardData());
    }, [dispatch]);

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
                <TransacionsTableDashboard />
            </Col>
        </Row>
    );
};

export default Dashboard;