/* eslint-disable import/no-anonymous-default-export */

export default (state=[], action) => {
    switch (action.type) {
        case 'PEGA_DADOS':
            return action.payload
        default:
            return state
    }
}