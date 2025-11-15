import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <Link to={`/product/${product.id}`}>
      <Card className="overflow-hidden hover:shadow-card transition-all duration-300 hover:-translate-y-1 border-border bg-card h-full flex flex-col">
        <div className="aspect-square relative overflow-hidden bg-accent">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-card-foreground mb-1">{product.name}</h3>
          <p className="text-sm text-muted-foreground mb-3">{product.unit}</p>
          <div className="mt-auto flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">{product.price.toFixed(2)}</span>
            <Button
              size="sm"
              onClick={handleAddToCart}
              className="bg-primary hover:bg-primary-hover text-primary-foreground"
              disabled={!product.inStock}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
};
