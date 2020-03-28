import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {FaArrowLeft} from 'react-icons/fa'
import logoImg from "../../assets/logo.svg"
import api from '../../services/api'
import './style.css'

export default function Register(){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsaApp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();
   
  async function handleRegister(e) {
    
    e.preventDefault();

    console.log({
      name,
      email,  
      whatsapp,
      city,
      uf,
    });

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf,
    };

    try {
      const response = await api.post('ongs', data)
      alert(`Seu ID de acesso: ${response.data.id}`);
      history.push('/')

    } catch (err) {
      alert('Erro ao realizar cadastro.');
    }
  }
    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Bet The Heroe"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link className ="back-link" to="/">
                        <FaArrowLeft size={16} color="#e02041" />
                       Não tenho Cadastro
                   </Link>

                </section>        
            <form onSubmit={handleRegister}>
                <input
                placeholder="Nome da ONG"
                value={name}
                onChange={e => setName(e.target.value)}
                />

                <input type = "email" 
                placeholder="E-mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
                />

                <input 
                placeholder="WhatsaApp"
                value={whatsapp}
                onChange={e => setWhatsaApp(e.target.value)}
                />
                
                <div className="input-group">
                <input
                 placeholder="Cidade"
                 value={city}
                onChange={e => setCity(e.target.value)}
                 />
                <input 
                placeholder="UF" style= {{ width: 80}}
                value={uf}
                onChange={e => setUf(e.target.value)}
                />
                </div>

                <button className="button" type="submit"> Cadastrar </button>
            </form>

            </div>
        </div> 
    );

}