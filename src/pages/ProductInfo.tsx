import { FaStar } from "react-icons/fa6";
import MainLayout from "../Layout/MainLayout";
import { useEffect, useState } from "react";
import { IProducts } from "./Home";
import { useParams } from "react-router-dom";


export const Product = () => {
    const {id} = useParams() 
    const [data,setData] = useState<IProducts>()
    // const [loading, setLoading] = useState<boolean>(true);
    // const [error, setError] = useState<string | null>(null); 

    const [itemsCount,setItemsCount] = useState<number>(1);
    const [mainImage,setMainImage] = useState<string | undefined>(data?.images[0]);
    useEffect(()=>{
         
        const fetchProducts = async () => {
            try {
              // setLoading(true);
              // setError(null);
              const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
              if (!response.ok) throw new Error("Failed to fetch products");
              const products : IProducts = await response.json();
            //   console.log(response);
              setData(products);
              setMainImage(products.images[0])
            } catch (err) {
              // setError(err instanceof Error ? err.message : "Something went wrong");
            } finally {
              // setLoading(false);
            }
          };
          fetchProducts();
    },[])
  return (
    <MainLayout>
      <div className="container max-w-7xl mx-auto grid md:grid-cols-2 grid-cols-1 px-4 md:px-10 py-12 gap-8 justify-items-center items-start">
        <div className="col-span-1 space-y-4">
          <div className="group relative overflow-hidden rounded-2xl bg-gray-50 h-96 w-full cursor-zoom-in">
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <img
              src={mainImage}
              alt="Product Image"
              className="w-full h-full object-contain p-4 transition-all duration-500 ease-out group-hover:scale-150 group-hover:rotate-1"
            />
          </div>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {data?.images.filter((image)=>image !== mainImage).map((variant) => (
              <button
                key={`${variant}`}
                className="w-20 h-20 rounded-xl cursor-pointer bg-gray-50 p-2 hover:bg-gray-100 transition-all duration-300 ring-2 ring-transparent hover:ring-blue-200 focus:ring-blue-500 focus:outline-none hover:shadow-lg hover:-translate-y-1"
                onClick={()=>{
                    setMainImage(variant)
                }}
              >
                <img
                  src={variant}
                  alt={`${variant} variant`}
                  className="w-full h-full object-contain transition-transform duration-300 hover:scale-110"
                />
              </button>
            ))}
          </div>
        </div>
        <div className="col-span-1 p-6 w-full space-y-6 bg-white rounded-2xl shadow-sm">
          <div className="space-y-4">
            <h1 className="font-bold text-4xl text-gray-900 tracking-tight leading-tight">{data?.title}</h1>
            <div className="rating flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((item) => (
                <FaStar
                  key={item}
                  className="text-xl text-blue-500 transition-all duration-300 hover:text-yellow-400 hover:scale-125 cursor-pointer"
                />
              ))}
              <p className="text-sm font-medium text-gray-500 ml-2">(5 Reviews)</p>
            </div>
            <p className="text-base leading-relaxed text-gray-600 tracking-wide">
              {data?.description}
            </p>
          </div>
          
          <div className="py-6 border-y border-gray-200">
            <div className="flex items-baseline text-blue-500 gap-1">
              <span className="text-2xl font-medium">$</span>
              <span className="text-4xl font-bold tracking-tight">{data?.price}</span>
            </div>
            <p className="text-sm text-gray-500">Free shipping on all continental US orders.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="flex items-center rounded-full bg-gray-100 overflow-hidden w-fit shadow-sm hover:shadow-md transition-all duration-300">
              <button 
                className="px-5 py-4 text-lg font-medium hover:bg-gray-200 transition-colors duration-300 active:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed" 
                onClick={()=>{if(itemsCount > 1 )setItemsCount((prev)=>prev-1)}}
                disabled={itemsCount <= 1}
              >
                -
              </button>
              <span className="px-6 py-4 text-lg font-medium min-w-[4rem] text-center">{itemsCount}</span>
              <button 
                className="px-5 py-4 text-lg font-medium hover:bg-gray-200 transition-colors duration-300 active:bg-gray-300"
                onClick={()=>{setItemsCount((prev)=>prev+1)}}
              >
                +
              </button>
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-medium text-lg rounded-full px-12 py-4 transition-all duration-300 flex-grow sm:flex-grow-0 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
