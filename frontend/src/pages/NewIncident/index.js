import React, { Component } from "react";
import {FiArrowLeft} from 'react-icons/fi';
import {Link, withRouter} from "react-router-dom";
import api from '../../services/api';

import logoImg from "../../assets/logo.svg";
import './styles.css';

class NewIncident extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            value: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        const {history} = this.props;
        const ongId = localStorage.getItem('ongId');
        api.post('/incidents', this.state, {
            headers: {
                Authorization: ongId
            }
        }).then(response => {
            history.push('/profile');
        });
    }

    render() {
        return (
            <div className={'new-incident-container'}>
                <div className="content">
                    <section>
                        <img src={logoImg} alt={'Be The Hero'}/>
                        <h1>Cadastrar novo Caso</h1>
                        <p>
                            Descreva o caso detalhadamente para encontrar um herói para resolver isso.
                        </p>
                        <Link to={'/profile'} className={'back-link'}>
                            <FiArrowLeft size={16} color={'#E02041'} />
                            Voltar para home
                        </Link>
                    </section>
                    <form onSubmit={this.handleSubmit}>
                        <input
                            value={this.state.title}
                            onChange={e => {this.setState({title: e.target.value})}}
                            type="text"
                            placeholder={'Título do caso'}/>
                        <textarea
                            value={this.state.description}
                            onChange={e => {this.setState({description: e.target.value})}}
                            placeholder={'Descrição'}/>
                        <input
                            value={this.state.value}
                            onChange={e => {this.setState({value: e.target.value})}}
                            type="text"
                            placeholder={'Valor em Reais'}/>
                        <button className="button">Cadastrar</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(NewIncident);