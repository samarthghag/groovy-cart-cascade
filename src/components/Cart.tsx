
import { X, Plus, Minus, ShoppingBag, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { CartItem } from "../hooks/useCart";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  totalPrice: number;
}

export const Cart = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  totalPrice,
}: CartProps) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-lg p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <SheetTitle className="text-xl font-semibold text-white flex items-center">
              <ShoppingBag className="h-5 w-5 mr-2" />
              Shopping Cart ({totalItems})
            </SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <ShoppingBag className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-600 mb-4">Add some products to get started</p>
                <Button onClick={onClose} className="bg-gradient-to-r from-blue-600 to-purple-600">
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <Card key={item.product.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex space-x-4">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 line-clamp-2 mb-1">
                            {item.product.name}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">
                            ${item.product.price.toFixed(2)} each
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                                className="h-8 w-8 p-0"
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="px-3 py-1 bg-gray-100 rounded text-sm font-medium">
                                {item.quantity}
                              </span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                className="h-8 w-8 p-0"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => onRemoveItem(item.product.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-lg text-blue-600">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t bg-gray-50 p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total:</span>
                  <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Proceed to Checkout
                  </Button>
                  <Button variant="outline" className="w-full" onClick={onClose}>
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
