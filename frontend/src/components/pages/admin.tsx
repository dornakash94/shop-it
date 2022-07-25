import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { apiWrapper } from "../../gateway/shop-it";
import { Product } from "../../generated/swagger/shop-it";
import { productStateSelector } from "../../store";
import {
  setProducts,
  deleteProduct,
} from "../../store/reducers/products-reducer";
import ProductModel from "../product-model";

interface AdminState {
  pageNumber: number;
  pageSize: number;
  showLoadMore: boolean;
  loading: boolean;
  showModel: boolean;
  showDeleteModel: boolean;
  modelProduct?: Product;
}

export default () => {
  const dispatch = useDispatch();
  const { products } = useSelector(productStateSelector);

  const [adminState, setAdminState] = useState({
    pageNumber: 0,
    pageSize: 10,
    showLoadMore: false,
    loading: true,
    showModel: false,
    showDeleteModel: false,
  } as AdminState);

  useEffect(() => {
    apiWrapper.product.listProducts(0, adminState.pageSize).then((products) => {
      dispatch(setProducts(products));
      setAdminState({
        ...adminState,
        pageNumber: 0,
        showLoadMore: products.length === adminState.pageSize,
        loading: false,
      });
    });
  }, []);

  const loadMore = async () => {
    setAdminState({ ...adminState, loading: true });

    const additionalProducts = await apiWrapper.product.listProducts(
      adminState.pageNumber + 1,
      adminState.pageSize
    );

    if (additionalProducts.length > 0) {
      setAdminState({
        ...adminState,
        pageNumber: adminState.pageNumber + 1,
        showLoadMore: additionalProducts.length === adminState.pageSize,
        loading: false,
      });
    } else {
      setAdminState({
        ...adminState,
        showLoadMore: false,
        loading: false,
      });
    }
  };

  const openModel = (modelProduct: Product | undefined = undefined) => {
    setAdminState({ ...adminState, showModel: true, modelProduct });
  };

  const deleteBtnClick = (modelProduct: Product) => {
    setAdminState({
      ...adminState,
      showDeleteModel: true,
      modelProduct,
    });
  };

  const closeDeleteModel = () => {
    setAdminState({ ...adminState, showDeleteModel: false });
  };

  return (
    <div>
      <ProductModel
        product={adminState.modelProduct}
        show={adminState.showModel}
        onClose={() => setAdminState({ ...adminState, showModel: false })}
      />

      <Modal show={adminState.showDeleteModel}>
        <Modal.Header closeButton onClick={closeDeleteModel}>
          <Modal.Title>Delete product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete [
          {adminState.modelProduct?.title || "unknown"}] product?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteModel}>
            No
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              const productId = adminState.modelProduct?.id || -1;

              apiWrapper.product.deleteProduct(productId).then(() => {
                dispatch(deleteProduct(productId));
                closeDeleteModel();
              });
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="products">
        <div className="max-width" style={{ textAlign: "right", padding: 20 }}>
          <Button onClick={() => openModel()}>Add</Button>
        </div>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr key={`product-${product.id}`}>
                  <td>
                    <img
                      src={product.image}
                      style={{ width: 25, height: 25 }}
                    />
                    <label>&nbsp;</label>
                    {product.title || ""}
                  </td>
                  <td>{product.price || 0}</td>

                  <td>
                    <Button onClick={() => openModel(product)}>Edit</Button>
                    <label>&nbsp;&nbsp;</label>
                    <Button
                      variant="danger"
                      onClick={() => deleteBtnClick(product)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        {adminState.showLoadMore && (
          <Button onClick={loadMore}>Load more</Button>
        )}
      </div>
    </div>
  );
};
