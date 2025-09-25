import { Card } from 'antd';

const DebtSummary = ({ debts }) => {
    const totalDebts = debts.length;
    const pendingDebts = debts.filter((d) => d.status !== 'paid').length;
    const paidDebts = debts.filter((d) => d.status === 'paid').length;
    const totalAmount = debts.reduce((acc, d) => acc + (Number(d.amount) || 0), 0);
    const pendingAmount = debts
        .filter((d) => d.status !== 'paid')
        .reduce((acc, d) => acc + (Number(d.amount) || 0), 0);

    return (
        <Card title="Resumen de deudas">
            <p>Total de deudas: {totalDebts}</p>
            <p>Pendientes: {pendingDebts}</p>
            <p>Pagadas: {paidDebts}</p>
            <p>Monto total: ${totalAmount.toFixed(2)}</p>
            <p>Monto pendiente: ${pendingAmount.toFixed(2)}</p>
        </Card>
    );
};

export default DebtSummary;
