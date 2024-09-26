import './NavBrand.css'
import { Link } from 'react-router-dom';
import logoImg from './logo.png'

const NavBrand = () => {
    return ( 
        <div href="#home" className='navbrand__container'>
           <h1 className='navbrand'>
               <Link to="/"><img src={logoImg} style={{width:'110px', marginLeft:'40%',  marginTop:'-33%'}}/></Link>
            </h1>
        </div>
     );
}
 
export default NavBrand;