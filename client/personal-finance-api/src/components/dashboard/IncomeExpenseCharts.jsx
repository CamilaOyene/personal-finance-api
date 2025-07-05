import { Card } from 'antd';
import { useSelector } from 'react-redux';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import dayjs from 'dayjs';

const IncomeExpenseChart = () => {
    const { chartTransactions, loading } = useSelector((state) => state.dashboard);

    const groupedData = {};

    chartTransactions.forEach((transaction) => {
        const date = dayjs(transaction.date).format('YYYY-MM-DD');
        if (!groupedData[date]) {
            groupedData[date] = { date, income: 0, expense: 0 };
        }

        if (transaction.type === 'income') {
            groupedData[date].income += transaction.amount;
        } else if (transaction.type === 'expense') {
            groupedData[date].expense += transaction.amount;
        }
    });

    const chartData = Object.values(groupedData).sort((a, b) => new Date(a.date) - new Date(b.date));



    return (
        <Card title='Ingresos vs Gastos' loading={loading}>
            <ResponsiveContainer width='100%' height={300}>
                <AreaChart data={chartData}>
                    <XAxis dataKey='date' />
                    <YAxis />
                    <Tooltip />
                    {/* Area de  ingresos */}
                    <Area type='monotone' dataKey='income' stroke='#82ca9d' fill='#e6ffed' />
                    {/* Area de  gastos */}
                    <Area type='monotone' dataKey='expense' stroke='#f87171' fill='#ffe4e6' />
                </AreaChart>
            </ResponsiveContainer>
        </Card>
    );



};


export default IncomeExpenseChart;