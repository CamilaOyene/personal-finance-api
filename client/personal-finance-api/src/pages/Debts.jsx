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
import DebtsTable from '../components/debts/DebtsTable';
import DebtForm from '../components/debts/DebtForm';
import DebtSummary from '../components/debts/DebtSummary'


const DebtsPage = () => {
    const dispatch = useDispatch();
    const { debts, loading, error } = useSelector((state) => state.debts);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDebt, setEditingDebt] = useState(null);

    useEffect(() => {
        dispatch(getAllDebts());
    }, [dispatch]);

    useEffect(() => {
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
            .then(() => message.success('Deuda eliminada'))
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
                            <Button type='primary' onClick={() => setIsModalOpen(true)}>
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
                                onMarkPaid={handleMarkPaid}
                            />
                        )}
                    </Card>
                </Col>


                {/**Columna lateral */}
                <Col xs={24} lg={8}>
                    <DebtSummary debts={debts} />
                </Col>
            </Row >


            {/** Modal de crear/editar */}
            <DebtForm
                visible={isModalOpen}
                onCancel={() => {
                    setIsModalOpen(false);
                    setEditingDebt(null);
                }}
                onSubmit={editingDebt ? handleUpdate : handleCreate}
                initialValues={editingDebt || {}}
            />

        </>
    );


};

export default DebtsPage;