import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="builder-footer box-border flex relative flex-col shrink-0 self-stretch px-5 pt-8 pb-10 w-screen text-white bg-blue-400 min-h-[383px] ml-[calc(50% - 50vw)] max-sm:pt-5">
      <section className="builder-footer box-border flex relative flex-col grow shrink-0 self-stretch px-5 pt-8 pb-10 mx-auto w-full text-white bg-blue-400 max-w-[1200px] min-h-[383px] max-sm:pt-5">
        <div className="box-border flex relative flex-col shrink-0 mx-auto mt-5 w-full max-w-[1200px]">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {/* Column 1 */}
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold text-white mb-5">
                Công ty cổ phần <br className="max-md:hidden" /> Wecare Group
              </h2>
              <p className="text-white pb-3">
                Trụ sở: Lô B39 KCN Phú Tài, Trần Quang Diệu, Quy Nhơn, Bình Định
              </p>
              <p className="text-white pb-3">Email: supportwecare@gmail.com</p>
              <p className="text-white pb-3">Phone: +84 378 339 009</p>
            </div>
            {/* Column 2 */}
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold text-white mb-5">
                Ngành hàng
              </h2>
              <p className="text-white pb-3">Kim khí phụ kiện</p>
              <p className="text-white pb-3">Bao bì</p>
              <p className="text-white pb-3">Hoá chất</p>
              <p className="text-white pb-3">Vật tư tiêu hao</p>
              <p className="text-white pb-3">Công cụ - dụng cụ</p>
              <p className="text-white pb-3">Phụ tùng thay thế</p>
            </div>
            {/* Column 3 */}
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold text-white mb-5">
                Chính sách
              </h2>
              <p className="text-white pb-3">Hướng dẫn mua hàng</p>
              <p className="text-white pb-3">Hình thức thanh toán</p>
              <p className="text-white pb-3">Chính sách giao hàng</p>
              <p className="text-white pb-3">Chính sách bảo hành đổi trả</p>
              <p className="text-white pb-3">Chính sách bảo mật thông tin</p>
            </div>
            {/* Column 4 */}
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold text-white mb-5">WECARE</h2>
              <p className="text-white pb-3">
                Cung cấp giải pháp cung ứng toàn diện về vật tư, nguyên vật
                liệu, phụ kiện, phụ trợ cho các nhà máy, ngành công nghiệp.
              </p>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
