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

function App() {
  return (
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
          <Route path="/cadastrarTema" element={<CadastroTema />} />
          <Route path="/editarTema/:id" element={<CadastroTema />} />
          <Route path="/deletarTema/:id" element={<DeletarTema />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
