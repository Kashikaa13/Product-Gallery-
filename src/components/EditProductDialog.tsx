import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Product } from "@/types/Product";
import { toast } from "sonner";

interface EditProductDialogProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedProduct: Product) => void;
}

const EditProductDialog: React.FC<EditProductDialogProps> = ({ product, isOpen, onClose, onUpdate }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price.toString());
      setImageUrl(product.imageUrl);
    }
  }, [product]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!product) return;
    
    if (!name.trim()) {
      toast.error("Product name is required");
      return;
    }
    
    if (isNaN(Number(price)) || Number(price) <= 0) {
      toast.error("Please enter a valid price");
      return;
    }
    
    setIsSubmitting(true);
    
    const updatedProduct: Product = {
      ...product,
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      imageUrl: imageUrl.trim()
    };
    
    onUpdate(updatedProduct);
    setIsSubmitting(false);
  };
  
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] rounded-xl backdrop-blur-sm bg-card/95 border-border/40 animate-fade-in">
        <DialogHeader>
          <DialogTitle className="text-xl">Edit Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Product Name</Label>
            <Input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-background/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="resize-none h-20 bg-background/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-price">Price (₹)</Label>
            <Input
              id="edit-price"
              type="number"
              min="0.01"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="bg-background/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-imageUrl">Image URL</Label>
            <Input
              id="edit-imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="bg-background/50"
            />
          </div>
          <div className="pt-2 space-x-2 flex justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Product"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialog;
