import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useEffect,useState } from 'react';
import './AdminHome.css'
import { useRef } from 'react';
import avatar from '../components/Nav/Nav-Brand/logo.png'
import { Link } from 'react-router-dom';



const AdminHome = () => {
    
    const inpref=useRef()


    const [Items,setdItems]=useState([])
    const [modelopen, setmodelopen]=useState(false)
    const [name, setname] = useState(''); 
    const [id, setid] = useState(''); 
        const [category, setcategory] = useState(''); 
        const [type, settype] = useState('');  
        const [description, setdescription] = useState('');    
        const [price, setprice] = useState(0);    
        const [size, setsize] = useState([]);  
        const [color, setcolor] = useState('');  
        const [highlights, sethighlights] = useState([]);
        const [file, setfile] = useState(); 
        const [file1, setfile1] = useState(); 
     const handleUpdate=(item)=>{
        setmodelopen(true)
        setid(item._id)
        setname(item.name)
        settype(item.type)
        setcategory(item.category)
        setdescription(item.description)
        setprice(item.price)
        setsize(item.size)
        setcolor(item.color)
        sethighlights(item.highlights[0])
        setfile(item.image)
        inpref.current.focus()
        console.log(file[0])

    }
    useEffect(() => {
        axios.get("https://vms-new.onrender.com/api/items")
            .then(res => {
                setdItems(res.data);
                console.log(res.data)})
            .catch(err => console.log(err))

        window.scrollTo(0, 0)
    }, [])


  const handledelete=async(id)=>{
     
    await axios.post("https://vms-new.onrender.com/delete/item",{_id:id})
    .then((res)=>{alert('deleted Success')})
    .catch((err)=>(console.log(err)))
  }

  const handlesubmit=async(e)=>{

    e.preventDefault();
                       
            const formdata=new FormData()
           
            if(file1!==undefined || file1!==""){
                formdata.append('images',file1)
                console.log(file1);
            }else{
            formdata.append('images',file)
            }
            formdata.append('name',name)
            formdata.append('category',category)
            formdata.append('type',type)
            formdata.append('description',description)
            formdata.append('price',price)
            formdata.append('size',size)
            formdata.append('color',color)
            formdata.append('highlights',highlights)
            formdata.append('_id',id)

            
          
            if(category==='men'){
                  
                  await axios.post(`https://vms-new.onrender.com/product/update/men`,formdata ,{
                  headers:{'Content-Type':"mutipart/form-data"}
                  })
                  .then((res)=>{
                   alert('Product Updated Success')
                   setmodelopen(false)
                  })
                  .catch((err)=>(console.log(err)))
         }else if(category==='women'){
            await axios.post(`https://vms-new.onrender.com/product/update/women`,formdata ,{
               headers:{'Content-Type':"mutipart/form-data"}
               })
               .then((res)=>{
                  alert('Product Updated Success')
                  setmodelopen(false)
               })
               .catch((err)=>(console.log(err)))
         }else{
           
            await axios.post(`https://vms-new.onrender.com/product/update/kids`,formdata ,{
               headers:{'Content-Type':"mutipart/form-data"}
               })
               .then((res)=>{
                  alert('Product Updated Success')
                  setmodelopen(false)
               })
               .catch((err)=>(console.log(err)))
         }

  }

 const handleclose=()=>{
    setmodelopen(false)
 }

 const [postImage, setPostImage] = useState( {myFile : ""})
 const handleFileUpload = async (e) => {
  setfile1(e.target.files[0])
  const file23 = e.target.files[0];
  const base64 = await convertToBase64(file23);
  console.log(base64)
  setPostImage({ ...postImage, myFile : base64 })
}



  return (

    <div>
        
       <div className='container1 pb-5'>
       <Link style={{ zIndex:'999', marginTop:'30vh'}} className='d-grid gap-2 text-center  m-3 mt-5' to="item/create">
        <center><button size="lg" className='btn btn-dark w-25 mt-5' style={{fontSize:'25px',  color:'lightseagreen'}}>Create Product</button></center>
      </Link>
        <table className='table1'>
            <thead>
                <h1 className='fs-1'>Product List</h1>
                <tr className='text' style={{backgroundColor:'lightgreen'}}>
                    <th> Id</th>
                    <th> name </th>
                    <th>Category</th>
                    <th>color</th>
                    <th> type</th>
                    <th>description</th>
                    <th>price</th>
                    <th>size</th>
                    <th> Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    Items && Items.length >0
                    ?
                    Items.map((Item) =>{
                        return(
                            <tr key={Item._id}>
                                <td>
                                    {Item._id}
                                </td>
                                <td>
                                    {Item.name}
                                </td>
                                <td>
                                    {Item.category}
                                </td>
                                <td>
                                    {Item.color}
                                </td>
                                <td>
                                    {Item.type}
                                </td>
                                <td>
                                    {Item.description}
                                </td>
                                <td>
                                    {Item.price}
                                </td>
                                <td>
                                    {Item.size[0]}
                                </td>
                                <td>
                                    <button className='btn btn-success' onClick={()=>handleUpdate(Item)} >Edit</button>
                                    &nbsp;
                                    <a>
                                    <button className='btn btn-danger' onClick={()=>handledelete(Item._id)}>DELETE</button>
                                    </a>


                                </td>

                            </tr>
                        )
                    }):null

                }
            </tbody>
        </table>
      <br>
      </br>
     
    </div>


    { modelopen && <div className='boxmodel' id='modeledit' style={{backgroundColor:'white'}}> 
       <form onSubmit={handlesubmit} className='forms'>
         <h1 className='fs-2 text-center text-success fs-1' style={{marginRight:'70%', marginTop:'-13%'}}>Edit Product </h1>
            <div className='d-flex flex-row fs-5' style={{marginTop:'3%'}}>
               <div style={{width:'200px'}}>Product Name</div> <div><input type='text' ref={inpref} className='form-control' value={name} onChange={(e)=>(setname(e.target.value))} /></div>
            </div>
            <div className='d-flex flex-row fs-5 ' style={{marginTop:'3%'}}>
               <div style={{width:'200px'}} >Category</div> <div><select className="custom-select" id="inputGroupSelect01" value={category} onChange={(e)=>(setcategory(e.target.value))}  >
                                                <option defaultValue='men' >Men</option>
                                                <option value="kids">Kids</option>
                                                <option value="women">Women</option>
                                             </select>
                                        </div>
            </div >
                  
                    <div className='d-flex flex-row fs-5' style={{marginTop:'3%'}}>
               <div style={{width:'200px'}} >Colors</div> <div><input type='text' value={color} className='form-control' onChange={(e)=>(setcolor(e.target.value))} /></div>
            </div>

            <div className='d-flex flex-row fs-5' style={{marginTop:'3%'}}>
               <div style={{width:'200px'}} >Type</div> <div><input type='text' className='form-control' value={type} onChange={(e)=>(settype(e.target.value))} /></div>
            </div>

            <div className='d-flex flex-row fs-5' style={{marginTop:'3%'}}>
               <div style={{width:'200px'}} >Description</div> <div><input type='text' className='form-control' value={description} onChange={(e)=>(setdescription(e.target.value))} /></div>
            </div>

            <div className='d-flex flex-row fs-5' style={{marginTop:'3%'}}>
               <div style={{width:'200px'}} >Price</div> <div><input type='text' className='form-control'  value={price}  onChange={(e)=>(setprice(e.target.value))} /></div>
            </div>

            <div className='d-flex flex-row fs-5' style={{marginTop:'3%'}}>
               <div style={{width:'200px'}} >Size</div> <div><input type='text' className='form-control'value={size} onChange={(e)=>(setsize(e.target.value))} /></div>
            </div>


            <div className='d-flex flex-row fs-5' style={{marginTop:'3%'}}>
                 <div style={{width:'200px'}}>Add Image</div> 
                 <div><input 
          type="file"
          lable="Image"
          name="myFile"
          id='file-upload'
          accept='.jpeg, .png, .jpg'
          onChange={(e) => handleFileUpload(e)}
         />               <label htmlFor="file-upload" className='custom-file-upload'>
         <img src={postImage.myFile || `https://vms-new.onrender.com/public/${category}/${file[0].filename}` } alt=""  />
         <p style={{width:'200px'}}>Click to change Image</p>
       </label>
       </div>
       </div>



             <div className='d-flex flex-row fs-5' style={{marginTop:'3%'}}>
               <div style={{width:'200px'}}>Highlights</div> <div><input type="checkbox"  name='high' value='black' aria-label="Checkbox for following text input" onChange={(e)=>(sethighlights(pre=>[...pre,e.target.value]))}/>Black
               <input type="checkbox" name='high' value='Green' className='ms-3' aria-label="Checkbox for following text input" onChange={(e)=>(sethighlights(pre=>[...pre,e.target.value]))}/>Green
               <input type="checkbox" name='high' value='Blue' className='ms-3' aria-label="Checkbox for following text input" onChange={(e)=>(sethighlights(pre=>[...pre,e.target.value]))}/>Blue
            </div>
            
            </div>
           <center> <button type='submit' className='btn btn-success mt-2 fs-6' style={{marginRight:'70%'}}>Update Product</button></center>
           <center> <button type='button' className='btn btn-success mt-2 fs-6' style={{marginRight:'70%'}} onClick={handleclose}>Close</button></center>
       </form>

  </div>

            }
     
    </div>
  )
}

export default AdminHome

function convertToBase64(file){
   return new Promise((resolve, reject) => {
     const fileReader = new FileReader();
     fileReader.readAsDataURL(file);
     fileReader.onload = () => {
       resolve(fileReader.result)
     };
     fileReader.onerror = (error) => {
       reject(error)
     }
   })
 }