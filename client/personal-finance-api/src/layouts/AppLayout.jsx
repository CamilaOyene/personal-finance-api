import { Layout, Menu } from 'antd';
import { PieChartOutlined, UserOutlined, DollarOutlined, LogoutOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const AppLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    //Hook para navegar programáticamente 
    const navigate = useNavigate();
    //Hook para obtener la ruta actual
    const location = useLocation();
    //Verificamos si el usuario está autenticado
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    //Si el usuario NO está autenticado, lo redirigimos a la página de login
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login')
        }
    }, [isAuthenticated, navigate])//incluir navigate si lo uso dentro del efecto

    //Función para cerrar sesión: borra info de usuario y redirige a login
    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('user');
        navigate('/login');
    };

    //Menú Sider
    const menuItems = [
        {
            key: '1',
            icon: <PieChartOutlined />,
            label: <Link to='dashboard'>Dashboard</Link>,
        },
        {
            key: '2',
            icon: <DollarOutlined />,
            label: <Link to='transactions'>Transacciones</Link>,
        },
        {
            key: '3',
            icon: <UserOutlined />,
            label: <Link to='accounts'>Cuentas</Link>,
        },
        {
            key: '4',
            icon: <LogoutOutlined />,
            label: <span onClick={handleLogout}>Cerrar sesión</span>
        },
    ];
    return (
        <Layout style={{ minHeight: '100vh' }}>

            <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>

                <div style={{ color: '#fff', padding: 16, textAlign: 'center' }}>
                    {collapsed ? '💰' : 'Mis Finanzas 💰'}
                </div>

                <Menu theme='dark' mode='inline' selectedKeys={[location.pathname]} items={menuItems} />

            </Sider>

            <Layout>
                <Header style={{ backgroud: '#fff', padding: 0 }} />

                <Content style={{ margin: '16px' }}>
                    <Outlet />
                </Content>

            </Layout>
        </Layout>


    )
}

export default AppLayout;