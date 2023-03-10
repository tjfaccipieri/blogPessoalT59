import { Button, Grid, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Box } from '@mui/material';
import React, {ChangeEvent, useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useLocalStorage from 'react-use-localstorage';
import UsuarioLogin from '../../models/UsuarioLogin';
import { login } from '../../services/Service';
import { addToken } from '../../store/tokens/action';


function Login() {
  let navigate = useNavigate()
  const [token, setToken] = useState('')
  const dispatch = useDispatch()

  const [userLogin, setUserLogin] = useState<UsuarioLogin>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
    token: ''
  })

  function updateModel(e: ChangeEvent<HTMLInputElement>) {
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value
    })
  }

  
  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    try{
      await login(`/usuarios/logar`, userLogin, setToken)
      toast.success('🎉Usuário logado com sucesso', {
        
        theme: "colored",
        });
    } catch(error) {
      toast.warning('🎃Usuário e/ou senha inválidos',{
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        })
    }
  }

  useEffect(() => {
    if(token !== ''){
      dispatch(addToken(token))
      navigate('/home')
    }
  }, [token])

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid alignItems="center" xs={6}>
        <Box paddingX={20}>
          <form onSubmit={onSubmit}>
            <Typography variant="h3" gutterBottom color="textPrimary" component="h3" align="center" style={{ fontWeight: 'bold' }}>
              Entrar
            </Typography>
            <TextField
              value={userLogin.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
              id="usuario"
              label="usuário"
              variant="outlined"
              name="usuario"
              margin="normal"
              fullWidth />
            <TextField
              value={userLogin.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
              id="senha"
              label="senha"
              variant="outlined"
              name="senha"
              margin="normal"
              type="password"
              fullWidth />
            <Box marginTop={2} textAlign="center">
              
                <Button type="submit" variant="contained" color="primary">
                  Logar
                </Button>
              
            </Box>
          </form>
          <Box display="flex" justifyContent="center" marginTop={2}>
            <Box marginRight={1}>
              <Typography variant="subtitle1" gutterBottom align="center">
                Não tem uma conta?
              </Typography>
            </Box>
            <Link to='/cadastrar'>
              <Typography variant="subtitle1" gutterBottom align="center" style={{ fontWeight: 'bold' }}>
                Cadastre-se
              </Typography>
            </Link>
          </Box>
        </Box>
      </Grid>
      <Grid
        xs={6}
        style={{
          backgroundImage: `url(https://i.imgur.com/d5bMdDJ.jpg)`,
          backgroundRepeat: 'no-repeat',
          width: '100vh',
          minHeight: '100vh',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></Grid>
    </Grid>
  );
}

export default Login;
