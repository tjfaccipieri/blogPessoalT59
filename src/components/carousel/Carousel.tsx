import React from 'react'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';


// variavel que ira receber as informações para cada uma das repetições do carousel.
// aqui dentro pode ser usado qualquer tag HTML, incluindo conteudo do MUI, sempre separando por virgulas, pois é um array comum
const items = [
  <img src="https://github.com/tjfaccipieri.png"  role="presentation" />,
  <img src="https://github.com/fernandodelgadoazevedo.png"  role="presentation" />,
  <img src="https://github.com/ChrisPCruz99.png"  role="presentation" />,
];

// caso necessário controlar quantos itens aparecem por vez no carousel, pode ser feito de modo responsivo
// os dados de quantos itens carregam em cada tamanho de tela, ficam aqui
const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 3 },
};

function Carousel() {
  return (
    // o retorno é apenas a tag do AliceCarousel, com suas opções, que estão todas disponiveis no link da documentação do npmjs
    <AliceCarousel mouseTracking infinite autoPlay items={items} animationType="fadeout" 
    animationDuration={800} />
  )
}

export default Carousel