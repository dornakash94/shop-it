import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { apiWrapper } from "../gateway/shop-it";
import { Product } from "../generated/swagger/shop-it";
import { addProducts } from "../store/reducers/products-reducer";

interface ProductModelProps {
  product?: Product;
  show: boolean;
  onClose: () => void;
}

const productOrDefault = (product: Product | undefined): Product => {
  return product || {};
};

export default ({ product, show, onClose }: ProductModelProps) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    product: productOrDefault(product),
  });

  useEffect(() => {
    setFormData({
      product: productOrDefault(product),
    });
  }, [product]);

  const isEdit = product ? true : false;
  const title = isEdit ? "Edit Product" : "Create Product";

  const onSaveClick = () => {
    const api = isEdit
      ? apiWrapper.product.editProduct
      : apiWrapper.product.createProduct;
    api(formData.product).then((product) => {
      dispatch(addProducts([product]));
      setFormData({ product: {} });
      onClose();
    });
  };

  return (
    <Modal show={show}>
      <Modal.Header closeButton onClick={onClose}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              minLength={1}
              type="text"
              placeholder="Title"
              autoFocus
              onChange={(e) =>
                setFormData({
                  ...formData,
                  product: {
                    ...formData.product,
                    title: e.target.value,
                  },
                })
              }
              value={formData.product.title || ""}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              placeholder="Description"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  product: {
                    ...formData.product,
                    description: e.target.value,
                  },
                })
              }
              value={formData.product.description || ""}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              minLength={1}
              type="url"
              placeholder="Image"
              autoFocus
              onChange={(e) =>
                setFormData({
                  ...formData,
                  product: {
                    ...formData.product,
                    image: e.target.value,
                  },
                })
              }
              value={formData.product.image || ""}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              minLength={1}
              type="number"
              placeholder="Price"
              autoFocus
              onChange={(e) =>
                setFormData({
                  ...formData,
                  product: {
                    ...formData.product,
                    price: Number(e.target.value),
                  },
                })
              }
              value={formData.product.price || 0}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-primary" onClick={() => onSaveClick()}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
