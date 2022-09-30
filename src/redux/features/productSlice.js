import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import * as api from "../api";


export const getAllProducts = createAsyncThunk("product/getAllProducts",async(_,{rejectWithValue})=>{
    try{
        const response = await api.getAllProducts();
        return response.data;
    }catch(error){
        return rejectWithValue(error.response.data);
    }
})

const productSlice = createSlice({
    name:"product",
    initialState:{
        filteredItemsByCategory:[],
        filteredItemsByPrice:[],
        products:[],
        minPrice:null,
        maxPrice:null,
        error:"",
        loading:true,
    },
    reducers:{
        handlefilteredItemsByCategory:(state,action)=>{
            state.products=action.payload;
        },
        handlefilteredItemsByPrice:(state,action)=>{
            state.products=action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getAllProducts.pending,(state)=>{
            state.loading=true;
        })
        builder.addCase(getAllProducts.fulfilled,(state,action)=>{
            state.loading=false;
            state.products=action.payload;
            state.filteredItemsByCategory=action.payload;
            state.filteredItemsByPrice=action.payload;

            const priceArray = state.products.map((product)=>{
                return product.price;
            })
            state.minPrice=Math.min(...priceArray);
            state.maxPrice=Math.max(...priceArray);
            state.error="";
        })
        builder.addCase(getAllProducts.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload.message;
            console.log(state.error);
        })
    }
})

export const {handlefilteredItemsByCategory,handlefilteredItemsByPrice} = productSlice.actions;
export default productSlice.reducer;