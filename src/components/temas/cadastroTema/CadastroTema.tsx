import { Button, Container, TextField, Typography } from '@material-ui/core'
import React, { ChangeEvent, useEffect, useState } from 'react'
import useLocalStorage from 'react-use-localstorage'
import Tema from '../../../models/Tema'
import { buscaId, post, put } from '../../../services/Service'
import { useNavigate, useParams } from 'react-router-dom';

function CadastroTema() {
  let navigate = useNavigate()
  const {id} = useParams<{id: string}>()
  const [token, setToken] = useLocalStorage('token')
  const [tema, setTema] = useState<Tema>({
    id: 0,
    descricao: ''
  })

  useEffect(() => {
    if(token === '') {
      alert('Você precisa estar logado')
      navigate('/login')
    }
  }, [token])

  function updateModel(event: ChangeEvent<HTMLInputElement>) {
    setTema({
      ...tema,
      [event.target.name]: event.target.value
    })
  }

  async function findById(id: string) {
    await buscaId(`/temas/${id}`, setTema, {
      headers: {
        Authorization: token
      }
    })
  }

  useEffect(() => {
    if (id !== undefined) {
      findById(id)
    }
  }, [id])

  async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault()
    if(id !== undefined) {
      try{
        // sempre vai tentar essa parte
        await put('/temas', tema, setTema, {
          headers: {
            Authorization: token
          }
        })
        alert('Tema cadastrado com sucesso')
      } catch {
        // se der ruim, vem pra ca
        alert('Erro no cadastro, por favor confira o campo de descrição')
      }
    } else {
      try{
        // sempre vai tentar essa parte
        await post('/temas', tema, setTema, {
          headers: {
            Authorization: token
          }
        })
        alert('Tema cadastrado com sucesso')
      } catch {
        // se der ruim, vem pra ca
        alert('Erro no cadastro, por favor confira o campo de descrição')
      }
    }
    back()
  }

  function back(){
    navigate('/temas')
  }

  return (
    <>
      <Container maxWidth='sm'>
        <form onSubmit={onSubmit}>
        <Typography>Cadastre um tema</Typography>
        <TextField 
          value={tema.descricao}
          onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)}
          name='descricao'
          id='descricao'
          label='Descrição do tema'
          variant='outlined'
          fullWidth
        />

        <Button variant='contained' type='submit' color='primary' >Cadastrar</Button>
        </form>
      </Container>

    </>
  )
}

export default CadastroTema