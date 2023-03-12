import Postagem from './Postagem';
interface Usuario {
  id: number
  nome: string
  usuario: string
  foto: string
  senha: string
  postagem?: Postagem[]
}

export default Usuario