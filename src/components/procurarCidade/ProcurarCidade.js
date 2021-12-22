import React, { useState } from 'react'
import { connect } from 'react-redux'
import { pegaDados } from "../../actions";
import './procurarcidade.css'

const ProcurarCidade = ({ pegaDados }) => {

    const [input, setInput] = useState('')

    const aoProcurar = () => {
        const spinner = document.querySelector('.spinner')
        spinner.style.display = 'block'
        const url = 'weather?key=bb144fdd&city_name=' + input
        pegaDados(url)
        setInput('')
        trocaTela()
    }
    
    const novaPesquisa = (e) => {
        const urls = {
            'weather?key=bb144fdd&city_name=sp': 'São Paulo',
            'weather?key=bb144fdd&city_name=riodejaneiro': 'Rio de Janeiro',
            'weather?key=bb144fdd&city_name=brasilia': 'Brasília'
        }
        const valorItemClicado = e.target.textContent
        const valorExistente = Object.values(urls).indexOf(valorItemClicado) !== -1 ? true : false
        if (valorExistente) {
            const spinner = document.querySelector('.spinner')
            spinner.style.display = 'block'
            let url = Object.entries(urls).map(item => item[1] === valorItemClicado ? item[0] : '')
            // limpando linhas ''
            url = url.filter(item => item !== '')
            pegaDados(url.toString())
            trocaTela()
        }
    }

    const trocaTela = () => {
        const procurarCidadeComponente = document.querySelector('.containerProcurarCidade')
        const componente = document.querySelector('.containerInformacoesAtuais')
        componente.style.display = 'block'
        procurarCidadeComponente.style.display = 'none'
        procurarCidadeComponente.style.position = 'relative'
    }

    return (
        <div className='containerProcurarCidade'>
            <i className="far fa-times-circle" onClick={trocaTela}></i>
            <div className='form'>
                <i className="fas fa-search"></i>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder='Procurar por cidades'
                ></input>
                <button
                    onClick={(e) => aoProcurar(e)}
                >Search</button>
            </div>
            <div className='opcoesDefinidas' onClick={novaPesquisa}>
                <div className='containerOpcoesDefinidas'>São Paulo</div>
                <div className='containerOpcoesDefinidas'>Rio de Janeiro</div>
                <div className='containerOpcoesDefinidas'>Brasília</div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return { dadosApi: state.pegaDadoReducer }
}

export default connect(mapStateToProps, { pegaDados })(ProcurarCidade)