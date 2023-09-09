import Loader from '@/components/Common/Loader';
import ProductPageActions from '@/components/ProductPage/ProductPageActions';
import ProductPageDetails from '@/components/ProductPage/ProductPageDetails';
import ProductPageImages from '@/components/ProductPage/ProductPageImages';
import { ProductContext } from '@/contexts/productContext';
import { useRest } from '@/services';
import { Product } from '@/services/products/types';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

export default function ProductView() {
  const api = useRest();
  const { id } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  async function getProduct() {
    if (!id) return;

    try {
      const response = await api.products.getProduct(id);

      if (response) {
        setProduct(response);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProduct();
  }, []);

  if (loading) {
    return (
      <div className="full-center h-screen">
        <Loader />
      </div>
    );
  }

  if (!product) {
    return <Navigate to={'/'} />;
  }

  return (
    <ProductContext.Provider value={product}>
      <div></div>

      <div className="grid w-full grid-cols-3 gap-10">
        <ProductPageImages />
        <ProductPageDetails />
        <ProductPageActions />
      </div>
    </ProductContext.Provider>
  );
}
