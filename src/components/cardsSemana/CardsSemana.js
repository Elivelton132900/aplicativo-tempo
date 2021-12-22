import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import './cardssemana.css'
import './descricaoTempoMiniatura.css'
import { pegaDados } from "../../actions";


const semana = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"]

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

const meses = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez"
];

const CardsSemana = ({dadosApi, pegaDados}) => {

    const [previsaoSemana, setPrevisaoSemana] = useState([])

    useEffect(() => {
        if (dadosApi.data !== undefined && dadosApi.data.results !== undefined) {
            setPrevisaoSemana(dadosApi.data.results.forecast)
        }
    }, [dadosApi])

    const RenderizaCards = previsaoSemana.map((item, id) => {
        if (id <= 4) {
            const dia = id === 0 ? 'Amanhã' : `${item.weekday}, ${item.date.split('/')[0]} ${meses[item.date.split('/')[1] - 1]}`
            return (
                <div key={item.date} className="containerCards">
                    <h2>{dia}</h2>
                    <div className={`${condicaoTempoLista[item.condition.toString()]} tempoCondicaoMiniatura`}></div>
                    <div className="containerMinMax">
                        <span className="max">{item.max}℃ </span>
                        <span className="min">{item.min}℃ </span>  
                    </div>
                </div>
            )
        } else {
            return null
        }
    })

    return (
        <div className="containerInfosSemana">
            {RenderizaCards}
        </div>
    )
}

const mapStateToProps = (state) => {
    return { dadosApi: state.pegaDadoReducer }
}

export default connect(mapStateToProps, { pegaDados })(CardsSemana)
