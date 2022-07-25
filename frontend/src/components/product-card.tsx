import { Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Product } from "../generated/swagger/shop-it";
import { addToCart } from "../store/reducers/cart-reducer";

interface ProductCardProps {
  product: Product;
}

export default ({ product }: ProductCardProps) => {
  const dispatch = useDispatch();

  const buyClick = () => {
    dispatch(addToCart(product));
  };

  return (
    <Card style={{ marginRight: 15, width: 150, height: 250 }}>
      <Card.Img
        src={product.image}
        style={{ maxWidth: 50, maxHeight: 50, margin: "auto" }}
      ></Card.Img>
      <Card.Title>{product.title}</Card.Title>
      <Card.Body>{product.description}</Card.Body>
      <Card.Text>{product.price}$</Card.Text>
      <Card.Footer>
        <Button onClick={buyClick}>Buy</Button>
      </Card.Footer>
    </Card>
  );
};
