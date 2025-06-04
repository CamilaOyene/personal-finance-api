import { Divider, Typography } from "antd";
import SummaryCards from '../components/dashboard/SummaryCards';
import TransacionsTable from '../components/dashboard/TransactionsTable';
import IncomeExpenseCharts from '../components/dashboard/IncomeExpenseCharts';

const { Title } = Typography;

const Dashboard = () => {

    return (
        <div style={{ padding: '24px' }}>
            {/*Título de la vista */}
            <Title level={2}>Resumen del panel</Title>

            <Divider />

            {/*Tarjetas de resumen: balance , ingresos y gastos */}
            <SummaryCards />

            <Divider />

            {/*Gráfico de ingresos vs gastos */}
            <IncomeExpenseCharts />

            <Divider />


            {/*Gráfico de ingresos vs gastos */}
            <TransacionsTable />

        </div>
    );
};

export default Dashboard;