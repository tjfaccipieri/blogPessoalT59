import React from 'react';
import './App.css';
import Home from './paginas/home/Home';
import Navbar from './components/estaticos/navbar/Navbar';
import Footer from './components/estaticos/footer/Footer';
import Login from './paginas/login/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CadastroUsuario from './paginas/cadastroUsuario/CadastroUsuario';
import ListaTemas from './components/temas/listaTemas/ListaTemas';
import ListaPostagens from './components/postagens/listaPostagens/ListaPostagens';
import CadastroTema from './components/temas/cadastroTema/CadastroTema';
import DeletarTema from './components/temas/deletarTema/DeletarTema';
import CadastroPostagem from './components/postagens/cadastroPostagem/CadastroPostagem';
import DeletarPostagem from './components/postagens/deletarPostagem/DeletarPostagem';
import { Provider } from 'react-redux';
import store from './store/store';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <Router>
      <Navbar />
      <div style={{ minHeight: '85vh' }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cadastrar" element={<CadastroUsuario />} />
          <Route path="/temas" element={<ListaTemas />} />
          <Route path="/postagens" element={<ListaPostagens />} />
          <Route path="/cadastrarPostagem" element={<CadastroPostagem />} />
          <Route path="/editarPostagem/:id" element={<CadastroPostagem />} />
          <Route path="/deletarPostagem/:id" element={<DeletarPostagem />} />
          <Route path="/cadastrarTema" element={<CadastroTema />} />
          <Route path="/editarTema/:id" element={<CadastroTema />} />
          <Route path="/deletarTema/:id" element={<DeletarTema />} />
        </Routes>
      </div>
      <Footer />
    </Router>
    
    </Provider>
  );
}

export default App;
