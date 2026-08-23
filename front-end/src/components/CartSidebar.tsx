import { Link } from "react-router-dom";
import { useCartStore } from "@store/useCartStore";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function parsePrice(value: unknown): number {
  if (value === null || value === undefined || value === "" || value === 0) return 0;
  if (typeof value === "number") return isNaN(value) ? 0 : value;

  let str = String(value).trim();
  if (!str) return 0;

  str = str.replace(/^[^\d,-]+/, "").trim();

  if (str.includes(".") && str.includes(",")) {
    if (str.lastIndexOf(".") < str.lastIndexOf(",")) {
      str = str.replace(/\./g, "").replace(",", ".");
    } else {
      str = str.replace(/,/g, "");
    }
  }
  else if (str.includes(",")) {
    if (/,\d{3}$/.test(str)) {
      str = str.replace(/,/g, "");
    } else {
      str = str.replace(",", ".");
    }
  }
  else if (str.includes(".")) {
    const parts = str.split(".");
    if (parts.length > 2 || /\.\d{3}$/.test(str)) {
      str = str.replace(/\./g, "");
    }
  }

  const cleaned = str.replace(/[^0-9.]/g, "");
  const result = parseFloat(cleaned);
  return isNaN(result) ? 0 : result;
}

function getProductPrice(rawItem: Record<string, unknown>): number {
  const productObj = rawItem.product as Record<string, unknown> | undefined;

  const candidates = [
    rawItem.discountPrice,
    rawItem.salePrice,
    rawItem.priceDiscount,
    productObj?.discountPrice,
    productObj?.salePrice,
    productObj?.priceDiscount,
    rawItem.price,
    productObj?.price,
  ];

  for (const cand of candidates) {
    const parsed = parsePrice(cand);
    if (parsed > 0) {
      return parsed;
    }
  }

  return 0;
}

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);

  const subtotal = items.reduce((acc, item) => {
    const raw = item as unknown as Record<string, unknown>;
    const price = getProductPrice(raw);

    const rawQuantity = item.quantity ?? raw.amount ?? 1;
    const quantity = typeof rawQuantity === "number" ? rawQuantity : Number(rawQuantity) || 1;

    return acc + price * quantity;
  }, 0);

  const formatCurrency = (value: number) => {
    const formatted = value.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
    return `Rs. ${formatted.replace(/,/g, ".")}`;
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 z-[998] transition-opacity duration-300"
      />

      <aside className="fixed top-0 right-0 z-[999] h-screen w-full sm:w-[417px] bg-white shadow-2xl flex flex-col justify-between p-[30px] font-poppins transition-all">
        <div className="flex flex-col h-full overflow-hidden">
          <div className="flex items-center justify-between pb-6">
            <h2 className="font-poppins font-semibold text-[24px] leading-tight text-black">
              Shopping Cart
            </h2>

            <button
              onClick={onClose}
              className="p-1 hover:opacity-75 transition-opacity focus:outline-none"
              title="Fechar carrinho"
            >
              <svg
                width="17"
                height="19"
                viewBox="0 0 17 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.5 5.5V4.5C4.5 2.29086 6.29086 0.5 8.5 0.5C10.7091 0.5 12.5 2.29086 12.5 4.5V5.5M2.5 5.5H14.5C15.6046 5.5 16.5 6.39543 16.5 7.5V16.5C16.5 17.6046 15.6046 18.5 14.5 18.5H2.5C1.39543 18.5 0.5 17.6046 0.5 16.5V7.5C0.5 6.39543 1.39543 5.5 2.5 5.5Z"
                  stroke="#9F9F9F"
                  strokeWidth="1.5"
                />
                <path
                  d="M6.5 10.5L10.5 14.5M10.5 10.5L6.5 14.5"
                  stroke="#9F9F9F"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div className="w-[287px] border-b border-[#D9D9D9] mb-6" />

          <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-5">
            {items.length === 0 ? (
              <p className="text-gray-400 text-sm py-4">Seu carrinho está vazio.</p>
            ) : (
              items.map((item) => {
                const raw = item as unknown as Record<string, unknown>;
                const productObj = raw.product as Record<string, unknown> | undefined;

                const price = getProductPrice(raw);

                const rawQuantity = item.quantity ?? raw.amount ?? 1;
                const quantity = typeof rawQuantity === "number" ? rawQuantity : Number(rawQuantity) || 1;

                const name = String(item.name ?? raw.title ?? productObj?.title ?? "Produto");
                const image = String(item.image ?? raw.imageUrl ?? productObj?.image ?? "");

                return (
                  <div key={item.id} className="flex items-center gap-4">
                    <img
                      src={image}
                      alt={name}
                      className="w-[105px] h-[105px] rounded-[10px] object-cover bg-[#F9F1E7] flex-shrink-0"
                    />

                    <div className="flex-1">
                      <h3 className="font-poppins text-base font-normal text-black mb-2 leading-snug">
                        {name}
                      </h3>
                      <div className="flex items-center gap-3 text-sm font-light">
                        <span className="text-black font-medium">{quantity}</span>
                        <span className="text-xs text-black">X</span>
                        <span className="text-[#B88E2F] font-medium">
                          {formatCurrency(price)}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => removeItem && removeItem(item.id)}
                      className="p-1 hover:opacity-75 transition-opacity"
                      title="Remover produto"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="9" cy="9" r="9" fill="#9F9F9F" />
                        <path
                          d="M6 6L12 12M12 6L6 12"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="pt-5">
          <div className="flex items-center justify-between font-poppins text-base mb-6">
            <span className="font-normal text-black">Subtotal</span>
            <span className="font-semibold text-[#B88E2F]">
              {formatCurrency(subtotal)}
            </span>
          </div>

          <div className="border-t border-[#D9D9D9] pt-6 flex items-center justify-start gap-3">
            <Link
              to="/cart"
              onClick={onClose}
              className="px-8 py-1.5 border border-black rounded-full text-xs font-normal text-black hover:bg-black hover:text-white transition-colors"
            >
              Cart
            </Link>

            <Link
              to="/checkout"
              onClick={onClose}
              className="px-8 py-1.5 border border-black rounded-full text-xs font-normal text-black hover:bg-black hover:text-white transition-colors"
            >
              Checkout
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}