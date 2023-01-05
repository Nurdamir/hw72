import React from 'react';
import './App.css';
import Layout from "./components/Layout/Layout";
import {Route, Routes} from "react-router-dom";
import NewDish from "./containers/NewDish/NewDish";
import EditDish from "./containers/EditDish/EditDish";
import Pizzas from "./components/Pizzas/Pizzas";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/admin" element={<Pizzas/>}/>
        <Route path="/admin/dishes" element={<Pizzas/>}/>
        <Route path="/admin/new-dish" element={<NewDish/>}/>
        <Route path="/admin/edit-dish/:id" element={<EditDish/>}/>
        <Route path="*" element={<h1>Not found!</h1>}/>
      </Routes>
    </Layout>
  );
}

export default App;
