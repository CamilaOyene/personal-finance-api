import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Button, Table, Modal, Alert } from 'antd';
import NewAccountForm from '../components/accounts/NewAccountForm';
import { getAllAccounts, createAccount, updateAccount } from '../features/accounts/accountsSlice';

const AccountsPage = () => {
    const dispatch = useDispatch();
    const { accounts, loading, error } = useSelector((state) => state.accounts);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingAccount, setEditingAccount] = useState(null);

    //Cargar cuentas al montar
    useEffect(() => {
        dispatch(getAllAccounts())
    }, [dispatch]);

    //Guardar o actualizar cuenta
    const handleSaveAccount = (account) => {
        if (editingAccount) {
            dispatch(updateAccount({ ...account, _id: editingAccount._id }))
                .unwrap()
                .then(() => {
                    setIsModalVisible(false);
                    setEditingAccount(null);
                })
                .catch((err) => console.error('Error al editar: ', err))
        } else {
            dispatch(createAccount(account))
                .unwrap()
                .then(() => setIsModalVisible(false))
                .catch((err) => console.error('Error al crear: ', err));
        }
    };

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
        {
            title: 'Acciones',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button onClick={() => handleEdit(record)}>Editar</Button>
                </Space>
            )
        }
    ];

    //Preparar edición 
    const handleEdit = (account) => {
        setEditingAccount(account);
        setIsModalVisible(true);
    };

    const handleAddAccount = (account) => {
        setEditingAccount(account);//Para crear cuenta se pone null 
        setIsModalVisible(true);
    };

    const dataSource = accounts.map(account => ({
        ...account,
        key: account._id || account.id,
    }))
    return (
        <div style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>

            <h1>Cuentas</h1>

            <Button type="primary" onClick={handleAddAccount}
                style={{ marginBottom: 16 }}>
                + Nueva Cuenta
            </Button>

            {error && <Alert message={error} type='error' showIcon style={{ marginBottom: 16 }} />}

            <Table
                dataSource={dataSource}
                columns={columns}
                loading={loading}
                pagination={{ pageSize: 5 }}
                locale={{ emptyText: loading ? 'Cargando...' : 'No hay cuentas cargadas' }}
            />

            <Modal
                title={editingAccount ? 'Editar Cuenta' : 'Nueva cuenta'}
                open={isModalVisible}
                footer={null}
                onCancel={() => {
                    setIsModalVisible(false);
                    setEditingAccount(null);
                }}
                destroyOnHidden>

                <NewAccountForm onSave={handleSaveAccount} initialValues={editingAccount} />//Pasamos valores si se está editando
            </Modal>
        </div >
    )



}

export default AccountsPage;