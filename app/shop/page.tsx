'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useProducts } from '@/hooks/useProducts';
import { FilterOptions, PaginationOptions, Product } from '@/types';

export default function ShopPage() {
  const params = useSearchParams();
  const router = useRouter();

  // Read params
  const searchParam = params.get('search') || '';
  const categoryParam = params.get('category') || '';
  const sortByParam = (params.get('sortBy') || 'createdAt') as FilterOptions['sortBy'];
  const sortOrderParam = (params.get('sortOrder') || 'desc') as NonNullable<FilterOptions['sortOrder']>;
  const pageParam = Number(params.get('page') || '1');
  const limitParam = Number(params.get('limit') || '12');

  // Local UI state for search input with debounce
  const [searchInput, setSearchInput] = useState(searchParam);
  useEffect(() => {
    setSearchInput(searchParam);
  }, [searchParam]);

  const { products, loading, error, pagination } = useProducts({
    search: searchParam || undefined,
    category: categoryParam || undefined,
    sortBy: sortByParam,
    sortOrder: sortOrderParam,
    page: pageParam,
    limit: limitParam,
  } as FilterOptions & PaginationOptions);

  // Fallback: 8 fake products when none are available or in case of error
  const FAKE_PRODUCTS: Product[] = useMemo(() =>
    Array.from({ length: 8 }).map((_, i) => ({
      id: `fake-${i + 1}`,
      name: `Produit d'exemple ${i + 1}`,
      description: 'Description de démonstration pour ce produit.',
      category: 'Démo',
      images: ['/assets/logo.png'],
      specifications: {},
      price: 199 + i * 10,
      availability: 'available',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })),
  []);

  const displayProducts: Product[] = useMemo(() => {
    if (Array.isArray(products) && products.length > 0 && !error) return products;
    return FAKE_PRODUCTS;
  }, [products, error, FAKE_PRODUCTS]);

  // Build categories from loaded products (fallback to empty)
  const categories = useMemo(() => {
    const set = new Set<string>();
    (products || []).forEach((p) => p.category && set.add(p.category));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [products]);

  const updateQuery = (update: Record<string, string | number | undefined>) => {
    const q = new URLSearchParams(params.toString());
    Object.entries(update).forEach(([k, v]) => {
      if (v === undefined || v === '' || v === null) q.delete(k);
      else q.set(k, String(v));
    });
    // Reset to page 1 when filters change
    if ('search' in update || 'category' in update || 'sortBy' in update || 'sortOrder' in update || 'limit' in update) {
      q.set('page', '1');
    }
    router.push(`/shop?${q.toString()}`);
  };

  // Debounce search updates
  useEffect(() => {
    const t = setTimeout(() => {
      if (searchInput !== searchParam) updateQuery({ search: searchInput || undefined });
    }, 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  const onChangeCategory = (value: string) => updateQuery({ category: value || undefined });
  const onChangeSort = (value: string) => {
    const [by, order] = value.split(':');
    updateQuery({ sortBy: by, sortOrder: order });
  };
  const onChangeLimit = (value: number) => updateQuery({ limit: value });
  const goToPage = (p: number) => updateQuery({ page: Math.max(1, p) });

  const sortValue = `${sortByParam}:${sortOrderParam}`;

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex flex-col gap-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Boutique</h1>
              <p className="mt-1 text-sm text-gray-600">
                {pagination ? (
                  <>
                    {pagination.total} produits • Page {pagination.page}/{pagination.totalPages}
                  </>
                ) : (
                  <>Découvrez nos produits</>
                )}
              </p>
            </div>
            <Link href="/" className="text-sm text-amber-700 hover:underline">Retour à l&apos;accueil</Link>
          </div>

          {/* Controls */}
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-1 flex-col sm:flex-row gap-3">
              <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Rechercher dans la boutique..."
                className="w-full sm:w-1/2 rounded-md border border-gray-200 bg-white/90 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              />
              <select
                value={categoryParam}
                onChange={(e) => onChangeCategory(e.target.value)}
                className="w-full sm:w-56 rounded-md border border-gray-200 bg-white/90 px-3 py-2 text-sm shadow-sm focus:outline-none"
              >
                <option value="">Toutes les catégories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={sortValue}
                onChange={(e) => onChangeSort(e.target.value)}
                className="rounded-md border border-gray-200 bg-white/90 px-3 py-2 text-sm shadow-sm focus:outline-none"
              >
                <option value="createdAt:desc">Nouveautés</option>
                <option value="price:asc">Prix: croissant</option>
                <option value="price:desc">Prix: décroissant</option>
                <option value="name:asc">Nom: A-Z</option>
                <option value="name:desc">Nom: Z-A</option>
              </select>
              <select
                value={limitParam}
                onChange={(e) => onChangeLimit(Number(e.target.value))}
                className="rounded-md border border-gray-200 bg-white/90 px-3 py-2 text-sm shadow-sm focus:outline-none"
              >
                {[12, 18, 24, 36].map((n) => (
                  <option key={n} value={n}>{n}/page</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-8">
          {/* Loading Skeleton */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: limitParam }).map((_, i) => (
                <div key={i} className="animate-pulse rounded-lg border border-gray-200 p-4">
                  <div className="h-40 w-full rounded-md bg-gray-100" />
                  <div className="mt-3 h-4 w-24 bg-gray-100 rounded" />
                  <div className="mt-2 h-5 w-40 bg-gray-100 rounded" />
                </div>
              ))}
            </div>
          )}
          {error && <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}. Affichage d&apos;exemples.</div>}

          {!loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}

          {!loading && Array.isArray(products) && products.length === 0 && !error && (
            <div className="rounded-md border border-dashed border-gray-300 p-8 text-center text-gray-600">
              Aucun produit trouvé. Voici quelques exemples.
            </div>
          )}

          {/* Pagination */}
          {!loading && !error && pagination && pagination.totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-3">
              <button
                onClick={() => goToPage(pageParam - 1)}
                disabled={pageParam <= 1}
                className="rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 disabled:opacity-50"
              >
                Précédent
              </button>
              <div className="text-sm text-gray-600">Page {pagination.page} sur {pagination.totalPages}</div>
              <button
                onClick={() => goToPage(pageParam + 1)}
                disabled={pageParam >= pagination.totalPages}
                className="rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 disabled:opacity-50"
              >
                Suivant
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function ProductCard({ product }: { product: Product }) {
  const hasImage = Boolean(product.images?.[0]);

  const addToCart = (p: Product) => {
    try {
      const raw = localStorage.getItem('cartItems');
      let items: any[] = [];
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) items = parsed;
      }
      // Store only IDs to keep it light
      if (!items.includes(p.id)) items.push(p.id);
      localStorage.setItem('cartItems', JSON.stringify(items));
      // Fire a storage event for other tabs/components
      window.dispatchEvent(new Event('storage'));
    } catch {}
  };

  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-200/60 bg-white/80 backdrop-blur-sm shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:border-amber-200">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {/* Image */}
        {hasImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.images![0]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-gray-100 to-gray-200" />
        )}

        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-transparent opacity-60" />

        {/* Availability badge */}
        {product.availability && (
          <div className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-gray-700 shadow-sm">
            {product.availability === 'available' && 'En stock'}
            {product.availability === 'limited' && 'Stock limité'}
            {product.availability === 'unavailable' && 'Indisponible'}
          </div>
        )}

        {/* Hover actions */}
        <div className="absolute inset-x-3 bottom-3 flex translate-y-4 items-center justify-between gap-2 rounded-lg bg-white/90 px-3 py-2 opacity-0 shadow-sm backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="text-sm font-semibold text-gray-900">
            {typeof product.price === 'number'
              ? product.price.toLocaleString('fr-FR', { style: 'currency', currency: 'XOF' })
              : '—'}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="inline-flex items-center justify-center rounded-md bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-amber-700"
          >
            Ajouter au panier
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-1 text-[11px] font-medium text-amber-700 ring-1 ring-inset ring-amber-200">
            {product.category}
          </span>
          {typeof product.price === 'number' && (
            <span className="text-sm font-semibold text-gray-900">
              {product.price.toLocaleString('fr-FR', { style: 'currency', currency: 'XOF' })}
            </span>
          )}
        </div>
        <h3 className="mt-2 line-clamp-1 text-[15px] font-semibold text-gray-900">{product.name}</h3>
        {product.material && (
          <div className="mt-1 text-xs text-gray-500">Matériau: {product.material}</div>
        )}
      </div>
    </div>
  );
}
