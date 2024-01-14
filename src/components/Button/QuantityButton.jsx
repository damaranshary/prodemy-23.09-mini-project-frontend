import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../store/slices/cartSlice";

const QuantityButton = ({ productId, quantity }) => {
  const dispatch = useDispatch();

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setQty(event.target.value);
    }
  };

  const handleClick = (operation) => {
    let qty = quantity;
    if (operation == "+") {
      qty += 1;
    } else if (operation == "-") {
      if (qty == 0) {
        qty = 0;
      } else {
        qty -= 1;
      }
    }
    const payload = {
      qty: qty,
      id: productId,
    };

    if (qty === 0) {
      dispatch(removeFromCart(productId));
      return;
    }

    dispatch(addToCart(payload));
  };

  return (
    <>
      <div className="flex w-fit items-center gap-1">
        <button onClick={() => handleClick("-")}>-</button>
        <input
          className="w-12 rounded-lg border-2 border-slate-200 text-center text-sm"
          type="text"
          onKeyDown={handleKeyDown}
          value={quantity}
          onChange={(event) => event.target.value}
        />
        <button onClick={() => handleClick("+")}>+</button>
      </div>
    </>
  );
};

export default QuantityButton;
