import { Box, Button, Card, CardActions, CardContent, Link, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useSelector } from 'react-redux';
import Postagem from '../../models/Postagem';
import { busca } from '../../services/Service';
import { TokenState } from '../../store/tokens/tokensReducer';


// variavel que ira receber as informações para cada uma das repetições do carousel.
// aqui dentro pode ser usado qualquer tag HTML, incluindo conteudo do MUI, sempre separando por virgulas, pois é um array comum


// caso necessário controlar quantos itens aparecem por vez no carousel, pode ser feito de modo responsivo
// os dados de quantos itens carregam em cada tamanho de tela, ficam aqui
const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 3 },
};

function Carousel() {
  const [posts, setPosts] = useState<Postagem[]>([])

  const token = useSelector<TokenState, TokenState['token']>(
    (state) => state.token
  );

  async function getPosts(){
    await busca('/postagens', setPosts, {
      headers: {
        Authorization: token
      }
    })
  }

  useEffect(() => {
    getPosts()
  }, [])

  const items = posts.map(post => (
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
  ))

  return (
    // o retorno é apenas a tag do AliceCarousel, com suas opções, que estão todas disponiveis no link da documentação do npmjs
    <AliceCarousel mouseTracking infinite autoPlay items={items} animationType="fadeout" 
    animationDuration={800} disableDotsControls={true} />
  )
}

export default Carousel