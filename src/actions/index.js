import apiTempo from "../api/apiTempo"

export const pegaDados = (url) => async (dispatch) => {
    _pegaDados(url, dispatch)
}

const _pegaDados = async(url, dispatch) => {
    console.log('url recebida', url)
    const response = await apiTempo.get(url)
    console.log(response)
    dispatch({type: 'PEGA_DADOS', payload: response})
}