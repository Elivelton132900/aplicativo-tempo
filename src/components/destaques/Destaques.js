import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { pegaDados } from "../../actions";
import './destaques.css'

const Destaques = ({ dadosApi }) => {

    const [velocidadeVento, setVelocidadeVento] = useState('')
    const [umidade, setUmidade] = useState('')
    const [sunrise, setSunrise] = useState('')
    const [sunset, setSunset] = useState('')

    useEffect(() => {


        if (dadosApi.data !== undefined && dadosApi.data.results !== undefined) {
            setVelocidadeVento(dadosApi.data.results.wind_speedy)
            setUmidade(dadosApi.data.results.humidity)
            setSunrise(dadosApi.data.results.sunrise)
            setSunset(dadosApi.data.results.sunset)
        }
    }, [dadosApi])

    if (sunset.includes('pm')) {
        let [horas, minutos] = sunset.split(':')
        horas = parseInt(horas) + 12
        minutos = minutos.replace(' pm', '')
        let string = horas + ':' + minutos
        setSunset(string)
        string = sunrise.replace(' am', '')
        setSunrise(string)
    }

    return (
        <>
            <h2 className="destaqueCabecalho">Destaques do dia</h2>
            <div className="containerDestaques">
                <div className="containerCardDestaques">
                    <h2 className="cabecalhoCard">Velocidade do vento</h2>
                    <h3 className="informacao">
                        <span className="numeroDestaque">{velocidadeVento}</span>
                        </h3>
                </div>
                <div className="containerCardDestaques">
                    <h2 className="cabecalhoCard">Umidade</h2>
                    <h3>
                        <span className="numeroDestaque">{umidade}%</span>                     
                    </h3>
                    <div className="containerProgressBar">
                        <div className="numerosProgressBar">
                            <h5>0</h5>
                            <h5>50</h5>
                            <h5>100</h5>
                        </div>
                        <progress value={umidade} max='100'>{umidade}</progress>
                        <div className="porcentagem numeros">%</div>
                    </div>
                </div>
                <div className="containerCardDestaques">
                    <h2 className="cabecalhoCard">Nascer do sol</h2>
                    <h3 className="informacao">
                        <span className="numeroDestaque">{sunrise}</span>                       
                    </h3>
                </div>
                <div className="containerCardDestaques">
                    <h2 className="cabecalhoCard">Pôr do sol</h2>
                    <h3 className="informacao">
                        <span className="numeroDestaque">
                           {sunset} 
                        </span>
                    </h3>
                </div>
            </div>
        </>
    )
}

const MapStateToProps = (state) => {
    return { dadosApi: state.pegaDadoReducer }
}

export default connect(MapStateToProps, { pegaDados })(Destaques)