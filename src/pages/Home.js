import "./Home.css";

import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, handlefilteredItemsByCategory, handlefilteredItemsByPrice } from '../redux/features/productSlice';

import Product from "../components/Product";
const Home = () => {
    const dispatch = useDispatch();
    const { products, filteredItemsByCategory, filteredItemsByPrice, loading, error, minPrice, maxPrice } = useSelector(state => ({ ...state.product }));
    const [price, setPrice] = useState(minPrice);
    useEffect(() => {
        if (error) {
            toast.error(error);
        }
        dispatch(getAllProducts());
        // eslint-disable-next-line
    }, [error])

    //filter by category
    const filterByCategory = (e) => {
        if (e.target.value.toLowerCase() === "all") {
            const container = filteredItemsByCategory.filter((product) => {
                if (product.price >= minPrice && product.price <= price) {
                    return product;
                }
                return null;
            })
            dispatch(handlefilteredItemsByCategory(container));
            toast.success("Items found")
        } else {
            const container = filteredItemsByCategory.filter((product) => {
                if (product.category.toLowerCase() === e.target.value.toLowerCase() && product.price >= minPrice && product.price <= price) {
                    return product;
                }
                return null;
            })
            if(container.length === 0){
                return toast.error("No items found")
            }
            dispatch(handlefilteredItemsByCategory(container));
            toast.success("Items found")
        }
    }

    //filter by price
    const filterByPrice = (e) => {
        setPrice(e.target.value);
        const container = filteredItemsByPrice.filter((product) => {
            if (product.price >= minPrice && product.price <= e.target.value) {
                return product;
            }
            return null;
        })
        dispatch(handlefilteredItemsByPrice(container))

    }

    if (loading) return <h1>Loading...</h1>
    if (products.length === 0) return <h1>No Products Found</h1>
    return (
        <div>
            <div className="filter-section">
                
                <span>
                <span>Filter By Category:</span>
                    <select onChange={filterByCategory}>
                        <option value="all">All</option>
                        <option value="electronics">Electronics</option>
                        <option value="headphones">Headphones</option>
                        <option value="accessories">Accessories</option>
                        <option value="Cameras">Cameras</option>
                        <option value="Laptops">Laptops</option>
                    </select>
                </span>
                
                <span>
                <span>Filter By price:</span>
                    <input
                        type="range"
                        onChange={filterByPrice}
                        min={minPrice}
                        max={maxPrice}
                    />
                </span>
                <span style={{color:"white" ,fontSize:"1.3rem"}}>
                    {price === null ?<b>Rs:  0</b>:<b>{`Rs:  ${price}`}</b>}
                </span>
            </div>
            <Product products={products} />
        </div>
    )
}

export default Home