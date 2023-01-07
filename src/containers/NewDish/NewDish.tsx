import React from 'react';
import DishForm from "../../components/DishForm/DishForm";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../app/hooks";
import {ApiPizza} from "../../types";
import {createPizza} from "../../store/pizzasThunks";

const NewDish = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = async (dish: ApiPizza) => {
    await dispatch(createPizza(dish));
    navigate('/admin');
  };

  return (
    <div className="row mt-2">
      <div className="col">
        <DishForm onSubmit={onSubmit}/>
      </div>
    </div>
  );
};

export default NewDish;