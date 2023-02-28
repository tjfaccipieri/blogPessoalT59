import { Button, Container, Grid } from '@material-ui/core';
import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="banner">
      <Container>
        <Grid container alignItems="center">
          <Grid xs={6}>
            <h1>Bem vindo ao blog</h1>
            <h3>Digita alguma coisa pra noiz ai, pls</h3>
            <Button className="botao1" variant="contained">
              Ver postagens
            </Button>
            <Button variant="outlined">Criar nova postagem</Button>
          </Grid>
          <Grid xs={6}>
            <img src="https://i.imgur.com/PiWN0y3.png" alt="" width="450px" />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Home;
