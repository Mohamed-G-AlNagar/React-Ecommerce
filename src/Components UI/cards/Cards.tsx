// import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import Card from '../card/Card';
import { IProduct } from '../../models/product';
// import Spinner from '../spinner/Spinner';
import toast from 'react-hot-toast';
import Spinner from '../spinner/Spinner';
import { useFilteredCategProducts } from '../../hooks/filteredProductsHooks';

// prettier-ignore
function Cards({ selectedCategory = 'All'}: {selectedCategory: string }) {
  
  const { fiteredProducts, isLoading, error } =
    useFilteredCategProducts(selectedCategory);


  if (isLoading) return <Spinner />;
  if (error) toast.error(error.message);

  return (
    <div className="container-fluid my-2 text-center">
      <h4 className="mt-2 mb-2">
        <strong> {selectedCategory} products</strong>
      </h4>
      <div className="container py-2">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
          {fiteredProducts?.map((product: IProduct) => (
            <Card product={product} key={product.productName} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cards;
