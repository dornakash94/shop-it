import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { apiWrapper } from "../../gateway/shop-it";
import { productStateSelector } from "../../store";
import { setProducts } from "../../store/reducers/products-reducer";
import Cart from "../cart";
import ProductCard from "../product-card";

interface HomeState {
  pageNumber: number;
  pageSize: number;
  showLoadMore: boolean;
  loading: boolean;
}

export default () => {
  const dispatch = useDispatch();
  const { products } = useSelector(productStateSelector);

  const [homeState, setHomeState] = useState({
    pageNumber: 0,
    pageSize: 10,
    showLoadMore: false,
    loading: true,
  } as HomeState);

  useEffect(() => {
    apiWrapper.product.listProducts(0, homeState.pageSize).then((products) => {
      dispatch(setProducts(products));
      setHomeState({
        ...homeState,
        pageNumber: 0,
        showLoadMore: products.length === homeState.pageSize,
        loading: false,
      });
    });
  }, []);

  const loadMore = async () => {
    setHomeState({ ...homeState, loading: true });

    const additionalProducts = await apiWrapper.product.listProducts(
      homeState.pageNumber + 1,
      homeState.pageSize
    );

    if (additionalProducts.length > 0) {
      setHomeState({
        ...homeState,
        pageNumber: homeState.pageNumber + 1,
        showLoadMore: additionalProducts.length === homeState.pageSize,
        loading: false,
      });
    } else {
      setHomeState({
        ...homeState,
        showLoadMore: false,
        loading: false,
      });
    }
  };

  return (
    <div>
      <div className="products">
        <div className="max-width" style={{ textAlign: "right", padding: 20 }}>
          <Cart />
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-start",
          }}
        >
          {products.map((product) => {
            return (
              <ProductCard product={product} key={`product-${product.id}`} />
            );
          })}
        </div>
        {homeState.showLoadMore && (
          <Button onClick={loadMore}>Load more</Button>
        )}
      </div>
    </div>
  );
};
