import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";
import IcartItem from "./IcartItem";

type Props = {
  id: number;
  title: string;
  price: number;
  discription: string;
  imgurl: string;
};
export const Card = ({
  id,
  title,
  discription,
  price,
  imgurl,
}: Props) => {
  const navigate = useNavigate();
  const {addToCart} = useCart();
  const cartItem: IcartItem = {
    id: id,
    title: title,
    price: price,
    quantity: 1,
    image: imgurl
  };
  return (
    <div onClick={()=>{navigate(`/Product/${id}`)}} className="shadow-sm cursor-pointer rounded-2xl w-[250px] h-[400px] transition-all duration-300 hover:shadow-xl hover:scale-[1.02] bg-white">
      <div className="w-[100%] h-[150px] bg-gray-50 rounded-t-2xl overflow-hidden group relative">
        <div className="absolute inset-0 bg-gray-100 animate-pulse transition-opacity duration-300 opacity-100 group-hover:opacity-0" />
        <img
          src={imgurl || "/src/assets/headphone1.png"}
          className="h-[150px] w-full object-cover transition-all duration-500 transform group-hover:scale-110"
          alt={title}
          onLoad={(e) => {
            const target = e.target as HTMLImageElement;
            target.parentElement?.querySelector('.animate-pulse')?.classList.add('opacity-0');
          }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/src/assets/headphone1.png";
          }}
        />
      </div>
      <div className="px-5 py-6 h-[250px] box-border flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg truncate flex-1 pr-3 text-gray-800">{title}</h3>
            <div className="flex items-start">
              <span className="text-sm font-medium text-blue-600">$</span>
              <span className="text-lg font-bold text-blue-600">{price.toString()}</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
            {discription}
          </p>
          <div className="rating flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((item) => (
              <FaStar key={item} className="text-sm text-blue-500 transition-colors hover:text-blue-600 cursor-pointer" />
            ))}
            <p className="text-xs text-gray-500 ml-1.5">(5)</p>
          </div>
        </div>

        <div className="mt-5">
          <button onClick={(e)=>{e.stopPropagation() ;addToCart(cartItem)}} className="w-full cursor-pointer px-4 py-2.5 bg-blue-500 text-white rounded-full font-medium transition-all duration-300 hover:bg-blue-600 hover:shadow-lg active:scale-95 text-sm">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
