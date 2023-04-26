import { ActionType, createCustomAction, getType } from 'typesafe-actions';

export interface LProps {
  id: number,
  createdBy: number,
  fundingMethod: string,
  status: string,
  date: string,
  order: string,
  client: string,
  currency: string,
  total: number,
  invoice: string,
  updatedAt : string,
}
export interface listState {
  photos: LProps[];
  loading: boolean;
  error: string | null;
}

const initialState = {
  data: [],
  loading: false,
  error: null
}

export const setListData = createCustomAction("list/setListData",
  (data: LProps[]) => {
    return {data}
  }
)

const actions = { setListData }

type Action = ActionType<typeof actions>;


export default function reducer(state = initialState, action: Action) {
  switch (action.type) {
    case getType(setListData): {
      return {...state, data : action.data}
      break
    }
    // case FETCH_DATA : {
    //     break;
    // }
    default:
      return state;
  }
}