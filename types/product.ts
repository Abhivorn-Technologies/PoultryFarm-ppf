export interface ProductSubType {
  title: string;
  description: string;
}

export interface Product {
  id: number;
  itemNumber: number; // Official numbered client entry (1 -> 90)
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  shortDescription: string;
  description: string;
  details: string[];
  subTypes?: ProductSubType[];
  specifications?: Record<string, string>;
  breedInformation?: Record<string, string>;
  image: string;
  gallery?: string[];
  price: number | null; // null represents "Price on Request"
  priceDisplay: string; // "Price on Request"
  unit?: string;
  available: boolean;
  featured?: boolean;
  isPopular?: boolean;
  dataReviewRequired?: string;
  tags: string[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  image: string;
  itemCount: number;
  badge?: string;
}

export interface CartItem {
  id: string;
  productId: number;
  product: Product;
  quantity: number;
}
