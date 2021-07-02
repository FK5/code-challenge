import Layout from "../layouts/Layout";
import {useEffect, useState} from "react";
import S3 from 'react-aws-s3';
import Image from 'next/image'


export default function Home() {
    const [message, setMessage] = useState('');
    const [imagelink, setImagelink] = useState('');
    const [auth, setAuth] = useState(false);

    const config = {
        bucketName: 'myBucket',
        dirName: 'media',
        region: 'eu-west-1',
        accessKeyId: 'JAJHAFJFHJDFJSDHFSDHFJKDSF',
        secretAccessKey: 'jhsdf99845fd98qwed42ebdyeqwd-3r98f373f=qwrq3rfr3rf',
        s3Url: 'https:/dummy-s3-url.com/', 
    }

    const ReactS3Client = new S3(config);
    const newFileName = 'test-file';

    const uploadImage = (file) =>{
        ReactS3Client
        .uploadFile(file, newFileName)
        .then(data => console.log(data))
        .catch(err => console.error(err))
    }
    

    useEffect(() => {
        (
            async () => {
                try {
                    const response = await fetch('https://code-api-5500.herokuapp.com/api/user', {
                        credentials: 'include',
                    });

                    const content = await response.json();
                    console.log(content);
                    setMessage(`Hi ${content.name}, Thank you for siging up!`);
                    setImagelink(content.imagelink);
                    setAuth(true);
                } catch (e) {
                    setMessage('You are not logged in');
                    setAuth(false);
                }
            }
        )();
    },[]);

    return (
        <Layout auth={auth}>
            {message}
            <div className="card mt-5" style={{width: "18rem"}}>
                {/* <Image className="card-img-top" src={imagelink} alt="Profile Image"/> */}
                <div className="card-body">
                    <form onSubmit={uploadImage}>
                        <label className="form-label" htmlFor="customFile">Upload Image</label>
                        <input type="file" className="form-control" id="customFile" />
                    </form>
                </div>
            </div>
        </Layout>
    )
}