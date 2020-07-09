import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import { formatPrice } from '../../../util/format';

import { addToCartSuccess, updateAmountSuccess } from './actions';
//adicionar ao carrinho
function* addToCart({ id }) {
    const productExists = yield select((state) =>
        state.cart.find((p) => p.id === id)
    );

    //Controle de adiçao de estoque na HOME
    const stock = yield call(api.get, `/stock/${id}`);

    const stockAmount = stock.data.amount;
    const currentAmount = productExists ? productExists.amount : 0;

    const amount = currentAmount + 1;

    if (amount > stockAmount) {
        toast.error('Quantidade solicitada fora de estoque!');
        return;
    }

    //verificando se o produto já existe na lista para nao repetir
    if (productExists) {
        yield put(updateAmountSuccess(id, amount));
    } else {
        const response = yield call(api.get, `/products/${id}`);

        const data = {
            ...response.data,
            amount: 1,
            priceFormatted: formatPrice(response.data.price),
        };

        yield put(addToCartSuccess(data));
    }
}

//Controle de adiçao de estoque no CART
function* updateAmount({ id, amount }) {
    //nao permite o usuário colocar a quantidade do produto como 0
    if (amount <= 0) return;

    const stock = yield call(api.get, `stock/${id}`);
    const stockAmount = stock.data.amount;

    /**
     * Emite uma mensagem para o usuário quando tentar selecionar
     * uma quantidade do produto maior que contém no estoque.
     * */
    if (amount > stockAmount) {
        toast.error('Quantidade solicitada fora de estoque!');
        return;
    }

    yield put(updateAmountSuccess(id, amount));
}

export default all([
    takeLatest('@cart/ADD_REQUEST', addToCart),
    takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
