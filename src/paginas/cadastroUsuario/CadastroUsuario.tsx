import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import React, { ChangeEvent, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CadastroUsuario.css';
import Usuario from '../../models/Usuario';
import { cadastro } from '../../services/Service';
import './CadastroUsuario.css';
import { toast } from 'react-toastify';

function CadastroUsuario() {
  let navigate = useNavigate();

  const [user, setUser] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    foto: '',
    senha: '',
  });

  const [userResult, setUserResult] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    foto: '',
    senha: '',
  });

  const [confirmarSenha, setConfirmarSenha] = useState<String>('');

  function confirmarSenhaHandle(event: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(event.target.value);
  }

  function updateModel(event: ChangeEvent<HTMLInputElement>) {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  }

  async function onSumit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    if (user.foto === '') {
      setUser({
        ...user,
        foto: 'link da foto padrão',
      });
    }
    try {
      if (user.senha === confirmarSenha) {
        await cadastro('/usuarios/cadastrar', user, setUserResult);
        toast.success('Usuario cadastrado com sucesso', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      } else {
        toast.warning('As senhas não conferem', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      }
    } catch (error) {
      toast.error('Falha no cadastro, por favor, verifique os campos', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  }

  useEffect(() => {
    if (userResult.id !== 0) {
      navigate('/login');
    }
  }, [userResult]);

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const validMail = emailRegex.test(user.usuario);

  return (
    <Grid container alignItems="center">
      <Grid item xs={6} className="fundoCadastro"></Grid>
      <Grid item xs={6}>
        <Box paddingX={12}>
          <form onSubmit={onSumit}>
            <Typography variant="h3" align="center">
              Cadastre-se
            </Typography>
            <TextField
              value={user.nome}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                updateModel(event)
              }
              label="Nome"
              id="nome"
              name="nome"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              error={!validMail && user.usuario.length > 0}
              helperText={!validMail && 'Por favor, insira um e-mail válido'}
              value={user.usuario}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                updateModel(event)
              }
              label="usuario"
              id="usuario"
              name="usuario"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              value={user.foto}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                updateModel(event)
              }
              label="foto"
              id="foto"
              name="foto"
              variant="outlined"
              fullWidth
              margin="normal"
              error={user.foto.length < 15 && user.foto.length > 1}
              helperText={'A foto tem que ser maior que 15 caracteres'}
            />
            <TextField
              value={user.senha}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                updateModel(event)
              }
              type="password"
              label="senha"
              id="senha"
              name="senha"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              value={confirmarSenha}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                confirmarSenhaHandle(event)
              }
              type="password"
              label="confirmar senha"
              id="confirmarsenha"
              name="confirmarsenha"
              variant="outlined"
              fullWidth
              error={confirmarSenha.length <= 8 && confirmarSenha.length >= 1}
              helperText={
                confirmarSenha.length <= 8 && confirmarSenha.length >= 1
                  ? 'A senha precisa ter no mínimo 8 caracteres'
                  : ''
              }
              margin="normal"
            />
            <Grid container justifyContent="space-around">
              <Link to="/login">
                <Button variant="contained" color="secondary">
                  Cancelar
                </Button>
              </Link>
              <Button type="submit" variant="contained" color="primary">
                Cadastrar
              </Button>
            </Grid>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}

export default CadastroUsuario;
