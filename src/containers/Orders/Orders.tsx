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
    dispatch(getOrders());
  }, [dispatch]);

  const onRemove = async (id: string) => {
    await dispatch(removeOrder(id));
    await dispatch(removeOrderFromList(id))
  };

  const total = orders.map(item => {
    return item.orderDishes.reduce((acc, p) => {
      return acc += p.price * p.amount;
    }, DELIVERY_PRICE);
  });

  let content: ReactElement[] | ReactElement = (
    <p className="fs-3 fw-bold">There are no orders yet!</p>
  );

  if (orders.length > 0) {
    content = (
      orders.map((item, index) => (
        <div className="card mb-3 p-3" key={Math.random()}>
          <div>{item.orderDishes.map((itemOrder) => (
            <div key={Math.random()} className="p-3">
              <span className=""><strong>Title:</strong> {itemOrder.title}</span>
              <span className="m-2">X {itemOrder.amount}</span>
              <span className="m-2"><strong>Price:</strong> {itemOrder.price} KGS</span>
            </div>
          ))}
          </div>
          <div className="ps-3">Delivery: {DELIVERY_PRICE} KGS</div>
          {<div>Total: {total[index]} KGS</div>}
          <button className="btn btn-danger" onClick={() => onRemove(item.id)}>Complete order</button>
        </div>
      ))
    )
  }

  return (
    <>
      <h3 className="d-flex justify-content-center m-3">Orders</h3>
      <div className="d-flex flex-column">
        {ordersLoading ? <Spinner/> : content}
      </div>
    </>
  );
};


export default Orders;
