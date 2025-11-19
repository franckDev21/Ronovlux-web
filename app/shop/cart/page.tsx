'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { Product } from '@/types';
import { productsApi } from '@/lib/api/services';

export default function CartPage() {
  const [items, setItems] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const raw = localStorage.getItem('cartItems');
        if (!raw) {
          setItems([]);
          return;
        }
        const parsed = JSON.parse(raw);
        // Support either array of ids or array of products
        if (Array.isArray(parsed) && parsed.length > 0) {
          if (typeof parsed[0] === 'string') {
            const products = await Promise.all(
              parsed.map((id: string) => productsApi.getById(id).catch(() => null))
            );
            setItems(products.filter(Boolean) as Product[]);
          } else if (typeof parsed[0] === 'object' && parsed[0] !== null) {
            setItems(parsed as Product[]);
          } else {
            setItems([]);
          }
        } else {
          setItems([]);
        }
      } catch (e) {
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const subtotal = React.useMemo(() => {
    return items.reduce((acc, it) => acc + (typeof it.price === 'number' ? it.price : 0), 0);
  }, [items]);

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <ShoppingCart className="h-6 w-6" /> Panier
          </h1>
          <Link href="/shop" className="inline-flex items-center gap-2 text-sm text-amber-700 hover:underline">
            <ArrowLeft className="h-4 w-4" /> Continuer vos achats
          </Link>
        </div>

        <div className="mt-8">
          {loading && <div className="text-gray-500">Chargement du panier...</div>}

          {!loading && items.length === 0 && (
            <div className="rounded-md border border-dashed border-gray-300 p-8 text-center text-gray-600">
              Votre panier est vide.
              <div className="mt-4">
                <Link href="/shop" className="text-amber-700 hover:underline">Découvrir les produits</Link>
              </div>
            </div>
          )}

          {!loading && items.length > 0 && (
            <div className="grid grid-cols-1 gap-6">
              {items.map((p) => (
                <div key={p.id} className="flex items-center gap-4 rounded-lg border border-gray-200 p-4">
                  {p.images?.[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.images[0]} alt={p.name} className="h-16 w-16 rounded object-cover" />
                  ) : (
                    <div className="h-16 w-16 rounded bg-gray-100" />
                  )}
                  <div className="flex-1">
                    <div className="text-sm text-gray-500">{p.category}</div>
                    <div className="text-base font-medium text-gray-900">{p.name}</div>
                  </div>
                  {typeof p.price === 'number' && (
                    <div className="text-sm font-semibold text-gray-900">
                      {p.price.toLocaleString('fr-FR', { style: 'currency', currency: 'XOF' })}
                    </div>
                  )}
                </div>
              ))}

              <div className="flex items-center justify-between border-t pt-4">
                <div className="text-sm text-gray-600">Total articles: {items.length}</div>
                <div className="text-base font-semibold text-gray-900">
                  {subtotal.toLocaleString('fr-FR', { style: 'currency', currency: 'XOF' })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
