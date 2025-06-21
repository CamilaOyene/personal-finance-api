import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Button, Table, Modal, Alert } from 'antd';
import NewAccountForm from '../components/accounts/NewAccountForm';
import { getAllAccounts, createAccount } from '../features/accounts/accountsSlice';

const AccountsPage = () => {
    const dispatch = useDispatch();
    const { accounts, loading, error } = useSelector((state) => state.accounts);

    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        dispatch(getAllAccounts())
    }, [dispatch]);

    const handleAddAccount = (account) => {
        dispatch(createAccount(account))
            .unwrap()
            .then(() => setIsModalVisible(false))
    }

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Saldo',
            dataIndex: 'balance',
            key: 'balance',
            render: (balance) => `$${balance.toFixed(2)}`,
        },
    ];

    const dataSource = accounts.map(account => ({
        ...account,
        key: account._id || account.id,
    }))
    return (
        <div style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>

            <h1>Cuentas</h1>

            <Button type="primary" onClick={() => setIsModalVisible(true)} style={{ marginBottom: 16 }}>
                + Nueva Cuenta
            </Button>

            {error && <Alert message={error} type='errir' showIcon style={{ marginBottom: 16 }} />}

            <Table
                dataSource={dataSource}
                columns={columns}
                loading={loading}
                pagination={{ pageSize: 5 }}
                locale={{ emptyText: loading ? 'Cargando...' : 'No hay cuentas cargadas' }}
            />

            <Modal
                title='Nueva Cuenta'
                open={isModalVisible}
                footer={null}
                onCancel={() => setIsModalVisible(false)}
                destroyOnHidden>

                <NewAccountForm onSave={handleAddAccount} />
            </Modal>
        </div>
    )



}

export default AccountsPage;