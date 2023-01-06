import React from 'react';
import {ApiOrderList} from "../../types";


interface Props {
  order: ApiOrderList;
}


const Order: React.FC<Props> = ({order}) => {
  // const dispatch = useAppDispatch();
  // const dishes = useAppSelector(selectPizzas);
  //
  // useEffect(() => {
  //   dispatch(getOrders());
  // }, [dispatch]);

  // const calculateTotal = () => {
  //   return Object.keys(order).reduce((acc, key: any) => {
  //     return acc + order[key] * (dishes[key].price ?? 0);
  //   }, 0);
  // };


  return (
    <div>
      {/*{Object.keys(order).map(id => (*/}
      {/*  <div>*/}
      {/*    <p>*/}
      {/*      {order[id]} X {dishes[id].title}*/}
      {/*    </p>*/}
      {/*    <p>*/}
      {/*      {dishes[id].price}*/}
      {/*    </p>*/}
      
      {/*  </div>*/}
      
      {/*))}*/}
    </div>
  );
};

export default Order;