import React from 'react';
import {Pizza} from "../../types";
import {useNavigate} from "react-router-dom";
import {deletePizza, fetchAllPizzas} from "../../store/pizzasThunks";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectDeleteLoading, selectUpdateLoading} from "../../store/pizzasSlice";
import ButtonSpinner from "../Spinner/ButtonSpinner";

interface Props {
  pizza: Pizza;
}

const PizzaItem: React.FC<Props> = ({pizza}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const deleteLoading = useAppSelector(selectDeleteLoading);
  const updateLoading = useAppSelector(selectUpdateLoading);

  const imageUrl = 'data:image/jpeg;base64,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';
  const image = pizza.image || imageUrl;
  const imageStyle = {
    background: `url(${image}) no-repeat center center / cover`
  };

  const removePizza = async (id: string) => {
    await dispatch(deletePizza(id));
    await dispatch(fetchAllPizzas());
  };

  const onEditPizza = (id: string) => {
    console.log('edit');
    navigate('/admin/edit-dish/' + id);
  };

  return (
    <div className="card mb-2">
      <div className="row no-gutters">
        <div className="col-sm-4 rounded-start" style={imageStyle}/>
        <div className="col-sm-8">
          <div className="card-body">
            <h5 className="card-title">{pizza.title}</h5>
            <p className="card-text">{pizza.price} KGS</p>
            <p className="d-flex gap-2">
              <button
                className="btn btn-primary"
                onClick={() => onEditPizza(pizza.id)}
                disabled={updateLoading ? updateLoading === pizza.id : false}
              >
                {updateLoading && updateLoading === pizza.id && <ButtonSpinner/>}
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => removePizza(pizza.id)}
                disabled={deleteLoading ? deleteLoading === pizza.id : false}
              >
                {deleteLoading && deleteLoading === pizza.id && <ButtonSpinner/>}
                Delete
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PizzaItem;