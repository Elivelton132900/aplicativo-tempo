import React, { useEffect } from "react";
import { connect } from "react-redux";
import { pegaDados} from "../../actions";
import './app.css'
import InformacoesAtuais from "../InformacoesAtuais/InformacoesAtuais";
import CardsSemana from "../cardsSemana/CardsSemana";
import Destaques from "../destaques/Destaques";
import ProcurarCidade from "../procurarCidade/ProcurarCidade";
import '../responsividade.css'

const App = (props) => {
  
  useEffect(() => {
    props.pegaDados()
  }, [])

  return (
    <div className="app">
      <InformacoesAtuais />
      <ProcurarCidade />
      <div className="containerTelaDireita">
          <CardsSemana />
          <Destaques />
      </div>
      <div className='creditosContainer'>
        <h2 className='creditos'>Criado por <span>Elivelton</span> - <a href='https://devchallenges.io/' target='blank' className='link'>devchallenges.io</a></h2>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log('state', state)
  return state
}

export default connect(mapStateToProps, { pegaDados })(App);
