import React from 'react';
import Head from "next/head";
import Link from "next/link";
import Datatable from 'react-bs-datatable';


const DataTable = (users) => {
    // let u = users
    // console.log(users.users[0]);
    let u={id: '', name: '', email:''};
    for (const user in users.users) {
        u.id = user['id'];
        // users.users.forEach(element => {u.id = element.id ; u.name=element.name; u.email= element.email});
      }
    // users.users.forEach(element => {u.id = element.id ; u.name=element.name; u.email= element.email});
    console.log(u);
    const header = [
        { title: 'ID', prop: 'id' },
        { title: 'Name', prop: 'realname' },
        { title: 'Email', prop: 'email' }
    ];

    const body =[
        {
        id: 'i-am-billy',
        realname: `Billy`,
        email: 'Mars'
        }
    ]


  
  
    return <Datatable tableHeaders={header} tableBody={body} />;
}


  export default DataTable;