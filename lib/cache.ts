// In-memory cache store for Next.js API routes to accelerate page transitions
interface CacheStore {
  products: { data: any; timestamp: number } | null;
  categories: { data: any; timestamp: number } | null;
  glimpses: { data: any; timestamp: number } | null;
}

const cache: CacheStore = {
  products: null,
  categories: null,
  glimpses: null,
};

const CACHE_TTL_MS = 60 * 1000; // 60 seconds

export const apiCache = {
  getProducts: () => {
    if (cache.products && Date.now() - cache.products.timestamp < CACHE_TTL_MS) {
      return cache.products.data;
    }
    return null;
  },
  setProducts: (data: any) => {
    cache.products = { data, timestamp: Date.now() };
  },
  invalidateProducts: () => {
    cache.products = null;
  },

  getCategories: () => {
    if (cache.categories && Date.now() - cache.categories.timestamp < CACHE_TTL_MS) {
      return cache.categories.data;
    }
    return null;
  },
  setCategories: (data: any) => {
    cache.categories = { data, timestamp: Date.now() };
  },
  invalidateCategories: () => {
    cache.categories = null;
  },

  getGlimpses: () => {
    if (cache.glimpses && Date.now() - cache.glimpses.timestamp < CACHE_TTL_MS) {
      return cache.glimpses.data;
    }
    return null;
  },
  setGlimpses: (data: any) => {
    cache.glimpses = { data, timestamp: Date.now() };
  },
  invalidateGlimpses: () => {
    cache.glimpses = null;
  },
};
