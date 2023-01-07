import React, {useState} from 'react';
import ButtonSpinner from "../Spinner/ButtonSpinner";
import {useAppSelector} from "../../app/hooks";
import {selectCreateLoading, selectOneFetchLoading, selectUpdateLoading} from "../../store/pizzasSlice";
import Spinner from "../Spinner/Spinner";
import {ApiPizza, PizzaMutation} from "../../types";

interface Props {
  onSubmit: (dish: ApiPizza) => void;
  existingPizza?: PizzaMutation;
}

const initialState: PizzaMutation = {
  title: '',
  image: '',
  price: '',
};

const DishForm: React.FC<Props> = ({
                                     onSubmit,
                                     existingPizza = initialState,
                                   }) => {
  const [pizza, setPizza] = useState<PizzaMutation>(existingPizza);

  const createLoading = useAppSelector(selectCreateLoading);
  const updateLoading = useAppSelector(selectUpdateLoading);
  const fetchOneLoading = useAppSelector(selectOneFetchLoading)

  const onPizzaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;

    setPizza(prev => ({...prev, [name]: value}));
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...pizza,
      price: parseFloat(pizza.price),
    });
  };

  return (
    <>
      {fetchOneLoading ? <Spinner/> : (
        <form onSubmit={onFormSubmit}>
          <h4>{updateLoading ? 'Edit dish' : 'Add new dish'}</h4>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="title" name="title" type="text"
              className="form-control"
              value={pizza.title}
              onChange={onPizzaChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input
              id="image" name="image" type="url"
              className="form-control"
              value={pizza.image}
              onChange={onPizzaChange}
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="price">Price</label>
            <input
              id="price" name="price" type="number"
              className="form-control"
              value={pizza.price}
              onChange={onPizzaChange}
            />
          </div>
          <button
            type="submit"
            disabled={createLoading ? createLoading : updateLoading}
            className="btn btn-primary">
            {updateLoading && <ButtonSpinner/>}
            {createLoading && <ButtonSpinner/>}
            {existingPizza.title !== '' ? 'Update' : 'Create'}
          </button>
        </form>
      )}
    </>
  );
};

export default DishForm;