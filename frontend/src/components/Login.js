import React from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useState } from 'react';
import "./Login.css"

export default function Login() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: '',
        password: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value

        });

    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('/login', { ...values })
            .then(result => {
                console.log(result)
                if (result.data === "Úspešne ste sa prihlásili.") {
                    navigate("/home")
                } else {
                    setMessage(result.data);
                }
            }).catch(error => console.log(error))


    }




    return (
        <>
            <div className="login-container">
                <h2>Testovacia stránka na ukážku. Použité údaje nie sú pravdivé.</h2>
                <div className="login-form">

                    <form onSubmit={handleSubmit}>

                        <label>
                            Meno:
                            <input type="text" name="name" value={values.name} onChange={handleChange} required />

                        </label>
                        <label>Heslo: <input type="password" name="password" value={values.password} onChange={handleChange} required /></label>
                        <button>Prihlás sa</button>

                    </form>

                    {message && <div className="message">{message}</div>}
                    <div className="login-details">
                        <p>Prihlasovacie údaje:</p>
                        <p>Meno: 'test'</p>
                        <p>Heslo: #test123</p>
                    </div>

                </div>
            </div>

        </>
    )
}
