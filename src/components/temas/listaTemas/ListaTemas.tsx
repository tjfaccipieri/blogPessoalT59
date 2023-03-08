import React, {useState, useEffect} from 'react'
import useLocalStorage from 'react-use-localstorage'
import Tema from '../../../models/Tema'
import { busca } from '../../../services/Service'
import './ListaTemas.css'
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material'



function ListaTemas() {
  const [temas, setTemas] = useState<Tema[]>([])
  const [token, setToken] = useLocalStorage('token')
  let navigate = useNavigate()

  useEffect(() => {
    if(token === '') {
      alert('Você precisa estar logado pra ficar aqui.')
      navigate('/login')
    }
  }, [token])

  async function getTemas() {
    await busca('/temas', setTemas, {
      headers: {
        Authorization: token
      }
    })
  }

  useEffect(()=>{
    getTemas()
  }, [temas.length])

  return (
    <>
      {temas.map(tema => (
        <Box m={2} >
        <Card variant="outlined">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Tema
            </Typography>
            <Typography variant="h5" component="h2">
             {tema.descricao}
            </Typography>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="center" mb={1.5} >

              <Link to={`/editarTema/${tema.id}`} className="text-decorator-none">
                <Box mx={1}>
                  <Button variant="contained" className="marginLeft" size='small' color="primary" >
                    atualizar
                  </Button>
                </Box>
              </Link>
              <Link to={`/deletarTema/${tema.id}`} className="text-decorator-none">
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

export default ListaTemas