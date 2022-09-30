import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAddedItems, handleQuantity } from '../redux/features/cartSlice';
import "./Cart.css";

const Cart = () => {
    const dispatch = useDispatch();
    const { addedItems } = useSelector(state => ({ ...state.cart }));
    let [grandTotalPrice, setGrandTotalPrice] = useState(0);
    useEffect(() => {
        dispatch(getAllAddedItems());
        // eslint-disable-next-line
    }, [])

    const Increment = (id) => {
        console.log(id);
        const container = addedItems.map(product => {
            if (product._id === id) {
                if (Number(product.totalQuantity) >= 0) {
                    setGrandTotalPrice(grandTotalPrice + product.price);
                    return { ...product, totalQuantity: product.totalQuantity + 1, totalPrice: product.totalPrice + product.price };
                }
                setGrandTotalPrice(0);
                return { ...product, totalQuantity: 0, totalPrice: 0 };
            }
            return product;
        });
        dispatch(handleQuantity(container));
        console.log(container);
    }
    const Decrement = (id) => {
        console.log(id);
        const container = addedItems.map(product => {
            if (product._id === id) {
                if (Number(product.totalQuantity) > 0) {
                    setGrandTotalPrice(grandTotalPrice - product.price);
                    return { ...product, totalQuantity: product.totalQuantity - 1, totalPrice: product.totalPrice - product.price };
                }
                setGrandTotalPrice(0);
                return { ...product, totalQuantity: 0, totalPrice: 0 };
            }
            return product;
        });
        dispatch(handleQuantity(container));
        console.log(container);
    }
    return (
        <div className="main-container2">
            <h1>GrandTotal Price:{grandTotalPrice}</h1>
            {addedItems.length && addedItems.map((product, index) => {
                return (

                    <div className="card2" key={index}>
                        <div className="img-container2">
                            <img className="product-img2" src={product.images} alt={product.name} />
                        </div>
                        <div className="product-name-description-container2">
                        <div style={{marginBottom:"0.5rem"}} className="product-name"><b>{product.name}</b></div>
                            <div className="product-description">{product.description}</div>
                            <div style={{marginTop:"0.5rem"}} className="product-name"><b>Rs: {product.price}</b></div>
                        </div>
                        <div className='increment-decrement-section'>
                            <button className="add-button2" onClick={() => Increment(product._id)}>+</button>
                            <p>{product.totalQuantity}</p>
                            <button className="add-button2" onClick={() => Decrement(product._id)}>-</button>
                        </div>
                        <div className='price-handle-section'>
                            <div><p>Total Price</p></div>
                            <div>{product.totalPrice}</div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Cart