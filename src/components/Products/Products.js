import { useEffect, useState } from 'react';
import productsData from '../../data/products';
import Product from '../Product/Product';

const Products = () => {
  const [products] = useState(productsData);
  const [selections, setSelections] = useState(() => {
    const initialSelections = {};

    productsData.forEach(product => {
      initialSelections[product.id] = {
        currentColor: product.colors?.[0] ?? '',
        currentSize: product.sizes?.[0]?.name ?? '',
      };
    });

    return initialSelections;
  });

  useEffect(() => {
    setSelections(prevSelections => {
      const nextSelections = { ...prevSelections };

      products.forEach(product => {
        const defaultColor = product.colors?.[0] ?? '';
        const defaultSize = product.sizes?.[0]?.name ?? '';
        const prevSelection = prevSelections[product.id] ?? {};

        const normalizedColor = product.colors?.includes(prevSelection.currentColor)
          ? prevSelection.currentColor
          : defaultColor;
        const normalizedSize = product.sizes?.some(size => size.name === prevSelection.currentSize)
          ? prevSelection.currentSize
          : defaultSize;

        nextSelections[product.id] = {
          currentColor: normalizedColor,
          currentSize: normalizedSize,
        };
      });

      return nextSelections;
    });
  }, [products]);

  const handleColorChange = (productId, color, defaultSize) => {
    setSelections(prevSelections => ({
      ...prevSelections,
      [productId]: {
        ...(prevSelections[productId] ?? {}),
        currentColor: color,
        currentSize: prevSelections[productId]?.currentSize ?? defaultSize,
      },
    }));
  };

  const handleSizeChange = (productId, size, defaultColor) => {
    setSelections(prevSelections => ({
      ...prevSelections,
      [productId]: {
        ...(prevSelections[productId] ?? {}),
        currentColor: prevSelections[productId]?.currentColor ?? defaultColor,
        currentSize: size,
      },
    }));
  };

  return (
    <section>
      {products.map(product => (
        <Product
          key={product.id}
          {...product}
          currentColor={selections[product.id]?.currentColor ?? product.colors?.[0] ?? ''}
          currentSize={selections[product.id]?.currentSize ?? product.sizes?.[0]?.name ?? ''}
          onColorChange={color => handleColorChange(product.id, color, product.sizes?.[0]?.name ?? '')}
          onSizeChange={size => handleSizeChange(product.id, size, product.colors?.[0] ?? '')}
        />
      ))}
    </section>
  );
};

export default Products;
