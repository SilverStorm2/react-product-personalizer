import styles from './Product.module.scss';
import PropTypes from 'prop-types';
import ProductImage from './ProductImage';
import ProductForm from './ProductForm';

const Product = ({
  name,
  title,
  basePrice,
  colors,
  sizes,
  currentColor,
  currentSize,
  onColorChange,
  onSizeChange,
}) => {
  const getPrice = () => {
    const activeSize = sizes.find(size => size.name === currentSize);
    return basePrice + (activeSize?.additionalPrice ?? 0);
  };

  const handleSubmit = event => {
    event.preventDefault();

    console.log('Product summary', {
      name: title,
      size: currentSize,
      color: currentColor,
      price: getPrice(),
    });
  };

  return (
    <article
      className={styles.product}
      data-current-color={currentColor}
      data-current-size={currentSize}
    >
      <ProductImage
        name={name}
        title={title}
        currentColor={currentColor}
      />
      <div>
        <header>
          <h2 className={styles.name}>{title}</h2>
          <span className={styles.price}>Price: {getPrice()}$</span>
        </header>
        <ProductForm
          colors={colors}
          sizes={sizes}
          currentColor={currentColor}
          currentSize={currentSize}
          onColorChange={onColorChange}
          onSizeChange={onSizeChange}
          onSubmit={handleSubmit}
        />
      </div>
    </article>
  )
};

Product.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  basePrice: PropTypes.number.isRequired,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  sizes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      additionalPrice: PropTypes.number.isRequired,
    })
  ).isRequired,
  currentColor: PropTypes.string.isRequired,
  currentSize: PropTypes.string.isRequired,
  onColorChange: PropTypes.func.isRequired,
  onSizeChange: PropTypes.func.isRequired,
};

export default Product;
