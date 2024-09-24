import './Control.css'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Badge from '@mui/material/Badge';
import { Link } from 'react-router-dom';
import Cart from '../../Card/Cart/Cart';
import { useContext } from 'react';
import { WishItemsContext } from '../../../Context/WishItemsContext';
import { isAuthenticated } from '../../services/Auth';
import { getUserData,getUserName } from '../../services/Storage';
const Control = () => {
    const wishItems = useContext(WishItemsContext)
     
    return ( 
        <div className="control__bar__container">
            <div className="controls__container">
               {!isAuthenticated()? <div className="control">
                   <Link to="/account/login">
                        <PersonOutlineIcon color="black" size="large" sx={{ width: '35px'}}/>
                    </Link>
               </div>:null}

               {isAuthenticated()? <div className="control w-100">
                   <Link className='linktop' to="/account/me" style={{textDecoration:'non'}}>
                     {getUserName()}   
                    </Link>
               </div>:null}
                

                <div className="control">
                    <Link to="/wishlist">
                        <Badge badgeContent={wishItems.items.length} color="error">
                            <FavoriteBorderIcon  sx={{ width: '50px'}}/>
                        </Badge>
                    </Link>
                </div>
                <div className="control">
                    <Cart />
                </div>
                
            </div>
        </div>
     );
}
 
export default Control;