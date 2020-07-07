import React from 'react';
import {
    MdRemoveCircleOutline,
    MdAddCircleOutline,
    MdDelete,
} from 'react-icons/md';

import { Container, ProductTable, Total } from './styles';

export default function Cart() {
    return (
        <Container>
            <ProductTable>
                <thead>
                    <tr>
                        <th />
                        <th>PRODUTO</th>
                        <th>SUBTOTAL</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <img
                                src="https://static.netshoes.com.br/produtos/chuteira-society-nike-phantom-vision-2-academy-df-tf/06/HZM-2955-006/HZM-2955-006_zoom1.jpg?ts=1579725014&ims=326x"
                                alt="chuteira"
                            />
                        </td>
                        <td>
                            <strong>Chuteira muito boa</strong>
                            <span>R$ 379,90</span>
                        </td>
                        <td>
                            <div>
                                <button type="button">
                                    <MdRemoveCircleOutline
                                        size={20}
                                        color="#7159c1"
                                    />
                                </button>
                                <input type="number" readOnly value={2} />
                                <button type="button">
                                    <MdAddCircleOutline
                                        size={20}
                                        color="#7159c1"
                                    />
                                </button>
                            </div>
                        </td>
                        <td>
                            <strong>R$759,80</strong>
                        </td>
                        <td>
                            <button type="button">
                                <MdDelete sizer={20} color="#7159c1" />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </ProductTable>

            <footer>
                <button type="button">Finalizar pedido</button>
                <Total>
                    <span>TOTAL</span>
                    <strong>R$1920,99</strong>
                </Total>
            </footer>
        </Container>
    );
}
