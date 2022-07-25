import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { apiWrapper } from "../gateway/shop-it";
import { cartStateSelector } from "../store";
import { clearCart } from "../store/reducers/cart-reducer";

export default () => {
  const dispatch = useDispatch();
  const { products } = useSelector(cartStateSelector);

  const total = products
    .map((product) => Number(product.price || 0))
    .reduce((a, b) => a + b, 0);

  const render = () => {
    let i = 0;

    return (
      products.length > 0 && (
        <div>
          {products.map((product) => {
            return (
              <Dropdown.ItemText key={`cart-${i++}`}>
                {product.title} {product.price}$
              </Dropdown.ItemText>
            );
          })}
          <Dropdown.Divider />
          <Dropdown.ItemText>Total: {total}$</Dropdown.ItemText>
          <Dropdown.ItemText>
            <div className="max-width" style={{ textAlign: "center" }}>
              <Button onClick={pay}>Pay</Button>
            </div>
          </Dropdown.ItemText>
        </div>
      )
    );
  };

  const pay = () => {
    const productsMap = new Map<number, number>(); //productId -> count

    products.forEach((product) => {
      const productId = product.id || -1;
      productsMap.set(productId, (productsMap.get(productId) || 0) + 1);
    });

    const lineItems = Array.from(productsMap.entries()).map((entry) => {
      return { id: entry[0], count: entry[1] };
    });

    apiWrapper.shop.purchase(lineItems).then(() => dispatch(clearCart()));
  };

  return (
    <DropdownButton
      id="dropdown-item-button"
      title={`shopping items: (${products.length})`}
    >
      {render()}
    </DropdownButton>
  );
};
