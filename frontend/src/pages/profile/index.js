import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'
import logoImg from '../../assets/logo.svg'

import api from '../../services/api'

import './styles.css'

export default function Profile() {
    const ong_name = localStorage.getItem('ong_name')
    const ong_id = localStorage.getItem('ong_id')
    const [incidents, setIncidents] = useState([])
    const history = useHistory();

    useEffect(() => {
        api.get('profile', {
            headers: {
                ong_id
            }
        }).then(response => {
            setIncidents(response.data)
        })
    }, [ong_id])

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    ong_id
                }
            })

            setIncidents(incidents.filter(incident =>  incident.id !== id ))
        }
        catch (err) {
            alert(err)
        }
    }

    function handleLogout() {
        localStorage.clear()
        history.push('/')
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero" />
                <span>Bem vinda, {ong_name}</span>
                <Link className="button" to="/incident/new">Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {
                    incidents.map(incident => (
                        <li key={incident.id}>
                            <strong>caso:</strong>
                            <p>{incident.title}</p>

                            <strong>Descrição:</strong>
                            <p>{incident.description}</p>

                            <strong>Valor</strong>
                            <p>R$ {incident.value}</p>
                            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format('120')}</p>
                            <button type="button" onClick={() => { handleDeleteIncident(incident.id) }}>
                                <FiTrash2 size={20} color="#a8a8b3" />
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}