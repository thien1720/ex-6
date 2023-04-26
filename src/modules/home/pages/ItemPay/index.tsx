import React from 'react';
import {Link} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { Action } from 'redux';
import { AiOutlineDelete } from "react-icons/ai";
import { ThunkDispatch } from 'redux-thunk';

import { LProps, setListData } from "../../redux/listReducer";
import { ROUTES } from '../../../../configs/routes';
import { fetchThunk } from '../../../common/redux/thunk';
import { AppState } from '../../../../redux/reducer';
import { API_PATHS } from "../../../../configs/api";

import "./style.css";

function ItemPay(props: any) {
    const { id, status, date, client, currency, total, invoice } = props
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

    const newDate = new Date(date).toISOString().slice(0, 10)
    const handleDelete = React.useCallback(
        async () => {
            const deleteById = await dispatch(fetchThunk(`${API_PATHS.data}/${id}`, "delete"))
            console.log(deleteById)
            const listDatas = await dispatch(fetchThunk(API_PATHS.data, "get"))
            console.log(await listDatas)
            dispatch(setListData(listDatas.data))
        },
        [dispatch]
    );

    const className= status.toLowerCase() == "processing" ? "Processing" :
                status.toLowerCase() == "received" ? "Received" :
                status.toLowerCase() == "fulfilled" ? "Fulfilled" : 
                status.toLowerCase() == "pending" ? "Pending" : "" 

    return <>
        <tr>
            {/* <th scope="row">{id}</th> */}
            <td scope="row" 
            className= {className}
            >{status}</td>
            <td>{newDate}</td>
            <td>{client}</td>
            <td>{currency}</td>
            <td>{total}</td>
            <td>{invoice}</td>
            <td><Link to={`${ROUTES.detail}/${id}`} type="button" className="btn btn-outline-primary btn-view">View Details</Link></td>
            <td className="delete"><AiOutlineDelete
                onClick={handleDelete}
            /></td>

        </tr>
    </>
}

export default ItemPay;