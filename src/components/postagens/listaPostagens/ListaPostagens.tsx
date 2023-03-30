import './ListaPostagens.css'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useLocalStorage from 'react-use-localstorage';
import Postagem from '../../../models/Postagem';
import { busca } from '../../../services/Service';
import { TokenState } from '../../../store/tokens/tokensReducer';

function ListaPostagens() {
  let navigate = useNavigate();

  const token = useSelector<TokenState, TokenState['token']>(
    (state) => state.token
  );

  const userId = useSelector<TokenState, TokenState['id']>(
    (state) => state.id
  );

  useEffect(() => {
    if (token === '') {
      toast.error('Você precisa estar logado pra ficar aqui',{
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
  });

  const [postagens, setPostagens] = useState<Postagem[]>([]);

  async function getPosts() {
    await busca('/postagens', setPostagens, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    getPosts();
  }, [postagens.length]);

  

  return (
    <Box display='flex' flexWrap={'wrap'}>
      {postagens.map((post) => (
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
            {post.usuario?.id === +userId ? (
              <CardActions>
              <Box display="flex" justifyContent="center" mb={1.5}>
                <Link
                  to={`/editarPostagem/${post.id}`}
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
                  to={`/deletarPostagem/${post.id}`}
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
            ) : (<><h2>você não pode deletar isso</h2></>)}
          </Card>
        </Box>
      ))}
    </Box>
  );
}

export default ListaPostagens;
