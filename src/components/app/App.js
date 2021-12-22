import React from "react";
import './app.css'
import InformacoesAtuais from "../InformacoesAtuais/InformacoesAtuais";
import CardsSemana from "../cardsSemana/CardsSemana";
import Destaques from "../destaques/Destaques";
import ProcurarCidade from "../procurarCidade/ProcurarCidade";
import '../responsividade.css'

const App = () => {
  
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

export default (App);
