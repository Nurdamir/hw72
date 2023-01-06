import React from 'react';
import {Pizza} from "../../types";
import {addDish} from "../../store/cartSlice";
import {useAppDispatch} from "../../app/hooks";

interface Props {
  pizza: Pizza;
  // onClick: React.MouseEventHandler;
}

const ClientPizzaItem: React.FC<Props> = ({pizza}) => {
  const dispatch = useAppDispatch();

  const imageStyle = {
    background: `url(${pizza.image}) no-repeat center center / cover`
  };

  const addToCart = () => {
    dispatch(addDish(pizza));
  };

  return (
    <div className="card mb-2" onClick={addToCart}>
      <div className="row no-gutters">
        <div className="col-sm-4 rounded-start" style={imageStyle}/>
        <div className="col-sm-8">
          <div className="card-body">
            <h5 className="card-title">{pizza.title}</h5>
            <p className="card-text">{pizza.price} KGS</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ClientPizzaItem;