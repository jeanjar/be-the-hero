import React, {useState} from 'react';
import {FiLogIn} from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function(props) {
    const [id, setId] = useState('');
    const history = useHistory();

    function handleLogin(e) {
        e.preventDefault();

        api.post('/sessions', {id}).then(response => {
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);
            history.push('/profile');
        }).catch(errorResponse => {
            alert('Falha no login, tente novamente');
        })
    }

    return (
        <div className="login-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu Login</h1>
                    <input
                        value={id}
                        onChange={e => setId(e.target.value)}
                        placeholder="Sua ID" />
                    <button className={'button'} type="submit">Entrar</button>
                    <Link to={'/register'} className={'back-link'}>
                        <FiLogIn size={16} color={'#E02041'} />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes" />
        </div>
    );
}