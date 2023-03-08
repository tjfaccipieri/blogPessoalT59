import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useLocalStorage from 'react-use-localstorage'
import Tema from '../../../models/Tema'
import { buscaId, deleteId } from '../../../services/Service';

function DeletarTema() {

  let navigate = useNavigate()
  const {id} = useParams<{id: string}>()
  const [token, setToken] = useLocalStorage('token')
  const [tema, setTema] = useState<Tema>()

  useEffect(() => {
    if(token === '') {
      navigate('/login')
    }
  }, [token])

  async function findById(id: string) {
    await buscaId(`/temas/${id}`, setTema, {
      headers: {
        Authorization: token
      }
    })
  }

  useEffect(() => {
    if(id !== undefined) {
      findById(id)
    }
  }, [id])

  function sim() {
    navigate('/temas')
    deleteId(`/temas/${id}`, {
      headers: {
        Authorization: token
      }
    })
    alert('Tema apagado com sucesso')
  }

  function nao() {
    navigate('/temas')
  }

  return (
    <>
      <Box m={2}>
        <Card variant="outlined">
          <CardContent>
            <Box justifyContent="center">
              <Typography color="textSecondary" gutterBottom>
                Deseja deletar o Tema:
              </Typography>
              <Typography color="textSecondary">
                {tema?.descricao}
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="start" ml={1.0} mb={2} >
              <Box mx={2}>
                <Button onClick={sim} variant="contained" size='large' color="primary">
                  Sim
                </Button>
              </Box>
              <Box mx={2}>
                <Button  onClick={nao} variant="contained" size='large' color="secondary">
                  Não
                </Button>
              </Box>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </>
  )
}

export default DeletarTema