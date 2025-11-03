import { useMemo } from 'react';
import PropTypes from 'prop-types';
import styles from './Product.module.scss';

const ProductImage = ({ name, title, currentColor }) => {
  const productImageSrc = useMemo(() => {
    if (!name || !currentColor) {
      return `${process.env.PUBLIC_URL}/images/products/shirt-missing.jpg`;
    }

    return `${process.env.PUBLIC_URL}/images/products/shirt-${name}--${currentColor}.jpg`;
  }, [name, currentColor]);

  return (
    <div className={styles.imageContainer}>
      <img
        className={styles.image}
        alt={title}
        src={productImageSrc}
      />
    </div>
  );
};

ProductImage.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  currentColor: PropTypes.string.isRequired,
};

export default ProductImage;
