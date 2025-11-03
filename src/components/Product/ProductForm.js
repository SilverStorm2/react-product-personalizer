import PropTypes from 'prop-types';
import Button from '../Button/Button';
import styles from './Product.module.scss';
import OptionColor from './OptionColor';
import OptionSize from './OptionSize';

const ProductForm = ({
  colors,
  sizes,
  currentColor,
  currentSize,
  onColorChange,
  onSizeChange,
  onSubmit,
}) => (
  <form onSubmit={onSubmit}>
    <OptionColor
      colors={colors}
      currentColor={currentColor}
      onColorChange={onColorChange}
    />
    <OptionSize
      sizes={sizes}
      currentSize={currentSize}
      onSizeChange={onSizeChange}
    />
    <Button type="submit" className={styles.button}>
      <span className="fa fa-shopping-cart" />
    </Button>
  </form>
);

ProductForm.propTypes = {
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
  onSubmit: PropTypes.func.isRequired,
};

export default ProductForm;
