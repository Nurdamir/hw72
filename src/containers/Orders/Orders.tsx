import React, {ReactElement, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {getOrders, removeOrder} from "../../store/pizzasThunks";
import {removeOrderFromList, selectOrders, selectOrdersLoading} from "../../store/pizzasSlice";
import {DELIVERY_PRICE} from "../../constants";
import Spinner from "../../components/Spinner/Spinner";


const Orders = () => {

  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrders);
  const ordersLoading = useAppSelector(selectOrdersLoading);

  useEffect(() => {
    (async () => {
      await dispatch(getOrders());
    })();
  }, [dispatch]);

  const onRemove = async (id: string) => {
    await dispatch(removeOrder(id));
    await dispatch(removeOrderFromList(id))
  };

  let content: ReactElement[] | ReactElement = (
    <p className="fs-3 fw-bold">There are no orders yet!</p>
  );

  if (orders.length > 0) {
    content = (
      orders.map(item => (
        <div className="card mb-3 p-3" key={Math.random()}>
          <div>{item.orderDishes.map(itemOrder => (
            <div key={Math.random()}>
              <span className="m-2"><strong>Title:</strong> {itemOrder.title}</span>
              <span className="m-2">X {itemOrder.amount}</span>
              <span className="m-2"><strong>Price:</strong> {itemOrder.price} KGS</span>
              {<div>Total: {(itemOrder.price * itemOrder.amount) + DELIVERY_PRICE} KGS</div>}
            </div>
          ))}
          </div>
          <div>Delivery: {DELIVERY_PRICE} KGS</div>
          <button className="btn btn-danger" onClick={() => onRemove(item.id)}>Complete order</button>
        </div>
      ))
    )
  }

  return (
    <>
      <h3 className="d-flex justify-content-center m-3">Orders</h3>
      <div className="d-flex justify-content-center">
        {ordersLoading ? <Spinner/> : content}
      </div>
    </>
  );
};


export default Orders;
