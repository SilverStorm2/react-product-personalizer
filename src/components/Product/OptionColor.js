import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './Product.module.scss';

const normalizeColor = color => {
  if (!color) return '';

  const normalized = `${color[0]?.toUpperCase() ?? ''}${color.slice(1).toLowerCase()}`;
  return styles[`color${normalized}`];
};

const OptionColor = ({ colors, currentColor, onColorChange }) => (
  <div className={styles.colors}>
    <h3 className={styles.optionLabel}>Colors</h3>
    <ul className={styles.choices}>
      {colors.map(color => (
        <li key={color}>
          <button
            type="button"
            className={clsx(
              normalizeColor(color),
              currentColor === color && styles.active
            )}
            onClick={() => onColorChange(color)}
          />
        </li>
      ))}
    </ul>
  </div>
);

OptionColor.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentColor: PropTypes.string.isRequired,
  onColorChange: PropTypes.func.isRequired,
};

export default OptionColor;
