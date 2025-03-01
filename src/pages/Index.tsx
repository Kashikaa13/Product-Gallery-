
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import AddProductDialog from "@/components/AddProductDialog";
import EditProductDialog from "@/components/EditProductDialog";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
import SearchBar from "@/components/SearchBar";
import { Product } from "@/types/Product";
import { toast } from "sonner";
import { v4 as uuidv4 } from "@/lib/utils";

// Sample product data
const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    description: "High-quality sound with noise cancellation and long battery life.",
    price: 15999,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "2",
    name: "Smartwatch Pro",
    description: "Track your fitness, receive notifications, and monitor your health with this sleek smartwatch.",
    price: 12499,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=989&auto=format&fit=crop"
  },
  {
    id: "3",
    name: "Ultra-Thin Laptop",
    description: "Powerful performance in a lightweight design with all-day battery life.",
    price: 65999,
    imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1171&auto=format&fit=crop"
  },
  {
    id: "4",
    name: "Digital Camera",
    description: "Capture stunning photos and videos with this professional-grade camera.",
    price: 43999,
    imageUrl: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=1170&auto=format&fit=crop"
  },
  {
    id: "5",
    name: "Portable Bluetooth Speaker",
    description: "Take your music anywhere with this waterproof, durable speaker.",
    price: 5999,
    imageUrl: "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?q=80&w=1160&auto=format&fit=crop"
  },
  {
    id: "6",
    name: "Designer Sunglasses",
    description: "Stylish UV protection with premium materials and comfortable fit.",
    price: 7999,
    imageUrl: "https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=1170&auto=format&fit=crop"
  }
];

const Index = () => {
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(sampleProducts);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string>("");
  const [productNameToDelete, setProductNameToDelete] = useState<string>("");

  // Filter products when search term changes
  useEffect(() => {
    if (searchTerm) {
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchTerm, products]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleAddProduct = (newProduct: Omit<Product, "id">) => {
    const productWithId: Product = {
      ...newProduct,
      id: uuidv4(),
    };
    
    setProducts(prev => [...prev, productWithId]);
    setIsAddDialogOpen(false);
    toast.success("Product added successfully!");
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(prev => 
      prev.map(p => p.id === updatedProduct.id ? updatedProduct : p)
    );
    setEditingProduct(null);
    toast.success("Product updated successfully!");
  };

  const handleDeleteClick = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setProductToDelete(productId);
      setProductNameToDelete(product.name);
      setIsDeleteDialogOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    setProducts(prev => prev.filter(p => p.id !== productToDelete));
    setIsDeleteDialogOpen(false);
    toast.success("Product deleted successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 px-4 py-8 md:py-12">
      <div className="container mx-auto max-w-6xl animate-fade-in">
        <header className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Product Gallery</h1>
              <p className="text-muted-foreground mt-1">Browse and manage your products</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <SearchBar onSearch={handleSearch} />
              <Button 
                onClick={() => setIsAddDialogOpen(true)}
                className="flex gap-2 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300"
              >
                <PlusCircle size={20} />
                <span>Add Product</span>
              </Button>
            </div>
          </div>
          
          {searchTerm && (
            <div className="mb-4 animate-slide-up">
              <p className="text-sm text-muted-foreground">
                {filteredProducts.length === 0 
                  ? `No products found for "${searchTerm}"` 
                  : `Found ${filteredProducts.length} product${filteredProducts.length === 1 ? '' : 's'} for "${searchTerm}"`}
              </p>
            </div>
          )}
        </header>

        <main>
          {filteredProducts.length === 0 && !searchTerm ? (
            <div className="text-center py-20 bg-card/30 rounded-xl border border-border/30 backdrop-blur-sm animate-fade-in">
              <h2 className="text-2xl font-semibold mb-2">No products yet</h2>
              <p className="text-muted-foreground mb-6">Start by adding your first product</p>
              <Button 
                onClick={() => setIsAddDialogOpen(true)}
                className="gap-2"
              >
                <PlusCircle size={20} />
                <span>Add Product</span>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={handleEditProduct}
                  onDelete={handleDeleteClick}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Dialogs */}
      <AddProductDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={handleAddProduct}
      />
      
      <EditProductDialog
        product={editingProduct}
        isOpen={!!editingProduct}
        onClose={() => setEditingProduct(null)}
        onUpdate={handleUpdateProduct}
      />
      
      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        productName={productNameToDelete}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default Index;
