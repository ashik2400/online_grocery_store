import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

export const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const { addToCart } = useCart();
  
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Product not found</h2>
            <Link to="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-background py-12">
        <div className="container mx-auto px-4">
          <Link to={`/category/${product.category}`}>
            <Button variant="ghost" className="mb-6 hover:bg-accent">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Category
            </Button>
          </Link>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="aspect-square bg-accent rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col">
              <h1 className="text-4xl font-bold text-foreground mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-primary">
                  {product.price.toFixed(2)}
                </span>
                <span className="text-muted-foreground">/ {product.unit}</span>
                {product.inStock ? (
                  <Badge className="bg-primary text-primary-foreground">In Stock</Badge>
                ) : (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </div>

              <p className="text-foreground text-lg mb-8 leading-relaxed">
                {product.description}
              </p>

              <div className="mt-auto">
                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="w-full md:w-auto bg-primary hover:bg-primary-hover text-primary-foreground"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
