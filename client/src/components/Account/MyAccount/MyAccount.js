import Account from '../Account';
import './MyAccount.css';
import { Link } from 'react-router-dom'
import { logout } from '../../services/Auth';
import { getUserData, getUseremail } from '../../services/Storage';
import { getUserName } from '../../services/Storage';
import axios from 'axios'
import { useEffect, useState } from 'react';


const MyAccount = () => {
    const [invoicedatas,setinvoicedatas]=useState([]);
    var user_id= getUserData();
    const [inorderbar,setinorderbar]=useState(false)

    const handleopenbar=()=>{
        if(inorderbar===false){
            setinorderbar(true)
        }else{
            setinorderbar(false)
        }
    }

   
    useEffect(()=>{
        if(getUseremail() === 'admin@gmail.com'){
            axios.get("https://vms-new.onrender.com/invoicelist")
            .then((res)=>{
            
                setinvoicedatas(res.data)
                 
             })
             .catch(err=>console.log(err))
        }else{
        axios.post("https://vms-new.onrender.com/invoicelist",{user_id})
        .then((res)=>{
            
           setinvoicedatas(res.data)
            
        })
        .catch(err=>console.log(err))
    }
    },[])

   
   

    const logoutUser = ()=>{
        console.log("sign out")
        logout();
        window.location.reload(false);
        
    }
    return ( 
        <Account>
            <div className="order__history__container">
                <div className="order__history">
                    <div className="order__history__header">{getUseremail() === 'admin@gmail.com' ? "User's Oders Histery" : 'Yours Orders'} </div>
                    <div className="order__history__detail" >
                        <div className='container5' >
                        <table className='table'  >
                                <tr>
                                    <th>{getUseremail() === 'admin@gmail.com' ? 'User_Id' : 'S.no'}</th>
                                    <th>Order_ID</th>
                                    <th>Date</th>
                                    <th>Product Description
                                       <tr> <th>Product</th>
                                        <th>Qty</th></tr>
                                    </th>
                                    <th>Bill Amount</th>
                                </tr>
                                {
                    invoicedatas.map((d,index)=>(
                        <tr>
                            <td>{getUseremail() === 'admin@gmail.com' ? d.user_id :index+1}</td>
                            <td>{d.booking_id}</td>
                            <td>{d.date}</td>
                            <td>{d.items.map((di,index)=>(<tr><td>{index+1}.{di.category} {di.name}</td><td>{di.itemQuantity}</td></tr>))}</td>
                            <td>Rs.{d.totalAmount}</td>
                        
                        </tr>
                    ))
                    
                }
                               
                            </table>


               
                        </div>
                    </div>
                </div>
            </div>
            <div className="account__details__container">
                <div className="account__details__header">
                    <div className="details__header">Account Details</div> 
                    <a href="/" className="bg-black text-white btn w-50 " onClick={logoutUser} 
                    style={{cursor:"pointer"}}>
                    Sign out
                  </a>
                </div>
                <div className="account__details">
                    <div className="account__holder__name">Account holder name : {getUserName()}</div>
                    <div className="account__holder__email">Account holder email : {getUseremail()}</div>
                    <div className="manage__account__action">
                        <a href="/account/manage" className='btn btn-dark me-5 mt-3'>Manage account</a> 
                        {getUseremail() === 'admin@gmail.com' ? <a href="/Admin" className='btn btn-dark mt-3'>Admin</a> : null}
                    </div>
                </div>
            </div>
        </Account>
     );
}
 
export default MyAccount;