import { Card } from 'antd';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const IncomeExpenseChart = () => {

    //Datos de ejemplo para el gráfico
    const chartData = [
        { date: '2025-05-01', income: 4000, expense: 1000 },
        { date: '2025-05-02', income: 3000, expense: 2000 },
        { date: '2025-05-03', income: 2000, expense: 500 },
    ];

    return (
        <Card title='Ingresos vs Gastos'>
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