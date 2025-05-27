import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AppLayout from './layouts/AppLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Accounts from './pages/Accounts';
import Categories from './pages/Categories';
import Transactions from './pages/Transactions';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page pública principal */}
        <Route index element={<LandingPage />} />


        {/* Autenticación*/}
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        {/*Rutas protegidas con layout */}
        <Route path='/' element={<AppLayout />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='accounts' element={<Accounts />} />
          <Route path='categories' element={<Categories />} />
          <Route path='transactions' element={<Transactions />} />
        </Route>

        {/*Página no encontrada */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}


export default App;
