import axios from 'axios';
import Account from '../Account';
import './ManageAccount.css'
import { useEffect, useState } from 'react';
import { getUserData,storeUserData } from '../../services/Storage';
import { logout } from '../../services/Auth';
import { useNavigate } from 'react-router-dom';
const ManageAccount = () => {
    const navigate=useNavigate()
    const userid=getUserData()
    const [userdata,setuserdata]=useState([])

    const [fname,setfname]=useState('')
    const [lname,setlname]=useState('')
    useEffect(()=>{
          async function updatefunction(){
            await axios.post('http://localhost:5000/updateuser',{userid})
            .then((res)=>setuserdata(res.data))
            .catch(err=>console.log(err))
          }
          updatefunction()
    },[])

    const handleupdate=async()=>{
        if(fname==='' || lname===''){
            alert('Change first name and last name before save click')
        }else{
        await axios.post('http://localhost:5000/updateuserdata',{userid,fname,lname})
        .then((res)=>{
            storeUserData(res.data);
            alert('updated success')})
            setfname('')
            setlname('')
        .catch(err=>console.log(err))
    }
    }

    const handledelete=async()=>{
        await axios.post('http://localhost:5000/updateuserdelete',{userid})
       .then((res)=>{
        logout()
        
        alert('User Deleted')
        navigate('/')
        window.location.reload(false)
       })
       .catch(err=>console.log(err))
    }

    

    return ( 
        <Account> 
            <div className="manage__account__container">
                <div className="edit__account__container">
                    <div className="edit__account">
                        <div className="edit__account__header">Edit account</div>
                        <div className="edit__account__form__container">
                            <div className="edit__account__form">
                                <div className="fname__input__container edit__input__container">
                                    <label className="fname__label input__label">First name ({userdata && userdata.firstname})</label>
                                    <input type="text" className="fname__input edit__account__input" value={fname} onChange={(e)=>setfname(e.target.value)}  />
                                </div>
                                <div className="lname__input__container edit__input__container">
                                    <label className="lname__label input__label">Last name({userdata && userdata.lastname})</label>
                                    <input type="text" className="lname__input edit__account__input" value={lname} onChange={(e)=>setlname(e.target.value)} />
                                </div>
                                <div className="save__changes__button__container">
                                    <button className="save__changes__button" onClick={handleupdate} >Save Changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="separator__line"></div>
                <div className="delete_account__container">
                    <div className="delete__account">
                        <div className="delete__account__header">
                            Delete account
                        </div>
                        <div className="delete__account__prompt">Do you want to cancel subscription?</div>
                        <div className="delete__account__button__container">
                            <button className="delete__account__button" onClick={handledelete} >Delete Account</button>
                        </div>
                    </div>
                </div>
            </div>
        </Account>
     );
}
 
export default ManageAccount;