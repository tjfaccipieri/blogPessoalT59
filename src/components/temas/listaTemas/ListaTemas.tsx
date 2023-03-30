import React, { useState, useEffect } from 'react';
import useLocalStorage from 'react-use-localstorage';
import Tema from '../../../models/Tema';
import { busca } from '../../../services/Service';
import './ListaTemas.css';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';

function ListaTemas() {
  const [temas, setTemas] = useState<Tema[]>([]);
  const token = useSelector<TokenState, TokenState['token']>(
    (state) => state.token
  );
  let navigate = useNavigate();

  useEffect(() => {
    if (token === '') {
      toast.error('Você precisa estar logado pra ficar aqui.',{
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
      navigate('/login');
    }
  }, [token]);

  async function getTemas() {
    await busca('/temas', setTemas, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    getTemas();
  }, [temas.length]);

  return (
    <>
      {temas.map((tema) => (
        <Box m={2}>
          <Card variant="outlined">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Tema
              </Typography>
              <Typography variant="h5" component="h2">
                {tema.descricao}
              </Typography>

              {tema.postagem?.map((post) => (
                <Box m={2} width={'45vw'}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      Postagens
                    </Typography>
                    <Typography variant="h5" component="h2">
                      {post.titulo}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {post.texto}
                    </Typography>
                    <Typography variant="body2" component="p">
                      Postado em:{' '}
                      {new Intl.DateTimeFormat(undefined, {
                        dateStyle: 'full',
                        timeStyle: 'medium',
                      }).format(new Date(post.data))}
                    </Typography>
                    <Typography variant="body2" component="p">
                      Tema: {post.tema?.descricao}
                    </Typography>
                    <Typography variant="body2" component="p">
                      Postado por: {post.usuario?.nome}
                    </Typography>
                    <img src={post.usuario?.foto} className='fotoCard' />
                  </CardContent>
                  
                </Card>
              </Box>
              ))}
            </CardContent>
            <CardActions>
              <Box display="flex" justifyContent="center" mb={1.5}>
                <Link
                  to={`/editarTema/${tema.id}`}
                  className="text-decorator-none"
                >
                  <Box mx={1}>
                    <Button
                      variant="contained"
                      className="marginLeft"
                      size="small"
                      color="primary"
                    >
                      atualizar
                    </Button>
                  </Box>
                </Link>
                <Link
                  to={`/deletarTema/${tema.id}`}
                  className="text-decorator-none"
                >
                  <Box mx={1}>
                    <Button variant="contained" size="small" color="secondary">
                      deletar
                    </Button>
                  </Box>
                </Link>
              </Box>
            </CardActions>
          </Card>
        </Box>
      ))}
    </>
  );
}

export default ListaTemas;
