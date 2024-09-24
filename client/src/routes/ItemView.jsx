import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ReactLoading from 'react-loading';
import Item from '../components/Item/Item';

const ProductView = (props) => {
    const [data, setdata] = useState()
    const param = useParams()
    
    var it=[];
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        window.scrollTo(0, 0)
        console.log(param.id)

         axios.get("http://localhost:5000/api/items")
            .then(res => {
                console.log(res.data)
               it=(res.data.filter((item1) => item1._id === param.id))
                console.log(data)
                setLoading(false)
            })
            .catch(err => console.log(err))
    },[param.id])
    
    return (
            <div className="d-flex min-vh-100 w-100 justify-content-center align-items-center m-auto">
                {loading && <ReactLoading type="balls" color='#FFE26E' height={100} width={100} className='m-auto'/>}
                {data && <Item item={data}/>}
            </div>
     );
}
 
export default ProductView;