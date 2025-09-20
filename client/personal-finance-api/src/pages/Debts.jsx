import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Spin, message, Row, Col } from 'antd';
import {
    getAllDebts,
    createDebt,
    updateDebt,
    deleteDebt,
    markDebtAsPaid
} from '../features/debts/debtsSlice.js';
import DebtsTable from '../components/';
import DebtForm from '../components/debts/DebtForm';


const DebtsPage = () => {
    const dispatch = useDispatch();
    const { debts, loading, error } = useSelector((state) => state.debts);

    const [iseModalOpen, setIsModalOpen] = useState(false);
    const [editingDebt, setEditingDebt] = useState(null);

    useEffect(() => {
        dispatch(getAllDebts());
        if (error) message.error(error);
    }, [error]);

    const handleCreate = (values) => {
        dispatch(createDebt(values)).unwrap()
            .then(() => {
                message.success('Deuda creada correctamente');
                setIsModalOpen(false);
            })
            .catch((err) => message.error(err));
    };

    const handleUpdate = (values) => {
        if (!editingDebt) return;
        dispatch(updateDebt({ debtId: editingDebt._id, updatedData: values }))
            .unwrap()
            .then(() => {
                message.success('Deuda actualizada correctamente');
                setIsModalOpen(false);
                setEditingDebt(null);
            })
            .catch((err) => message.error(err));
    };

    const handleDelete = (debtId) => {
        dispatch(deleteDebt(debtId)).unwrap()
            .then(() => message.succes('Deuda eliminada'))
            .catch((err) => message.error(err));
    };

    const handleMarkPaid = (debtId, accountId) => {
        dispatch(markDebtAsPaid({ debtId, accountId })).unwrap()
            .then(() => message.success('Deuda marcada como pagada'))
            .catch((err) => message.error(err));
    }


    return (
        <>
            <Row>
                {/* Columna principal conla tabla */}
                <Col xs={24} lg={16}>
                    <Card
                        title='Lista de deudas'
                        extra={
                            <Button type='primary' onClick={() => setIsModalOpeen(true)}>
                                + Nueva Deuda
                            </Button>
                        }
                    >
                        {loading ? (
                            <Spin />
                        ) : (
                            <DebtsTable
                                debts={debts}
                                onEdit={(debt) => {
                                    setEditingDebt(debt);
                                    setIsModalOpen(true);
                                }}
                                onDelete={handleDelete}
                                onMarkPaid={handleMarikPaid}
                            />
                        )}
                    </Card>
                </Col>
            </Row>
        </>
    )


}

export default DebtsPage;