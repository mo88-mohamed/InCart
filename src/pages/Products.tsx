import { useEffect, useState } from "react";
import MainLayout from "../Layout/MainLayout";
import { ICategory, IProducts } from "./Home";
import Card from "../components/Card";
import useFilter from "../hooks/useFilter";

const Proudcts = () => {
  const [data, setData] = useState<IProducts[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [Categories,setCategories] = useState<ICategory[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;
  const {searchQuery, setSearchQuery, category, setCategory} = useFilter();


  function filterUrl() {
    let url = '';
    if (searchQuery) {
      url += `&title=${searchQuery}`;
    }
    if (category) {
      url += `&categorySlug=${category}`;
    }
    return url;
  }
  const fetchCategories = async ()=> {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("https://api.escuelajs.co/api/v1/categories");
      if (!response.ok) throw new Error("Failed to fetch products");
      const products = await response.json();
      setCategories(products);
    } catch (err) {
      setError(err instanceof Error? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const offset = (currentPage - 1) * itemsPerPage;
        const url = `https://api.escuelajs.co/api/v1/products?offset=${offset}${filterUrl()}&limit=${itemsPerPage}`
        console.log(url);
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch products");
        const products = await response.json();
        setData(products);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    // fetchCategories();
  }, [searchQuery, currentPage,category]);

  useEffect(()=>{
    fetchCategories();
  },[])

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPaginationButtons = () => {
    const totalPages = 5; // For demo purposes, you might want to calculate this based on total items
    const buttons = [];

    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 mx-1 rounded-md ${
            currentPage === i
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          } transition-colors duration-300 ease-in-out`}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-6 flex justify-start space-x-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value={""}>All Categories</option>
            {
                Categories && Categories.map((category,index)=><option key={category.name} value={category.slug}>{category.name}</option>)
            }
            
            {/* <option value="">All Categories</option>
            <option value="1">Clothes</option>
            <option value="2">Electronics</option>
            <option value="3">Furniture</option>
            <option value="4">Shoes</option>
            <option value="5">Others</option> */}
          </select>
        </div>
        <div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {loading
            ? [...Array(8)].map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse w-full max-w-[300px] h-[420px] bg-white rounded-2xl shadow-sm transition-shadow duration-300 hover:shadow-md"
                >
                  <div className="w-full h-[200px] bg-gray-200 rounded-t-2xl" />
                  <div className="p-6 space-y-4">
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/4" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded" />
                      <div className="h-3 bg-gray-200 rounded w-5/6" />
                    </div>
                    <div className="h-10 bg-gray-200 rounded-full mt-4" />
                  </div>
                </div>
              ))
            : data.map((prod) => (
                <Card
                  key={prod.id}
                  id={prod.id}
                  title={prod.title}
                  price={prod.price}
                  discription={prod.description}
                  imgurl={prod.images[0]}
                />
              ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-8 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            } transition-colors duration-300 ease-in-out`}
          >
            Previous
          </button>
          {renderPaginationButtons()}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === 5} // Update this based on your total pages
            className={`px-4 py-2 rounded-md ${
              currentPage === 5
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            } transition-colors duration-300 ease-in-out`}
          >
            Next
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Proudcts;
