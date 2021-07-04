import React from 'react';
import Datatable from 'react-bs-datatable';


const DataTable = (props) => {

    const nbPages = props.users.last_page;
    const data = props.users.data;
    const links = props.users.links;

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




    return (
        <div>
            <Datatable tableHeaders={header} tableBody={body} />
        </div>
    );
}


  export default DataTable;