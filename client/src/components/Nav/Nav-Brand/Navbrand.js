import './NavBrand.css'
import { Link } from 'react-router-dom';
import logoImg from './logo.png'

const NavBrand = () => {
    return ( 
        <div href="#home" className='navbrand__container'>
           <h1 className='navbrand'>
               <Link to="/"><img src={logoImg} style={{height:'440px', marginLeft:'10%',  marginTop:'-41%'}}/></Link>
            </h1>
        </div>
     );
}
 
export default NavBrand;