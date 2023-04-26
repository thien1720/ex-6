import React, { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { useParams } from "react-router";

import { AppState } from '../../../../redux/reducer';
import { fetchThunk } from '../../../common/redux/thunk';
import { LProps, setListData } from "../../redux/listReducer";
import { API_PATHS } from "../../../../configs/api";

interface Updates {
    id: number,
    status: string,
    total: number
}

function ShowItemPay() {
    const { id } = useParams<{ id: string }>()
    const [dataId, setDataId] = useState<LProps | any>({})
    const [update, setUpdate] = useState<Updates | {}>({ id: Number(id) , status: dataId.status, total: dataId.total })
    console.log(dataId)
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

    const getListData = React.useCallback(
        async () => {
            const dataById = await dispatch(fetchThunk(`${API_PATHS.data}/${id}`, "get"))
            setDataId(dataById.data)
            // dispatch(setListData(datayById.data))
        },
        [dispatch]
    );
    console.log(update)


    const handeUpdate = useCallback(
        async (e) => {
            e.preventDefault();
            delete dataId.updatedAt
            delete dataId.createdAt
            delete dataId.createdBy
            const filteredObj = Object.fromEntries(
                Object.entries(dataId).filter(([_, value]) => value != null && value !== '')
              );
            const listDatas = await dispatch(fetchThunk(API_PATHS.data, "put", filteredObj))

        },
        [dispatch, update, dataId]
    )

    useEffect(() => {
        getListData()
    }, [])


    return <>
        <p>Show Item Detail ID</p>

        <form>
            <div className="form-group row">
                <label htmlFor="staticEmail"
                    className="col-sm-2 col-form-label">Status</label>
                <div className="col-sm-10">
                    <input type="text"
                        className="form-control-plaintext"
                        value={dataId.status}
                        onChange={(e) => {
                            setDataId({ ...dataId, status: e.target.value });
                            setUpdate({ ...update, status: e.target.value })
                        }}
                        id="staticEmail" />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="inputPassword"
                    className="col-sm-2 col-form-label">Total</label>
                <div className="col-sm-10">
                    <input type="number"
                        className="form-control"
                        value={dataId.total}
                        onChange={(e) => {
                            setDataId({ ...dataId, total: Number(e.target.value) });
                            setUpdate({ ...update, total: Number(e.target.value) })

                        }}
                        id="inputPassword"
                        placeholder="Password" />
                </div>
            </div>


            <div className="form-group row">
                <label htmlFor="inputPassword"
                    className="col-sm-2 col-form-label">invoice</label>
                <div className="col-sm-10">
                    <p>{dataId.invoice}</p>

                </div>
            </div>

            <div className="form-group row">
                <label htmlFor="inputPassword"
                    className="col-sm-2 col-form-label">Curentcy</label>
                <div className="col-sm-10">
                    <p>{dataId.currency}</p>
                </div>
            </div>

            <div className="form-group row">
                <label htmlFor="inputPassword"
                    className="col-sm-2 col-form-label">Order</label>
                <div className="col-sm-10">
                    <p>{dataId.order}</p>
                </div>
            </div>

            <div className="col-auto">
                <button type="submit"
                    className="btn btn-primary mb-2"
                    onClick={handeUpdate}
                >Submit</button>
            </div>
        </form>
    </>
}

export default ShowItemPay;