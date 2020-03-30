import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'
import api from '../../services/api'

import heroImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'

import './styles.css'

export default function Logon() {
    const [id, setId] = useState('')

    const history = useHistory();

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const result = await api.post('sessions', { id })
            alert(`Seu id de acesso ${result.data.name}`)

            localStorage.setItem('ong_id',id )
            localStorage.setItem('ong_name', result.data.name)
            history.push('/profile')
        } catch (err) {
            alert("login invalido")
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be the Hero" />

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input placeholder="Seu ID" value={id} onChange={e => setId(e.target.value)} />
                    <button className="button" type="submit">Entrar</button>
                    <Link to="/register" className="back-link"><FiLogIn size={16} color="#E02041" />Não tenho cadastro</Link >
                </form>
            </section>

            <img src={heroImg} alt="Heros" />
        </div>
    )
}