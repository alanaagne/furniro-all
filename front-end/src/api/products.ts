import type { PaginatedResponse } from "@app-types/pagination";
import type {
  ApiProduct,
  Product,
  ProductQueryParams,
} from "@app-types/product";
import { formatPrice } from "@utils/formatPrice";
import { API_BASE_URL, apiFetch } from "./http";

export function buildImageUrl(path: string) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  if (path.startsWith("/")) return `${API_BASE_URL}${path}`;
  return `${API_BASE_URL}/images/${path}`;
}

export function mapApiProductToProduct(product: ApiProduct): Product {
  return {
    id: product.id,
    sku: product.sku,
    name: product.name,
    category: product.category,
    description: product.description,
    image: buildImageUrl(product.image),
    gallery: product.gallery.map(buildImageUrl),
    colors: product.colors,
    sizes: product.sizes,
    badge: product.badge,
    badgeColor: product.badgeColor,
    complementaryDescription: product.complementaryDescription,
    additionalInfo: product.additionalInfo,
    price: formatPrice(product.finalPrice),
    oldPrice: product.discount > 0 ? formatPrice(product.price) : null,
  };
}

export async function getProducts(params?: ProductQueryParams) {
  const response = await apiFetch<PaginatedResponse<ApiProduct>>("/products", {
    params: params as Record<string, unknown>,
  });

  return {
    ...response,
    data: response.data.map(mapApiProductToProduct),
  };
}

export async function getProduct(identifier: string | number) {
  const product = await apiFetch<ApiProduct>(`/products/${identifier}`);
  return mapApiProductToProduct(product);
}