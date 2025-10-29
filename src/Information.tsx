import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "./components/loading";
import { isMobile as detectMobile } from "react-device-detect";

interface LocationState {
  cart: number[];
}

const Information = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const state = location.state as LocationState | undefined;
  const cart = state?.cart || [];
  const [isLoading, setIsLoading] = useState(false);
  const [footer, setFooter] = useState("./footer.png");

  const getItemCount = (item: number) => {
    return cart.filter((i) => i === item).length;
  };

  const placeOrder = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      Swal.fire({
        title: "Đặt hàng thành công!",
        icon: "success",
        confirmButtonText: "Quay về trang chủ.",
        customClass: {
          title: "!text-lg !text-green-600",
          confirmButton:
            "!bg-[#EE6E24] hover:bg-blue-600 text-white px-4 py-2 rounded",
        },
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/");
        }
      });
    }, 1000);
  };

  useEffect(() => {
    setFooter(detectMobile ? "./footer-mobile.png" : "./footer.png");
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <div className="w-screen max-w-[100dvw] overflow-x-hidden h-screen bg-white flex flex-col items-center">
        <div className="w-[90%] lg:w-3/8 2xl:mt-8 flex flex-col gap-8 py-8">
          <Link to={"/"}>
            <img src="./icons/back.svg" alt="" />
          </Link>
          <div className="bg-radiant flex flex-col gap-4 p-4 2xl:p-4 lg:gap-8 rounded-2xl">
            <p className="text-[#EE6E24] font-bold text-2xl">
              THÔNG TIN ĐƠN HÀNG
            </p>
            <div className="flex items-center w-full lg:w-full lg:justify-between box-border">
              <div className="w-[90%]">
                <img src="./deal7.png" alt="" />
              </div>
              <p className="text-[#EE6E24] font-bold text-2xl 2xl:text-5xl ml-2">
                x{getItemCount(1)}
              </p>
            </div>
            <div className="flex items-center w-full lg:w-full text-2xl lg:justify-between box-border">
              <div className="w-[90%]">
                <img src="./deal5.png" alt="" />
              </div>
              <p className="text-[#EE6E24] font-bold 2xl:text-5xl ml-2">
                x{getItemCount(2)}
              </p>
            </div>
          </div>
          <div className="bg-radiant w-full flex flex-col text-center gap-4 p-4 2xl:p-10  rounded-2xl">
            <div className="flex items-center p-2">
              <label
                htmlFor="note"
                className="text-nowrap lg:text-xl font-bold mb-8 mr-4 lg:mr-6"
              >
                Ghi chú:
              </label>
              <textarea
                id="note"
                rows={2}
                className="w-[90%] bg-transparent border-none focus:outline-none resize-none 
                   [background-image:linear-gradient(to_bottom,transparent_95%,#d1d5db_95%)] 
                   [background-size:100%_50%] [background-repeat:repeat-y] leading-7 font-bold text-[#EE6E24] py-2"
              ></textarea>
            </div>
            <p className="text-[#EE6E24]">
              *Vui lòng kiểm tra kỹ thông tin cá nhân và thông tin đơn hàng
              trước khi đặt.
            </p>
          </div>
          <button
            onClick={placeOrder}
            className="w-3/5 mx-auto shadow-[inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.41)] bg-[#EE6E24] py-3 px-4 rounded-xl text-white font-bold cursor-pointer hover:bg-[#ff5100] hover:scale-105 transition-all"
          >
            ĐẶT HÀNG NGAY
          </button>
        </div>
        <section>
          <img src={footer} alt="" />
        </section>
      </div>
    </>
  );
};

export default Information;
