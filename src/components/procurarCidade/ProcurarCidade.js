import React, { useState } from 'react'
import { connect } from 'react-redux'
import { pegaDados } from "../../actions";
import './procurarcidade.css'

const ProcurarCidade = ({ dadosApi, pegaDados }) => {

    const [input, setInput] = useState('')
    const spinnerCidade = document.querySelector('.spinnerCidade')

    const mostraSpinnerCidade = () => {
        if (spinnerCidade !== null) {
            const spinnerCidade = document.querySelector('.spinnerCidade')
            spinnerCidade.style.display = 'block'
        }
    }

    const aoProcurar = () => {
        const spinner = document.querySelector('.spinner')
        spinner.style.display = 'block'
        const url = 'weather?key=6a79cccd&city_name=' + input
        pegaDados(url)
        setInput('')
        trocaTela()
    }

    const novaPesquisa = (e) => {
        const urls = {
            'weather?key=6a79cccd&city_name=sp': 'São Paulo',
            'weather?key=6a79cccd&city_name=riodejaneiro': 'Rio de Janeiro',
            'weather?key=6a79cccd&city_name=brasilia': 'Brasília'
        }
        const valorItemClicado = e.target.textContent
        console.log('valor item clicado', valorItemClicado)
        const valorExistente = Object.values(urls).indexOf(valorItemClicado) !== -1 ? true : false
        console.log('valor existente?', valorExistente)
        if (valorExistente) {
            const spinner = document.querySelector('.spinner')
            spinner.style.display = 'block'
            let url = Object.entries(urls).map(item => item[1] === valorItemClicado ? item[0] : '')
            // limpando linhas ''
            url = url.filter(item => item !== '')
            console.log('url para string',url.toString())
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
            <i class="far fa-times-circle" onClick={trocaTela}></i>
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