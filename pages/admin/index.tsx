import Layout from "../../layouts/Layout";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {useRouter} from "next/router";
import IndexTableWithBulkActions from "../../components/IndexTableWithBulkActions";
import DataTable from "../../components/datatable";

export default function Home() {
    const [content, setContent] = useState('');
    const [message, setMessage] = useState('');
    const [auth, setAuth] = useState(false);
    const router = useRouter();
    const role = Cookies.get("user_role");


    useEffect(() => {
        (
            async () => {
                if(role!="admin"){
                    router.push('/');
                }else{
                    try {
                        const response = await fetch('http://localhost:8000/api/admin/users', {
                            credentials: 'include',
                        });

                        // content = await response.json();
                        setContent(await response.json());
                        
                        setMessage(`Hello`);
                        setAuth(true);
                    } catch (e) {
                        setMessage('You are not logged in');
                        setAuth(false);
                    }
                }
            }
        )();
    },[]);

    return (
        <Layout auth={auth}>
            {message}
            {/* <IndexTableWithBulkActions users={content}></IndexTableWithBulkActions> */}
            <DataTable users={content}></DataTable>
        </Layout>
        
    )
}