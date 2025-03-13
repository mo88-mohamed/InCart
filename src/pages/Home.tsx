import { useEffect, useState } from "react";
import Card from "../components/Card";
import Header from "../components/Header";
import MainLayout from "../Layout/MainLayout";

export interface ICategory {
  id: number;
  name: string;
  slug:string;
  images: string;
}
export interface IProducts {
  id: number;
  title: string;
  price: number;
  description: string;
  category: ICategory;
  images: string[];
}

const Home = () => {
  const [data, setData] = useState<IProducts[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("https://api.escuelajs.co/api/v1/products?offset=0&limit=10");
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
  }, []);

  return (
    <MainLayout>
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight transition-colors hover:text-blue-600">
          What's New
        </h1>
        {error && (
          <div className="text-red-500 bg-red-50 p-4 rounded-lg mb-6 border border-red-100 shadow-sm transition-all duration-300 hover:shadow-md">
            {error}
          </div>
        )}
        <div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {loading ? (
            [...Array(8)].map((_, index) => (
              <div key={index} className="animate-pulse w-full max-w-[300px] h-[420px] bg-white rounded-2xl shadow-sm transition-shadow duration-300 hover:shadow-md">
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
          ) : (
            data.map((prod) => (
              <Card
                key={prod.id}
                id={prod.id}
                title={prod.title}
                price={prod.price}
                discription={prod.description}
                imgurl={prod.images[0]}
              />
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
