import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Badge } from '../components/ui/badge';
import { ThemeToggle } from './theme_toggle';

export const Navbar = () => {
  const { totalItems } = useCart();

  return (
    <nav className="sticky top-0 z-50 bg-orange-100 border-b border-border shadow-soft">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <span className="text-2xl font-bold text-primary">FreshMart</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              to="/categories"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Categories
            </Link>
            <Link
              to="/cart"
              className="relative text-foreground hover:text-primary transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-600"
                >
                  {totalItems}
                </Badge>
              )}
            </Link>
            <ThemeToggle/>
          </div>
        </div>
      </div>
    </nav>
  );
};
