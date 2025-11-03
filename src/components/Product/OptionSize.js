import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './Product.module.scss';

const OptionSize = ({ sizes, currentSize, onSizeChange }) => (
  <div className={styles.sizes}>
    <h3 className={styles.optionLabel}>Sizes</h3>
    <ul className={styles.choices}>
      {sizes.map(size => (
        <li key={size.name}>
          <button
            type="button"
            className={clsx(currentSize === size.name && styles.active)}
            onClick={() => onSizeChange(size.name)}
          >
            {size.name}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

OptionSize.propTypes = {
  sizes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      additionalPrice: PropTypes.number.isRequired,
    })
  ).isRequired,
  currentSize: PropTypes.string.isRequired,
  onSizeChange: PropTypes.func.isRequired,
};

export default OptionSize;
