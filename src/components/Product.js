import {toast} from "react-toastify";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import { addAnItem } from '../redux/features/cartSlice';
const Product = ({products}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {error} = useSelector(state=>({...state.cart}));
    const AddItem = (id) =>{
        const filteredItem = products.find((product)=>{
            if(product._id === id){
                return product;
            }
            return null;
        })
        const item = {
            ...filteredItem,
            totalQuantity:0,
            totalPrice:0,
        }
        console.log(item);
        dispatch(addAnItem({toast,navigate,item}));
    }
    useEffect(()=>{
        if(error){
            toast.error(error);
        }
    },[error])
    return (
        <div className="main-container">
            {products.length && products.map((product, index) => {
                return (
                    <div className="card" key={index}>
                        <div className="img-container">
                            <img className="product-img" src={product.images} alt={product.name} />
                        </div>
                        <div className="product-name-description-container">
                            <div style={{marginBottom:"0.5rem"}} className="product-name"><b>{product.name}</b></div>
                            <div className="product-description">{product.description}</div>
                            <div style={{marginTop:"0.5rem"}} className="product-name"><b>Rs: {product.price}</b></div>
                        </div>
                        <div>
                            <button className="add-button" onClick={()=>AddItem(product._id)}>Add</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Product