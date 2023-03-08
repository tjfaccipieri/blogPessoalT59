import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import Postagem from '../../../models/Postagem';
import { busca } from '../../../services/Service';

function ListaPostagens() {

  let navigate = useNavigate()

  const [token, setToken] = useLocalStorage('token')

  useEffect(() => {
    if(token === ''){ 
      alert('Você precisa estar logado pra ficar aqui')
      navigate('/login')
    }
  })

  const [postagens, setPostagens] = useState<Postagem[]>([])

  async function getPosts() {
    await busca('/postagens', setPostagens, {
      headers: {
        Authorization: token
      }
    })
  }

  useEffect(() => {
    getPosts()
  }, [postagens.length])

  return (
    <>
      {postagens.map(post => (
        <Box m={2} >
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
              Postado em: {new Intl.DateTimeFormat(undefined,{dateStyle: 'full', timeStyle:'medium'}).format(new Date(post.data))}
            </Typography>
            <Typography variant="body2" component="p">
              Tema: {post.tema?.descricao}
            </Typography>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="center" mb={1.5}>

              <Link to={`/formularioPostagem/${post.id}`} className="text-decorator-none" >
                <Box mx={1}>
                  <Button variant="contained" className="marginLeft" size='small' color="primary" >
                    atualizar
                  </Button>
                </Box>
              </Link>
              <Link to={`/deletarPostagem/${post.id}`} className="text-decorator-none">
                <Box mx={1}>
                  <Button variant="contained" size='small' color="secondary">
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
  )
}

export default ListaPostagens