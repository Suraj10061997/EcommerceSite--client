import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import * as api from "../api";

export const addAnItem = createAsyncThunk("cart/addAnItem",async({toast,navigate,item},{rejectWithValue})=>{
    try{
        console.log("item",item);
        const response = await api.addAnItem(item);
        console.log("res",response.data);
        if(response.data.message){
            alert(response.data.message);
            navigate("/");
            return;
        }
        toast.success("Item Added Successfully");
        navigate("/cartPage");
        return response.data;
    }catch(err){
        return rejectWithValue(err.response.data);
    }
})
export const getAllAddedItems = createAsyncThunk("cart/getAllAddedItems",async(_,{rejectWithValue})=>{
    try{
        const response = await api.getAllAddedItems();
        return response.data;
    }catch(err){
        return rejectWithValue(err.response.data);
    }
})

const cartSlice = createSlice({
    name: "cart",
    initialState:{
        addedItems:[],
        addedItemsDuplicate:[],
        addedItem:{},
        loading:true,
        error:"",
    },
    reducers:{
        handleQuantity:(state,action)=>{
            state.addedItems=action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(addAnItem.pending,(state)=>{
            state.loading=true;
        })
        builder.addCase(addAnItem.fulfilled,(state,action)=>{
            state.loading=false;
            state.addedItem=action.payload;
            state.error="";
        })
        builder.addCase(addAnItem.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload.message;
            console.log(state.error);
        })
        builder.addCase(getAllAddedItems.pending,(state)=>{
            state.loading=true;
        })
        builder.addCase(getAllAddedItems.fulfilled,(state,action)=>{
            state.loading=false;
            state.addedItems=action.payload;
            state.addedItemsDuplicate=action.payload;
            state.error="";
        })
        builder.addCase(getAllAddedItems.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload.message;
        })
    }
})

export const {handleQuantity} = cartSlice.actions;
export default cartSlice.reducer;