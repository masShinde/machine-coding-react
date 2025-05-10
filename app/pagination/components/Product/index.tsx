import type { ProductPropTypes } from "./ProductPropTypes";
import "./styles.css"

function Product(props: ProductPropTypes) {
  const { img, title, description, price } = props;

  return (
    <div className="product-container">
      <div className=" product-img-container">
        <img className="product-img" src={img} alt={title} />
      </div>
      <div className="product-title">{title}</div>
      <div className="product-description">{description}</div>
      <div className="product-price">{price}</div>
    </div>
  );
}

export default Product;
