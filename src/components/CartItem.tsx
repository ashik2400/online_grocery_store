import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { CartItem as CartItemType } from '../context/CartContext';
import { useCart } from '../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <Card className="p-4 border-border bg-card">
      <div className="flex gap-4">
        <img
          src={item.image}
          alt={item.name}
          className="w-24 h-24 object-cover rounded-lg bg-accent"
        />
        <div className="flex-grow">
          <h3 className="font-bold text-lg text-card-foreground">{item.name}</h3>
          <p className="text-primary font-semibold">{item.price.toFixed(2)}</p>
          <div className="flex items-center gap-3 mt-3">
            <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="h-8 w-8 p-0 hover:bg-accent"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-semibold text-foreground">{item.quantity}</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="h-8 w-8 p-0 hover:bg-accent"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => removeFromCart(item.id)}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-foreground">
            {(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </Card>
  );
};
