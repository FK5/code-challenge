import React, {SyntheticEvent, useState, useRef} from 'react';
import Layout from "../layouts/Layout";
import Head from "next/head";
import {useRouter} from "next/router";
import Cookies from "js-cookie";
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const reRef = useRef<ReCAPTCHA>();

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const token = await reRef.current.executeAsync();
        reRef.current.reset()

        console.log(token)

        const response = await fetch('https://code-api-5500.herokuapp.com/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
        });

        const content = await response.json();

        await Cookies.set('user_role', content.role);

        await router.push('/');
    }

    return (
        <Layout>
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                <input type="email" className="form-control" placeholder="Email" required
                       onChange={e => setEmail(e.target.value)}
                />

                <input type="password" className="form-control" placeholder="Password" required
                       onChange={e => setPassword(e.target.value)}
                />

                <ReCAPTCHA sitekey="6Letw24bAAAAABeG-o8kvS3YL6otZWvhOt4HMApy"
                            size="invisible" 
                            ref={reRef}
                            />

                <button className="w-100 btn btn-lg btn-primary mt-5" type="submit">Sign in</button>
            </form>
        </Layout>
    );
};

export default Login;