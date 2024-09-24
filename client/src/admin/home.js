import React, { Fragment, useState,useEffect } from 'react'
import { Button,Table } from 'bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import products from './products';
import Item from '../components/Item/Item';
import {Link,useNavigate } from 'react-router-dom'
import axios from "axios";


function Homeadmin() {
    
    const [Items,setdItems]=useState([])
    

    useEffect(() => {
        axios.get("http://localhost:5000/api/items")
            .then(res => setdItems(res.data))
            .catch(err => console.log(err))

        window.scrollTo(0, 0)
    }, [])


  return(
    
    <div style={{margin:'10rem'}}>
        <table striped bordered hover size='sm'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th> name </th>
                    <th>Category</th>
                    <th>color </th>
                    <th>type</th>
                    <th>description</th>
                    <th>price</th>
                    <th>size</th>
                    <th> Actions</th>
                </tr>
            </thead>
        </table>
      <br>
      </br>
      <Link classname='d-grid gap-2' to="/create">
        <Button size="lg">create</Button>
      </Link>
    </div>
    
  )
}

export default Homeadmin
