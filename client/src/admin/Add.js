import React , {useState}from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios'
import './add.css'
import avatar from '../components/Nav/Nav-Brand/logo.png'


function Add(props) {

        const [name, setname] = useState('');  
        const [category, setcategory] = useState('men'); 
        const [type, settype] = useState('');  
        const [description, setdescription] = useState('');    
        const [price, setprice] = useState(0);    
        const [size, setsize] = useState([]);  
        const [color, setcolor] = useState('');  
        const [highlights, sethighlights] = useState([]);
        const [file, setfile] = useState(); 
    
        const handlesubmit = async(e) =>{
            e.preventDefault();
                       
            const formdata=new FormData()
            formdata.append('images',file)
            formdata.append('name',name)
            formdata.append('category',category)
            formdata.append('type',type)
            formdata.append('description',description)
            formdata.append('price',price)
            formdata.append('size',size)
            formdata.append('color',color)
            formdata.append('highlights',highlights)

            console.log(file);
           
            if(category==='men'){
                  await axios.post(`https://vms-new.onrender.com/product/add/men`,formdata ,{
                  headers:{'Content-Type':"mutipart/form-data"}
                  })
                  .then((res)=>{
                   alert('Product Addedd Success')
                  })
                  .catch((err)=>(console.log(err)))
         }else if(category==='women'){
            await axios.post(`https://vms-new.onrender.com/product/add/women`,formdata ,{
               headers:{'Content-Type':"mutipart/form-data"}
               })
               .then((res)=>{
                  alert('Product Addedd Success')
               })
               .catch((err)=>(console.log(err)))
         }else{
            await axios.post(`https://vms-new.onrender.com/product/add/kids`,formdata ,{
               headers:{'Content-Type':"mutipart/form-data"}
               })
               .then((res)=>{
                  alert('Product Addedd Success')
               })
               .catch((err)=>(console.log(err)))
         }

        }

        const [postImage, setPostImage] = useState( {myFile : ""})
        const handleFileUpload = async (e) => {
         setfile(e.target.files[0])
         const file23 = e.target.files[0];
         const base64 = await convertToBase64(file23);
         console.log(base64)
         setPostImage({ ...postImage, myFile : base64 })
       }
     


        
  
  return(
      <div  className='box mt-5' style={{ height:'100%',
       width:'100%',  paddingLeft:'35%',  paddingBottom:'5%',  paddingBottom:'15px',
       fontSize:'17px' }}> 
       
         <form onSubmit={handlesubmit} className='pt-5'>
           <h1 className='fs-1  text-success mt-3 '>Add Product </h1>
              <div className='d-flex flex-row fs-5' style={{marginTop:'3%'}}>
                 <div style={{width:'200px'}}>Product Name</div> <div><input type='text' className='form-control' value={props.name} onChange={(e)=>(setname(e.target.value))} /></div>
              </div>
              <div className='d-flex flex-row fs-5' style={{marginTop:'3%'}}>
                 <div style={{width:'200px '}} >Category</div> <div><select className="custom-select" id="inputGroupSelect01" onChange={(e)=>(setcategory(e.target.value))}  >
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
                 <div style={{width:'200px'}} >Size</div> <div><input type='text' className='form-control'value={size} onChange={(e)=>(setsize(e.target.value))}/>  </div>
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
         <img src={postImage.myFile || avatar} alt=""  />
         <p style={{width:'200px'}}>Click to change Image</p>
       </label></div>
              {/* </div>
                 <div className='d-flex flex-row' style={{marginTop:'3%'}}>
                 <div style={{width:'200px'}}>Highlights</div> <div><input type="checkbox"  name='high' value='Black' aria-label="Checkbox for following text input" onChange={(e)=>(sethighlights(pre=>[...pre,e.target.value]))}/>Black
                 <input type="checkbox" name='high' value='Green' className='ms-3' aria-label="Checkbox for following text input" onChange={(e)=>(sethighlights(pre=>[...pre,e.target.value]))}/>Green
                 <input type="checkbox" name='high' value='Blue' className='ms-3' aria-label="Checkbox for following text input" onChange={(e)=>(sethighlights(pre=>[...pre,e.target.value]))}/>Blue
              </div> */}
              
              </div>
             <button type='submit' className='btn btn-success mt-3 mr-5 fs-5' style={{marginLeft:'15%'}}>Add Product</button>
             <button type='button'className='btn btn-success mt-3 fs-5' onClick={()=>{window.history.back()}} >Back</button>
         </form>
      
      
    </div>
)}


export default Add


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