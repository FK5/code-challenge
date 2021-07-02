import React, {SyntheticEvent, useState, useRef} from 'react';
import Layout from "../layouts/Layout";
import {useRouter} from "next/router";
import ReCAPTCHA from "react-google-recaptcha";

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const reRef = useRef<ReCAPTCHA>();

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const token = await reRef.current.executeAsync();
        reRef.current.reset()

        console.log(token)

        await fetch('https://code-api-5500.herokuapp.com/api/register', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        await router.push('/login');
    }

    return (
        <Layout>
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">Please register</h1>

                <input className="form-control" placeholder="Name" required
                       onChange={e => setName(e.target.value)}
                />

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

                <button className="w-100 btn btn-lg btn-primary mt-5" type="submit">Submit</button>
            </form>
        </Layout>
    );
};

export default Register;