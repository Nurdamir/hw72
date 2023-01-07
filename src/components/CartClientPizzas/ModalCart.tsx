import React from 'react';
import Modal from "../Modal/Modal";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {removeDish, resetCart, selectCartDishes, selectCreateOrderLoading} from "../../store/cartSlice";
import {DELIVERY_PRICE} from "../../constants";
import {createOrderDishes} from "../../store/cartThunks";
import ButtonSpinner from "../Spinner/ButtonSpinner";
import {Order} from "../../types";

interface Props {
  show: boolean;
  onClose: () => void;
}

const ModalCart: React.FC<Props> = ({show, onClose}) => {
  const dispatch = useAppDispatch();
  const cartDishes = useAppSelector(selectCartDishes);
  const createOrderLoading = useAppSelector(selectCreateOrderLoading);

  const total = cartDishes.reduce((sum, cartDish) => {
    return sum + cartDish.amount * cartDish.pizza.price;
  }, DELIVERY_PRICE);

  const removePizzaFromCart = (id: string) => {
    dispatch(removeDish(id));
  };

  const postOrder = async () => {

    const ordersList: Order = {};
    cartDishes.forEach(onePizza => {
      ordersList[onePizza.pizza.id] = onePizza.amount;
    });

    await dispatch(createOrderDishes(ordersList));
    await dispatch(resetCart());
    onClose();
  };

  return (
    <div>
      <Modal show={show} onClose={onClose}>
        <div className="modal-header">
          Your order:
        </div>
        <div>
          {cartDishes.map(onePizza => (
            <div key={onePizza.pizza.id} className="card p-3">
              <div className="text-center">
                <p>{onePizza.pizza.title} x {onePizza.amount}</p>
                <span>{onePizza.pizza.price * onePizza.amount} KGS</span>
              </div>
              <button className="btn btn-danger m-2" onClick={() => removePizzaFromCart(onePizza.pizza.id)}>Delete
              </button>
            </div>
          ))}
          <div className="p-3">
            <p><strong>Delivery:</strong> {DELIVERY_PRICE}</p>
            <p><strong>Total: </strong>{total}</p>
          </div>
        </div>
        <button
          className="btn btn-success m-2"
          onClick={postOrder}>
          {createOrderLoading ? <ButtonSpinner/> : "Order"}
        </button>
        <button
          className="btn btn-danger m-2"
          onClick={onClose}>Cancel
        </button>
      </Modal>
    </div>
  );
};

export default ModalCart;