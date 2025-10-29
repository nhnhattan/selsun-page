import { Link, Outlet } from "react-router-dom";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { isMobile as detectMobile } from "react-device-detect";
import Loading from "./components/loading";

function App() {
  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    owner: "",
    nameStore: "",
  });

  const [cart, setCart] = useState<number[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isPhone, setIsPhone] = useState("");
  const [heading, setHeading] = useState("./heading.png");
  const [banner, setBanner] = useState("./banner.png");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const debounceRef: any = useRef(null);
  const informationSectionRef = useRef<HTMLImageElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePhoneChange = (e: any) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) return;

    setFormData((prev) => ({
      ...prev,
      phone: value,
      address: "",
      owner: "",
      nameStore: "",
    }));

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      if (value.length === 10 || value.length === 11) {
        setIsLoading(true);
        toast.loading("Đang tra cứu thông tin...", { id: "loading" });

        setTimeout(() => {
          toast.dismiss("loading");
          toast.success("Lấy thông tin thành công!");

          setFormData({
            phone: value,
            address: "123 Đường ABC, Quận 1, TP.HCM",
            owner: "Nguyễn Văn A",
            nameStore: "Nhà thuốc ABC",
          });

          setIsPhone(value);
          console.log(isPhone);

          setIsLoading(false);
          localStorage.setItem(
            "formData",
            JSON.stringify({
              phone: value,
              address: "123 Đường ABC, Quận 1, TP.HCM",
              owner: "Nguyễn Văn A",
              nameStore: "Nhà thuốc ABC",
            })
          );
        }, 1500);
      } else {
        setIsPhone("");
        setFormData((prev) => ({
          ...prev,
          address: "",
          owner: "",
          nameStore: "",
        }));
        localStorage.clear()
      }
    }, 500);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addToCart = (item: number) => {
    const count = cart.filter((i) => i === item).length;
    toast.success("Thêm đơn hàng thành công");

    if (count >= 3) {
      toast.error(`Đơn hàng đạt số lượng tối đa!`);
      return;
    }

    setCart((prevCart) => [...prevCart, item]);
  };

  const getItemCount = (item: number) => {
    return cart.filter((i) => i === item).length;
  };

  const scrollToInformationSection = () => {
    if (informationSectionRef.current) {
      informationSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleAddToCart = (item: number) => {
    if (!isPhone) {
      toast.error("Bạn chưa nhập số điện thoại");
      setTimeout(scrollToInformationSection, 100);
    } else {
      addToCart(item);
    }
  };

  const handleCheckOrder = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isPhone) {
      toast.error("Bạn chưa nhập số điện thoại!");
      setTimeout(scrollToInformationSection, 100);
      e.preventDefault();
      return;
    }

    if (cart.length === 0) {
      toast.error("Bạn chưa thêm đơn hàng!");
      e.preventDefault();
      return;
    }
  };


  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData);
      if (parsedData.phone) setIsPhone(parsedData.phone);
    }

    setHeading(detectMobile ? "./heading-mobile.png" : "./heading.png");
    setBanner(detectMobile ? "./banner-mobile.png" : "./banner.png");
  }, []);

  return (
    <>
      {isLoading ? <Loading /> : <></>}
      <div className="w-screen h-screen overflow-x-hidden flex flex-col gap-4 items-center scroll-smooth relative box-border">
        <header className="w-full flex flex-col gap-2 items-center justify-center">
          <img src={heading} alt="" className="w-full" draggable={false} />
          <img
            src={banner}
            alt=""
            className="w-[98%]"
            draggable={false}
            ref={informationSectionRef}
          />
        </header>

        <section className="2xl:w-2/5 w-[80%] bg-radiant flex flex-col items-center justify-center rounded-2xl p-6 gap-4 shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.25)]">
          <h1 className="text-[#F47920] text-xl lg:text-2xl uppercase font-bold">
            Thông tin cá nhân
          </h1>
          <div className="grid grid-cols-1 gap-6 lg:gap-0 lg:grid-cols-2 w-full text-center">
            <div className="col-span-1 flex flex-col gap-2 items-center justify-center lg:mb-4 ">
              <label
                htmlFor="phone"
                className="text-[#F47920] lg:text-lg uppercase font-bold"
              >
                SỐ ĐIỆN THOẠI
              </label>
              <div className="w-7/8 lg:w-6/8 bg-white py-2 lg:py-4  px-8 rounded-xl shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.25)]">
                <input
                  type="text"
                  id="phone-input"
                  className="block text-center  pe-0  w-full text-sm text-gray-900 bg-transparent border-0 border-b-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#FF6004] peer"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  placeholder=" "
                  name="phone"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="col-span-1 flex flex-col gap-2 items-center justify-center lg:mb-4">
              <label
                htmlFor="address"
                className="text-[#F47920] lg:text-lg uppercase font-bold"
              >
                ĐỊA CHỈ NHÀ THUỐC
              </label>
              <div className="w-7/8 lg:w-6/8 bg-white py-2 lg:py-4 px-8 rounded-xl shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.25)]">
                <input
                  type="text"
                  id="address-input"
                  className="block text-center pe-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#FF6004] peer"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  placeholder=""
                  name="address"
                  value={formData.address}
                  readOnly
                  disabled
                />
              </div>
              {!isPhone && (
                <p className="text-sm text-red-500 font-bold">
                  *Bạn chưa nhập số điện thoại
                </p>
              )}
            </div>
            <div className="col-span-1 flex flex-col gap-2 items-center justify-center">
              <label
                htmlFor="owner"
                className="text-[#F47920] lg:text-lg uppercase font-bold"
              >
                CHỦ NHÀ THUỐC
              </label>
              <div className="w-7/8 lg:w-6/8 bg-white py-2 lg:py-4 px-8 rounded-xl shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.25)]">
                <input
                  type="text"
                  id="owner-input"
                  className="block text-center pe-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#FF6004] peer"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  placeholder=""
                  name="owner"
                  value={formData.owner}
                  readOnly
                  disabled
                />
              </div>
              {!isPhone && (
                <p className="text-sm text-red-500 font-bold">
                  *Bạn chưa nhập số điện thoại
                </p>
              )}
            </div>
            <div className="col-span-1 flex flex-col gap-2 items-center justify-center">
              <label
                htmlFor="name-store"
                className="text-[#F47920] lg:text-lg uppercase font-bold"
              >
                TÊN NHÀ THUỐC
              </label>
              <div className="w-7/8 lg:w-6/8 bg-white py-2 lg:py-4  px-8 rounded-xl shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.25)]">
                <input
                  type="text"
                  id="name-store-input"
                  className="block text-center pe-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#FF6004] peer"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  placeholder=""
                  name="name-store"
                  value={formData.nameStore}
                  readOnly
                  disabled
                />
              </div>
              {!isPhone && (
                <p className="text-sm text-red-500 font-bold">
                  *Bạn chưa nhập số điện thoại
                </p>
              )}
            </div>
          </div>
          <p className="w-full text-justify text-sm lg:text-base lg:w-[92%] lg:text-center mt-4 text-[#F47920] font-bold">
            * Vui lòng điền đúng số điện thoại đã nhận thông tin này để thực
            hiện đặt đơn hàng, hệ thống sẽ tự động điền các thông tin còn lại.
          </p>
        </section>

        <section className="w-4/5 grid grid-cols-1 gap-10 lg:grid-cols-2 2xl:gap-40">
          <div className="col-span-1 flex flex-col gap-4">
            <img src="./deal-1.png" alt="" className="w-full" />
            <p className="text-[#EE6E24] text-sm lg:text-base font-bold">
              *Tối đa 3 đơn hàng
            </p>
            <div className="flex lg:gap-0 items-center">
              <button
                onClick={() => handleAddToCart(1)}
                className="shadow-[inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.41)] bg-[#EE6E24] py-3 px-3 text-sm text-nowrap lg:text-base rounded-xl text-white font-bold cursor-pointer hover:bg-[#ff5100] hover:scale-105 transition-all"
              >
                Thêm vào giỏ hàng
              </button>
              <button className="ml-2 lg:ml-4  lg:block hover:scale-110 transition-all">
                <img src="./icons/cart.svg" alt="" className="w-3/6 lg:w-4/6" />
              </button>
              <p className="text-[#F47920] lg:text-lg uppercase font-bold">
                {getItemCount(1)}/3 đơn
              </p>
            </div>
          </div>
          <div className="col-span-1 flex flex-col gap-4">
            <img src="./deal-2.png" alt="" className="w-full" />
            <p className="text-[#EE6E24] text-sm lg:text-base  font-bold">
              *Tối đa 3 đơn hàng
            </p>
            <div className="flex  gap-0 items-center">
              <button
                onClick={() => handleAddToCart(2)}
                className="shadow-[inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.41)] bg-[#EE6E24] py-3 px-3 text-sm text-nowrap lg:text-base rounded-xl text-white font-bold cursor-pointer hover:bg-[#ff5100] hover:scale-105 transition-all"
              >
                Thêm vào giỏ hàng
              </button>
              <button className="ml-2 lg:ml-4 lg:block hover:scale-110 transition-all">
                <img src="./icons/cart.svg" alt="" className="w-3/6 lg:w-4/6" />
              </button>
              <p className="text-[#F47920] lg:text-lg uppercase font-bold">
                {getItemCount(2)}/3 đơn
              </p>
            </div>
          </div>
        </section>
        <section className="min-h-[10vh]"></section>
        <div className="fixed bottom-0 flex items-center justify-around bg-[#FFE8CD] lg:border-t-3 lg:border-l-3 lg:border-r-3 border-white 2xl:w-2/6 w-full border-0 lg:w-4/6 rounded-t-lg 2xl:py-4 py-4 2xl:px-8 px-2 shadow-[-3px_4px_5.7px_0px_rgba(0,_0,_0,_0.25)]">
          <div className="relative w-1/10">
            <img src="./icons/bag.svg" alt="" className="w-full" />
            <div className="cursor-default flex items-center justify-center text-[.6rem] text-center p-0 bg-red-600 rounded-[50%] w-[20px] h-[20px] text-white font-bold absolute -top-[45%] -right-[45%] lg:-top-[20%] lg:-right-[25%]">
              {cart.length}
            </div>
          </div>
          <p className="2xl:text-base text-sm text-[#EE6E24] hidden lg:flex items-end">
            SỐ LƯỢNG:{" "}
            <span className="2xl:text-xl font-bold ml-2">
              {cart.length} ĐƠN
            </span>
          </p>
          <Link
            onClick={handleCheckOrder}
            state={{ cart }}
            to="/information"
            className="shadow-[inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.41)] bg-[#EE6E24] 2xl:py-3 py-2 2xl:px-4 px-3 rounded-xl text-white font-bold text-sm cursor-pointer hover:bg-[#ff5100] hover:scale-105 transition-all"
          >
            KIỂM TRA ĐƠN HÀNG
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default App;
