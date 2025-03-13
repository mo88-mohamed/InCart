import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-lg space-y-4 md:space-y-6 text-center md:text-left">
              <p className="text-sm uppercase tracking-widest text-blue-600 font-semibold mb-2">BAG.KIDS</p>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">Black friday</h1>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore
              </p>
              <Link
                to="/shop"
                className="inline-block bg-blue-500 text-white px-8 md:px-10 py-3 md:py-4 rounded-lg uppercase font-bold hover:bg-amber-600 hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                SHOP NOW
              </Link>
            </div>
            <div className="relative flex-shrink-0 w-full md:w-auto">
              <div className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] mx-auto bg-gradient-to-br from-gray-100 to-white rounded-full flex items-center justify-center overflow-visible shadow-xl transform transition-transform duration-500">
                <img
                  src="/src/assets/headphonebaner.png"
                  alt="Product"
                  className="w-[95%] h-auto scale-110 md:scale-125 transform transition-transform duration-500 ease-in-out"
                />
              </div>
              <div className="absolute top-2 right-2 md:top-4 md:right-8 bg-blue-500 text-white rounded-full w-20 h-20 md:w-28 md:h-28 flex flex-col items-center justify-center transform hover:scale-110 transition-transform duration-300 shadow-lg animate-pulse">
                <span className="text-base md:text-lg font-bold">SALE</span>
                <span className="text-2xl md:text-3xl font-extrabold">50%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
