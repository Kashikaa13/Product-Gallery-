import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Product } from "@/types/Product";
import { Trash2 } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
  const { id, name, description, price, imageUrl } = product;

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

  return (
    <Card className="overflow-hidden rounded-xl border border-border/40 bg-card/60 backdrop-blur-sm product-card shadow-sm hover:shadow-md transition-all duration-300 animate-scale-in">
      <div 
        className="product-image-container relative h-48 cursor-pointer"
        onClick={() => onEdit(product)}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
          <span className="text-white bg-black/40 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
            Edit Details
          </span>
        </div>
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={name}
          className="product-image w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg";
          }}
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium text-lg line-clamp-1 mb-1">{name}</h3>
        <p className="text-muted-foreground text-sm line-clamp-2 h-10">{description}</p>
        <p className="font-semibold text-primary mt-2">{formattedPrice}</p>
      </CardContent>
      <CardFooter className="pt-0 px-4 pb-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full gap-2 text-destructive hover:text-destructive-foreground hover:bg-destructive border border-destructive/20"
          onClick={() => onDelete(id)}
        >
          <Trash2 size={16} />
          <span>Delete</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
