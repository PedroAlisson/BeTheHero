import React, {useState ,useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {FiPower, FiTrash2} from 'react-icons/fi'
import logoImg from "../../assets/logo.svg"
import './style.css'

import api from '../../services/api'

export default function Profile(){

    const [incidents, setIncidents] = useState([])

    const ongId= localStorage.getItem('ongId')
    const ongname = localStorage.getItem('ongName')

    const history = useHistory()

    useEffect(()=> {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {

            setIncidents(response.data)

        })
    }, [ongId]);

    async function handleDelete(id){

        try {
            await api.delete(`incidents/${id}`,{
                headers:{
                    Authorization : ongId,
                }
            });

            setIncidents(incidents.filter(incidents => incidents.id !== id));
        } catch (error) {
            alert('Erro ao deletar, tente novamente')
        }

    }

    function handleLogout(){

            localStorage.clear();

        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Heroe"/>
                <span>Bem vinda, {ongname}</span>

                <Link className="button" to= "/incidents/new"> 
                    Cadastrar novo caso
                </Link>

                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041"/>
                </button>

            </header>
            <h1>Casos cadastrados</h1>
            <ul>
                {
                    incidents.map(incidents =>(
                    <li key={incidents.id}>
                    <strong>CASO:</strong>
                    <p>{incidents.title}</p>

                    <strong>DESCRIÇÃO:</strong>
                    <p>{incidents.desciption}</p>

                    <strong>VALOR:</strong>
                    <p>{Intl.NumberFormat('pt-BR', { style : 'currency', currency: 'BRL'}).format(incidents.value)}</p>

                    <button onClick={() => handleDelete(incidents.id)} type="button">
                        <FiTrash2 size={20} color="a8a8b3" />
                    </button>
                </li>
                ))}               
            </ul>
        </div>
    );
}