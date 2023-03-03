import axios from "axios";

export const api = axios.create({
  baseURL: 'https://blogdothiagofaccipieri.onrender.com'
})

export const login = async(url: any, dados: any, setDados: any) => {
  const resposta = await api.post(url, dados)
  setDados(resposta.data.token)
}

// Tipagem de dados da função assincrona:
// url: string => a url, sempre será um texto, portanto a anotação de string nela
// dados: Object => os dados que enviamos para o nosso backend, sempre irão no padrão JSON, que para o typescript, é um Objeto
// setDados: Function => sempre iremos executar uma função para atualizar os dados, por isso, a tipagem de Função
export const cadastro = async(url: string, dados: Object, setDados: Function) => {
  const resposta = await api.post(url, dados)
  setDados(resposta.data)
}