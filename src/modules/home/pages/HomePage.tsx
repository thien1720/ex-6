import React from 'react';
import { ROUTES } from '../../../configs/routes';

import { Link } from "react-router-dom"
import DataList from './DataList';
import "./DataList/style.css"

interface Props { }

const HomePage = (props: Props) => {
  return <div>
    <div className="head-pay">
      <h1>PayRoll Transiction List</h1>
      <Link to={`${ROUTES.profile}`} >Detail Page</Link>
    </div>

    <DataList />

  </div>;
};

export default HomePage;
