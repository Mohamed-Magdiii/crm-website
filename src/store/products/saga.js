import { 
  takeEvery, 
  call, 
  put,
  delay
} from "redux-saga/effects";
import 
{
  fetchProudcts,
  addNewProudct,
  editProudct
} from "apis/products";
import { 
  PRODUCTS_START,
  ADD_PRODUCT_START,
  EDIT_PRODUCT_START
} from "./actionsTypes";
import { 
  fetchProductsSuccess,
  addProductSuccess,
  ModalClear,
  editProductSuccess,
  apiError
} from "./actions";
import { showSuccessNotification } from "../notifications/actions";

function * getProducts({ payload :{ params } }){
  try {
    const result = yield call(fetchProudcts, params);
    yield put(fetchProductsSuccess(result));
  } catch (error){
    yield put(apiError(error));
  }
}
function * addProduct({ payload }){
  try {
    const data = yield call(addNewProudct, payload);
    const { status } = data;
    const { result:product } = data;
    if (status){
      yield put(addProductSuccess(product));
      yield put(showSuccessNotification("Product is added successfully"));
      yield delay(1000);
      yield put(ModalClear());
    }
  } catch (error){
    yield put(apiError(error));
    yield delay(2000);
    yield put(apiError(""));
  }
}

function * editProduct({ payload }){
  try {
    const res =  yield call(editProudct, payload);
    const { result } = res;
    yield put(editProductSuccess({
      _id:result._id,
      ...result
    }));
    yield put(showSuccessNotification("LOB has been updated successfully!"));
    yield delay(2000);
  } catch (error){
    yield put(apiError(error));
    yield delay(2000);
    yield put(apiError(""));
  }
}

function * Products(){
  yield takeEvery(PRODUCTS_START, getProducts);
  yield takeEvery(ADD_PRODUCT_START, addProduct);
  yield takeEvery(EDIT_PRODUCT_START, editProduct);
  
}
export default Products;