import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import ReactPaginate from "react-paginate";
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import axios from 'axios';

import { LProps, setListData } from "../../redux/listReducer";
import { AppState } from '../../../../redux/reducer';
import { fetchThunk } from '../../../common/redux/thunk';
import { ACCESS_TOKEN_KEY } from '../../../../utils/constants';
import { RESPONSE_STATUS_SUCCESS } from '../../../../utils/httpResponseCode';
import { API_PATHS } from "../../../../configs/api";
import ItemPay from "../ItemPay"


// import { AppDispatch } from "../../redux/store"
// import { LProps, fetchData } from "./reducer"
import "./style.css";


export interface Data {
    data: [],
    loading: boolean,
    error: any
}

export interface RootState {
    listReducer: Data
}

function ListItem() {
    const itemsPerPage = 4
    const listData = useSelector((state: RootState) => {
        console.log(state.listReducer.data)
        return state.listReducer.data
    } 
    )
    // console.log(listData)
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = listData.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(listData.length / itemsPerPage);

    const handlePageClick = (event: any) => {
        const newOffset = (event.selected * itemsPerPage) % listData.length;

        setItemOffset(newOffset);
    };

    const getListData = React.useCallback(
        async () => {
            const listDatas = await dispatch(fetchThunk(API_PATHS.data, "get"))
            dispatch(setListData(listDatas.data))
        },
        [dispatch],
    );

    useEffect(() => {
        getListData()
    }, [])





    return (<div>
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Status</th>
                    <th scope="col">Date</th>
                    <th scope="col">Client</th>
                    <th scope="col">Currency</th>
                    <th scope="col">Total</th>
                    <th scope="col">Invoice#</th>
                </tr>
            </thead>
            <tbody>
                {currentItems.map((item: LProps) => {

                    return <ItemPay
                        key={item.id}
                        id={item.id}
                        status={item.status}
                        date={item.updatedAt}
                        client={item.client}
                        currency={item.currency}
                        total={item.total}
                        invoice={item.invoice}
                    />
                })}

            </tbody>
        </table>

        <div className="pages">
            <div>
                <p>
                    Showing <b>4</b> from  <b>{listData.length}</b>
                </p>
            </div>
            <div>
                <ReactPaginate
                    breakLabel="..."
                    previousLabel="<"
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    renderOnZeroPageCount={null}
                    containerClassName="pagination"
                    pageLinkClassName="page-num"
                    previousLinkClassName="page-num"
                    nextLinkClassName="page-num"
                    activeLinkClassName="active"
                />
            </div>
        </div>
    </div>)
}

export default ListItem