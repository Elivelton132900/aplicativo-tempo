import apiTempo from "../api/apiTempo"

export const pegaDados = (url) => async (dispatch) => {
    _pegaDados(url, dispatch)
}

const _pegaDados = async(url, dispatch) => {
    const response = await apiTempo.get(url)
    dispatch({type: 'PEGA_DADOS', payload: response})
}