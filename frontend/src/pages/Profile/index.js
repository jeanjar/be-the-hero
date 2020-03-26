import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {FiPower, FiTrash2} from "react-icons/fi";
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

import './styles.css';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            incidents: [],
        }

        this.handleDelete = this.handleDelete.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount() {
        const ongId = localStorage.getItem('ongId');
        api.get('/profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            this.setState({incidents: response.data});
        }).catch(errorResponse => {

        });
    }

    handleDelete(id) {
        const ongId = localStorage.getItem('ongId');
        api.delete(`/incidents/${id}`, {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            this.setState({
                incidents: this.state.incidents.filter(incident => incident.id !== id)
            });
        }).catch(errorResponse => {

        });
    }

    handleLogout() {
        const { history } = this.props;
        localStorage.clear();
        history.push('/');
    }

    render() {
        const { history } = this.props;
        const ongName = localStorage.getItem('ongName');
        return (
            <div className="profile-container">
                <header>
                    <img src={logoImg} alt={'Be the Hero'}/>
                    <span>Bem vinda, {ongName}</span>
                    <Link className={'button'} to={'/incidents/new'}>Cadastar novo Caso</Link>
                    <button onClick={this.handleLogout} type={'button'}>
                        <FiPower size={18} color={'#E02041'} />
                    </button>
                </header>
                <h1>Casos Cadastrados</h1>
                <ul>
                    {this.state.incidents.map(incident => {
                        const {id, title, description, value} = incident;
                        return (
                            <li key={id}>
                                <strong>CASO:</strong>
                                <p>{title}</p>

                                <strong>DESCRIÇÃO:</strong>
                                <p>{description}</p>

                                <strong>VALOR:</strong>
                                <p>{Intl.NumberFormat('pt-BR', {'style': 'currency', currency: 'BRL'}).format(value)}</p>

                                <button onClick={() => this.handleDelete(id)} type={'button'}>
                                    <FiTrash2 size={20} color={'#a8a8b3'} />
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default withRouter(Profile);