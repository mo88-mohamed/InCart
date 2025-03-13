import { createContext, useState } from "react";

export interface IFilter {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}
const FilterContext = createContext<IFilter | null>(null);

export const FilterProvider = ({children}:any) =>{
    const [searchQuery, setSearchQuery] = useState<IFilter['searchQuery']>('');
    const [category, setCategory] = useState('');
    return(
    <FilterContext.Provider value={{searchQuery,setSearchQuery,category,setCategory}}>
        {children}
    </FilterContext.Provider>
    );
}

export default FilterContext;