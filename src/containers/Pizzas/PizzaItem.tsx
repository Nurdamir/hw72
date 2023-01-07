import React from 'react';
import {Pizza} from "../../types";
import {useNavigate} from "react-router-dom";
import {deletePizza, fetchAllPizzas} from "../../store/pizzasThunks";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectDeleteLoading, selectUpdateLoading} from "../../store/pizzasSlice";
import ButtonSpinner from "../../components/Spinner/ButtonSpinner";

interface Props {
  pizza: Pizza;
}

const PizzaItem: React.FC<Props> = ({pizza}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const deleteLoading = useAppSelector(selectDeleteLoading);
  const updateLoading = useAppSelector(selectUpdateLoading);

  const image = pizza.image;
  const imageStyle = {
    background: `url(${image}) no-repeat center center / cover`
  };

  const removePizza = async (id: string) => {
    await dispatch(deletePizza(id));
    await dispatch(fetchAllPizzas());
  };

  const onEditPizza = (id: string) => {
    navigate('/admin/edit-dish/' + id);
  };

  return (
    <div className="card mb-2 w-75">
      <div className="row no-gutters">
        <div className="col-sm-4 rounded-start" style={imageStyle}/>
        <div className="col-sm-8">
          <div className="card-body d-flex justify-content-center">
            <div className="d-flex flex-column">
              <h5 className="card-title">Title: {pizza.title}</h5>
              <p className="card-text">Price: {pizza.price} KGS</p>
              <p className="d-flex gap-2">
                <button
                  className="btn btn-primary"
                  onClick={() => onEditPizza(pizza.id)}
                  disabled={deleteLoading ? deleteLoading === pizza.id : false}
                >
                  {updateLoading}
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
    </div>
  );
};
export default PizzaItem;