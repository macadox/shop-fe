export type ProductIdType = string;

export type GetAllProductsItem = {
  id: ProductIdType;
  slug: string;
  name: string;
  price: number;
  src: string;
  favorited: boolean;
  category: string;
  materials?: string[];
  sizes?: string[];
  colors?: string[];
};

export type GetAllProductsResponse = GetAllProductsItem[];

export type ProductWidgetType = {
  id: ProductIdType;
  slug: string;
  name: string;
  price: number;
  src: string;
  favorited: boolean;
};
