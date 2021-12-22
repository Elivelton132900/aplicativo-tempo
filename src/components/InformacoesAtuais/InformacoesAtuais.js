import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { pegaDados } from "../../actions";
import './informacoesatuais.css'
import './descricaoTempo.css'
import Spinner from "../Spinner/Spinner";

const semana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
];

const condicaoTempoLista = {
    'storm': 'Thunderstom',
    'snow': 'Snow',
    'hail': 'Hail',
    'rain': 'LightRain',
    'fog': '',
    'clear_day': 'Clear',
    'clear_night': 'Lua',
    'cloud': 'HeavyCloud',
    'cloudly_day': 'HeavyCloud',
    'cloudly_night': 'HeavyCloud',
    'none_day': 'Clear',
    'none_night': 'Lua'
}

const data = new Date()
const InformacoesAtuais = ({ dadosApi, pegaDados }) => {

    const [temperaturaAgora, setTemperaturaAgora] = useState('')
    const [descricaoTempo, setDescricaoTempo] = useState('')
    const [nomeCidade, setNomeCidade] = useState('')
    const [condicaoTempo, setCondicaoTempo] = useState('')
    const [diaDaSemana] = useState(semana[data.getDay()])
    const [mes] = useState(meses[data.getMonth()])

    useEffect(() => {
        pegaDados('weather?format=json-cors&key=bb144fdd')
    }, [pegaDados])

    useEffect(() => {
        if (dadosApi.data !== undefined && dadosApi.data.results !== undefined) {
            setTemperaturaAgora(dadosApi.data.results.temp)
            setDescricaoTempo(dadosApi.data.results.description)
            setNomeCidade(dadosApi.data.results.city_name)
            setCondicaoTempo(dadosApi.data.results.condition_slug)
        }

    }, [dadosApi])

    const aoClick = async () => {
        
        if ('geolocation' in navigator) {
            mostraSpinner()
            const promise = new Promise(function (resolve, reject) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    const lat = position.coords.latitude
                    const lon = position.coords.longitude
                    resolve({ lat, lon })
                })
            })
            promise.then(function (coordenadas) {
                pegaDados(`weather?key=bb144fdd &lat=${coordenadas.lat}&lon=${coordenadas.lon}&user_ip=remote`)
            })
        } else {
            window.alert('Opção não disponível para esse navegador.')
        }
    }

    const mostraSpinner = () => {
        const spinner = document.querySelector('.spinner')
        spinner.style.display = 'block'
    }
    const escondeSpinner = () => {
        const spinner = document.querySelector('.spinner')
        if (spinner !== null) {
            spinner.style.display = 'none'
        }
    }

    const trocaTela = () => {
        const componente = document.querySelector('.containerInformacoesAtuais')
        const procurarCidadeComponente = document.querySelector('.containerProcurarCidade')
        procurarCidadeComponente.style.display = 'block'
        componente.style.display = 'none'
    }

    const renderizaTudo = () => {
        return (
            <div className="containerInformacoesAtuais">
                <div className="inputEBotao">
                    <button 
                    onClick={trocaTela}
                    className="botaoInput">
                        Procurar por cidades
                    </button>
                    <button onClick={aoClick} className="imagem">
                        <i className="icon"></i>
                        <Spinner />
                    </button>
                </div>
                <div className="ilustracao">
                    <div className="nuvem1"></div>
                    <div className="nuvem2"></div>
                    <div className="nuvem3"></div>
                    <div className="nuvem4"></div>
                    <div className={`${condicaoTempoLista[condicaoTempo.toString()]} tempoCondicao`}></div>
                </div>
                <div className="colunaInfos">
                    <div className="temperaturaAgora">
                        <span className="numero">
                            {temperaturaAgora}
                        </span>
                        <span className="celsius">℃</span>
                    </div>
                    <div className="descricaoTempo">{descricaoTempo}</div>
                    <div className="dataContainer">
                        <span className="after">hoje</span>
                        <span className="data">
                            {`${diaDaSemana}, 
                    ${data.getDate()} 
                    ${mes}`}
                        </span>
                    </div>
                </div>
                <div className="local">
                    <i className
                        ="fas fa-map-marker-alt"></i>
                    <span>{nomeCidade}</span>
                    {escondeSpinner()}
                </div>
            </div>
        )
    }

    return (
        renderizaTudo()
    )
}

const mapStateToProps = (state) => {
    return { dadosApi: state.pegaDadoReducer }
}

export default connect(mapStateToProps, { pegaDados })(InformacoesAtuais)