import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import DishForm from "../../components/DishForm/DishForm";
import {useAppDispatch, useAppSelector} from "../../app/hooks";

import Spinner from "../../components/Spinner/Spinner";
import {fetchOnePizza, updatePizza} from "../../store/pizzasThunks";
import {selectOneFetchLoading, selectOnePizza} from "../../store/pizzasSlice";
import {ApiPizza} from "../../types";

const EditDish = () => {
  const {id} = useParams() as {id: string};
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const fetchOneLoading = useAppSelector(selectOneFetchLoading);
  const dish = useAppSelector(selectOnePizza);

  useEffect(() => {
    dispatch(fetchOnePizza(id));
  }, [id, dispatch]);

  const onSubmit = async (dish: ApiPizza) => {
    await dispatch(updatePizza({id, pizza: dish}));
    navigate('/admin');
  };

  const existingDish = dish && {
    ...dish,
    price: dish.price.toString(),
  };

  return (
    <div className="row mt-2">
      <div className="col">
        {fetchOneLoading && <Spinner/>}
        {existingDish && (
          <DishForm
            onSubmit={onSubmit}
            existingPizza={existingDish}
          />
        )}
      </div>
    </div>
  );
};

export default EditDish;