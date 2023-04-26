import React from 'react';
import {BsChevronDown} from "react-icons/bs"
import "./style.css"
import ListFilter from "../FilterList";
import ListItem from "../ListPay";

function DataList() {
    return (<div className="app">
        <div className="header">
            <div className="title">
              <h5>Payroll Transaction List</h5>
            </div>
            <div className="content">
              <button className="btn btn-primary">Export CSV <BsChevronDown/></button>
            </div>
        </div>

        <ListFilter />

        <ListItem />
    </div>  );
}

export default DataList