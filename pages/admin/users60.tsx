import Layout from "../../layouts/Layout";
import {useEffect, useState, useCallback} from "react";
import Cookies from "js-cookie";
import {useRouter} from "next/router";
import IndexTableWithBulkActions from "../../components/IndexTableWithBulkActions";
import DataTable from "../../components/datatable";
import Link from "next/link"

export default function Home() {
    const [content, setContent] = useState('');
    const [message, setMessage] = useState('');
    const [url, setUrl] = useState('https://code-api-5500.herokuapp.coms/api/admin/users60');
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
                        console.log(url)
                        const response = await fetch(url, {
                            credentials: 'include',
                        });

                        setContent(await response.json());
                        setMessage(`Hello`);
                        setAuth(true);
                        console.log(content)
                    } catch (e) {
                        console.log(e)
                        setMessage('You are not logged in');
                        setAuth(false);
                    }
                    
                }
            }
        )();

    },[]);

    const nbPages = content['last_page']
    const links = content['links']

    const urllinks = []
    for (var key in links) {
        var l = links[key];
        var link = {'url': l.url, 'label': l.label};
        urllinks.push(link);
    }

    const pageRedirect = (newUrl) =>{
        setUrl(newUrl)
    }
    const items = []
    for(var i=1; i<=nbPages; i++){
        items.push(<button key={urllinks[i].label} type="button" onClick={()=>pageRedirect(urllinks[i].url)} className="btn btn-primary btn-sm me-3">{urllinks[i].label}</button>)
    }


    return (
        <Layout auth={auth}>
            {message}
            <div className="mb-2">
                <Link href="/admin"><button type="button" className="btn btn-primary btn-sm me-2">20 users</button></Link>
                <Link href="/admin/users40"><button type="button" className="btn btn-primary btn-sm me-2">40 users</button></Link>
                <Link href="/admin/users60"><button type="button" className="btn btn-primary btn-sm me-2">60 users</button></Link>
            </div>
            <DataTable urls={url} users={content} parentCallback = {value => setUrl(value)}></DataTable>
            {items}
        </Layout>
        
    )
}