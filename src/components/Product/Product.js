import { useEffect, useMemo, useState } from 'react';
import styles from './Product.module.scss';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Button from '../Button/Button';

const Product = ({ name, title, basePrice, colors, sizes }) => {
  const [currentColor, setCurrentColor] = useState(() => colors?.[0] ?? '');
  const [currentSize, setCurrentSize] = useState(() => sizes?.[0]?.name ?? '');

  useEffect(() => {
    setCurrentColor(colors?.[0] ?? '');
  }, [colors]);

  useEffect(() => {
    setCurrentSize(sizes?.[0]?.name ?? '');
  }, [sizes]);

  const productImageSrc = useMemo(() => {
    if (!name || !currentColor) {
      return `${process.env.PUBLIC_URL}/images/products/shirt-missing.jpg`;
    }

    return `${process.env.PUBLIC_URL}/images/products/shirt-${name}--${currentColor}.jpg`;
  }, [name, currentColor]);

  const prepareColorClassName = color => {
    if (!color) return '';

    const normalized = `${color[0]?.toUpperCase() ?? ''}${color.slice(1).toLowerCase()}`;
    return styles[`color${normalized}`];
  };

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
      <div className={styles.imageContainer}>
        <img 
          className={styles.image}
          alt={title}
          src={productImageSrc} />
      </div>
      <div>
        <header>
          <h2 className={styles.name}>{title}</h2>
          <span className={styles.price}>Price: {getPrice()}$</span>
        </header>
        <form onSubmit={handleSubmit}>
          <div className={styles.sizes}>
            <h3 className={styles.optionLabel}>Sizes</h3>
            <ul className={styles.choices}>
              {sizes.map(size => (
                <li key={size.name}>
                  <button
                    type="button"
                    className={clsx(currentSize === size.name && styles.active)}
                    onClick={() => setCurrentSize(size.name)}
                  >
                    {size.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.colors}>
            <h3 className={styles.optionLabel}>Colors</h3>
            <ul className={styles.choices}>
              {colors.map(color => (
                <li key={color}>
                  <button
                    type="button"
                    className={clsx(
                      prepareColorClassName(color),
                      currentColor === color && styles.active
                    )}
                    onClick={() => setCurrentColor(color)}
                  />
                </li>
              ))}
            </ul>
          </div>
          <Button type="submit" className={styles.button}>
            <span className="fa fa-shopping-cart" />
          </Button>
        </form>
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
};

export default Product;
