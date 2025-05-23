import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Accounts from './pages/Accounts';
import Categories from './pages/Categories';
import Transactions from './pages/Transactions';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/accounts' element={<Accounts />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/transactions' element={<Transactions />} />
        <Route path='*' element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  )
}


export default App;

// <BrowserRouter>
//   <Routes>
//     <Route path="/" element={<Login />} />
//     <Route path="/register" element={<Register />} />
//     <Route path="/home" element={<Home />} />
//     <Route path="/accounts" element={<Accounts />} />
//
