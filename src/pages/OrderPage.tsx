import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';
import { CheckCircle } from 'lucide-react';

export const OrderPage = () => {
  const navigate = useNavigate();
  const { cart, totalPrice, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPlaced(true);
    
    setTimeout(() => {
      clearCart();
      toast.success('Order placed successfully!');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }, 1500);
  };

  if (cart.length === 0 && !orderPlaced) {
    navigate('/cart');
    return null;
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center bg-background">
          <div className="text-center">
            <CheckCircle className="h-24 w-24 mx-auto mb-6 text-primary" />
            <h2 className="text-3xl font-bold text-foreground mb-4">Order Placed Successfully!</h2>
            <p className="text-muted-foreground mb-8">Thank you for shopping with FreshMart</p>
            <p className="text-muted-foreground">Redirecting to home page...</p>
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
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-foreground mb-8">Checkout</h1>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="p-6 border-border bg-card">
              <h2 className="text-2xl font-bold text-card-foreground mb-6">Delivery Information</h2>
              
              <form onSubmit={handlePlaceOrder} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" required className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" required className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="address">Delivery Address</Label>
                  <Input id="address" required className="mt-1" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="zip">Postal Code</Label>
                    <Input id="zip" required className="mt-1" />
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full mt-6 bg-primary hover:bg-primary-hover text-primary-foreground">
                  Place Order
                </Button>
              </form>
            </Card>
            <Card className="p-6 border-border bg-card h-fit">
              <h2 className="text-2xl font-bold text-card-foreground mb-6">Order Summary</h2>
              <div className="space-y-3 mb-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-foreground">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="font-semibold text-foreground">
                      {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <Separator className="my-4 bg-border" />
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery</span>
                  <span>5.00</span>
                </div>
              </div>

              <Separator className="my-4 bg-border" />
              <div className="flex justify-between text-xl font-bold text-card-foreground">
                <span>Total</span>
                <span className="text-primary">{(totalPrice + 5).toFixed(2)}</span>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
