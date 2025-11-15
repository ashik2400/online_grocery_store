import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { ArrowLeft } from 'lucide-react';

export const CategoryProductsPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  
  const category = categories.find((cat) => cat.id === categoryId);
  const categoryProducts = products.filter((product) => product.category === categoryId);

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Category not found</h2>
            <Link to="/categories">
              <Button variant="outline">Back to Categories</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-background py-12">
        <div className="container mx-auto px-4">
          <Link to="/categories">
            <Button variant="ghost" className="mb-6 hover:bg-accent">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Categories
            </Button>
          </Link>
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">{category.name}</h1>
            <p className="text-muted-foreground text-lg">{category.description}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {categoryProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No products available in this category yet.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};
