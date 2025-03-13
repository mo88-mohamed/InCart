import { useContext } from "react"
import FilterContext from "../context/FilterContext"

const useFilter = () =>{
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    const {searchQuery,setSearchQuery,category,setCategory} = context;
    return{searchQuery,setSearchQuery,category,setCategory}
}

export default useFilter