import React from 'react';
import Datatable from 'react-bs-datatable';


const DataTable = (props) => {
    let {users, func}=props;
    const nbPages = props.users.last_page;
    const data = props.users.data;
    const links = props.users.links;
    // console.log(data);
    // console.log(users.users.current_page);
    // console.log(users.users[0]);
    var body = [];
    for (var key in data) {
        var u = data[key];
        var user = {'id': u.id, 'realname':u.name, 'email':u.email};
        body.push(user);
      }
    const header = [
        { title: 'ID', prop: 'id', sortable: true , filterable: true},
        { title: 'Name', prop: 'realname' , sortable: true, filterable: true },
        { title: 'Email', prop: 'email' , sortable: true, filterable: true}
    ];

    // const body =[
    //     {
    //     id: 'i-am-billy',
    //     realname: `Billy`,
    //     email: 'Mars'
    //     }
    // ]

    const urllinks = []

    for (var key in links) {
        var l = links[key];
        var link = {'url': l.url, 'label': l.label};
        urllinks.push(link);
    }
    // console.log(urllinks);
    const items = []
    const pageRedirect = (newUrl) =>{
        func(newUrl)
        // console.log(newUrl)
    }
    for(var i=1; i<=nbPages; i++){
        // const fonct = pageRedirect(urllinks[i].url)
        items.push(<button key={urllinks[i].label} type="button" onClick={()=>pageRedirect(urllinks[i].url)} className="btn btn-primary btn-sm me-3">{urllinks[i].label}</button>)
    }


  
  
    return (
        <div>
            <Datatable tableHeaders={header} tableBody={body} />
            {items}
            {/* <button type="button" className="btn btn-primary btn-sm"></button> */}
            {/* {urllinks.map((value, index) => {
                    return <button key={index} className="btn btn-primary btn-sm">{value}</button>
                })} */}
        </div>
    );
}


  export default DataTable;