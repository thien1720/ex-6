import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux"
import classNames from "classnames/bind"
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

import { LProps, setListData } from "../../redux/listReducer";
import { fetchThunk } from '../../../common/redux/thunk';
import { AppState } from '../../../../redux/reducer';
import { API_PATHS } from "../../../../configs/api";
import { RootState } from "../ListPay";
// import { fetchFilter } from "../List/reducer";
// import { FilterPay } from "../List/reducer";
// import { AppDispatch } from "../../redux/store"
import "./style.css";


function ListFilter() {
    const [filter, setFilter] = useState({ status: "", totalFrom: 0, totalTo: 0, client: "", currency: "" })
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const listData = useSelector((state: RootState) => {
        return state.listReducer.data
    }
    )
    console.log(filter)
    // filter curency
    const uniqueCurrencies: Array<string> = Array.from(new Set(listData.map((invoice: any) => invoice.currency)));

    const handledleAplly = useCallback(async (e: any) => {
        e.preventDefault()

        const listDatas = await dispatch(fetchThunk(API_PATHS.data, "get"))
        const filterData = listDatas.data.filter((item: LProps) => {
            // console.log(item)

            const listFil = filter.status ? item.status.toLocaleLowerCase() == filter.status.toLocaleLowerCase() : true
                && filter.currency ? filter.currency.toLocaleLowerCase() == item.currency.toLocaleLowerCase() : true
                && (
                    (filter.totalFrom && filter.totalTo) ?
                        // console.log(filter.totalFrom, item.total, filter.totalTo)
                        (filter.totalFrom <= item.total && item.total < filter.totalTo)
                        : filter.totalFrom
                            ?
                            // console.log("có from")
                            (filter.totalFrom < item.total)
                            : (filter.totalTo)
                                ?
                                // console.log("có to")
                                filter.totalTo <= item.total
                                : true
                )



            console.log(listFil)
            return listFil
        }

        )
        // console.log(filterData)
        dispatch(setListData(filterData))
    }, [filter])

    const handlClear = React.useCallback(
        async () => {
            const listDatas = await dispatch(fetchThunk(API_PATHS.data, "get"))
            dispatch(setListData(listDatas.data))
        },
        [dispatch],
    );
    return (<div>
        <form className="style-form align-items-center">
            <div className="form-filter row gy-2 gx-3">
                <div className="col-auto">
                    <label className="visually-hidden" htmlFor="autoSizingSelect">Status</label>
                    <select className="form-select" id="autoSizingSelect"
                        onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                        value={filter.status
                        }
                        name="status"
                    >
                        <option selected>Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Fulfilled">Fulfilled</option>
                        <option value="Processing">Processing</option>

                    </select>
                </div>

                <div className="col-auto">
                    <label className="visually-hidden" htmlFor="totalFrom">Name</label>
                    <input type="number"
                        className="form-control re-input"
                        id="totalFrom"
                        name='totalFrom'
                        value={filter.totalFrom == 0 ? "From" : filter.totalFrom}
                        placeholder="From"
                        onChange={(e) => setFilter({ ...filter, totalFrom: Number(e.target.value) })}

                    />
                </div>

                <div className="col-auto">
                    <label className="visually-hidden" htmlFor="totalTo">Name</label>
                    <input type="number"
                        className="form-control re-input"
                        id="totalTo"
                        name="totalTo"
                        value={filter.totalTo == 0 ? "To Total" : filter.totalTo}
                        placeholder="To"
                        onChange={(e) => setFilter({ ...filter, totalTo: Number(e.target.value) })}

                    />
                </div>

                <div className="col-auto">
                    <label className="visually-hidden" htmlFor="autoSizingSelectcurrency">Status</label>
                    <select className="form-select" id="autoSizingSelectcurrency"
                        onChange={(e) => setFilter({ ...filter, currency: e.target.value })}
                        name="currency"
                    >
                        <option selected>Current</option>
                        {uniqueCurrencies.map((item: any) => {
                            return <option
                                key={item.id}
                                value={item} >
                                {item}
                            </option>
                        })}

                    </select>
                </div>
            </div>

            <div className="apply-clear">
                <button className="btn btn-outline-info"
                    onClick={handledleAplly}
                >Apply</button>
                <button className="btn btn-outline-danger"
                    onClick={handlClear}
                >Clear</button>

            </div>
        </form>


    </div>);
}

export default ListFilter;