import axios from 'axios';
import React, { useState } from 'react'
import styles from '../styles/Home.module.css'

function Status(props) {
    const {status} = props
    if(status.code>=200 && status.code<300) {
        // document.querySelector('.status').style.color = 'lime';
    }
    return (
        <span className={styles.status}>{status.message}</span>
    )
}

function Form() {

    const [user, setUser] = useState({ name: '', email: '', password: '' })
    const [status, setStatus] = useState()

    const valid = () => {
        // console.log("Username => ", user.name, typeof(user.name))
        // console.log("Email => ", user.email, typeof(user.email))
        // console.log("Password => ", user.password, typeof(user.password))

        if(!user.name || !user.password || !user.email) {
            setStatus({code: 406, message: "Details cannot be empty"})
            return false
        }

        if(!user.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            setStatus({code: 406, message: "Invalid email"})
            return false
        }

        return true
    }

    const submitData = (e) => {
        e.preventDefault();
        if(!valid()) {
            console.log("Not valid")
            return
        }

        axios.post('/api/registerUser', user)
            .then((res) => setStatus({ code: res.status, message: res.data }))
            .catch((err) => setStatus({ code: err.response.status, message: err.response.data }))
            // .catch((err) => console.log(err))
    }

    return (
        <>
            <form className={styles.card}>
                {status ? <Status status={status}/> : null}
                <label htmlFor="name">Name : </label>
                <input type="text" value={user.name} name="name" onChange={e => setUser({ ...user, 'name': e.target.value })} required />
                <label htmlFor="email">email : </label>
                <input type="text" value={user.email} name="email" onChange={e => setUser({ ...user, 'email': e.target.value })} required />
                <label htmlFor="password">password : </label>
                <input type="password" value={user.password} name="password" onChange={e => setUser({ ...user, 'password': e.target.value })} required />
                <button className={styles.submitBtn} onClick={submitData}>Submit</button>
            </form>
        </>
    )
}

export default Form