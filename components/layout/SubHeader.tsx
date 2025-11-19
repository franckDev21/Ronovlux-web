"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ShoppingCart, Package, Tag, HelpCircle } from "lucide-react";
import { useProductSearch } from "@/hooks/useProducts";

const SuggestionItem: React.FC<{
  id: string;
  name: string;
  category?: string;
  onClick?: () => void;
}> = ({ id, name, category, onClick }) => (
  <Link
    href={`/shop?pid=${id}`}
    onClick={onClick}
    className="block px-3 py-2 hover:bg-gray-50 rounded-md"
  >
    <div className="text-sm font-medium text-gray-900 line-clamp-1">{name}</div>
    {category ? (
      <div className="text-xs text-gray-500">{category}</div>
    ) : null}
  </Link>
);

export const SubHeader: React.FC = () => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const { products, loading } = useProductSearch(query);

  const hasResults = useMemo(() => products && products.length > 0, [products]);

  return (
    <div className="fixed top-[68px] z-40 w-full border-b border-gray-200/40 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[52px] gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-xl">
            <div className="flex items-center gap-2 rounded-md border border-gray-200 bg-white/90 px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-amber-500/30">
              <Search className="h-4 w-4 text-gray-500" />
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setOpen(true);
                }}
                onFocus={() => setOpen(true)}
                placeholder="Rechercher un produit..."
                className="w-full bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
              />
            </div>

            {/* Suggestions dropdown */}
            {open && (query.length > 0 || loading) && (
              <div className="absolute left-0 right-0 mt-2 rounded-md border border-gray-200 bg-white/95 backdrop-blur-lg shadow-lg overflow-hidden max-h-80 overflow-y-auto">
                {loading ? (
                  <div className="px-3 py-3 text-sm text-gray-500">Recherche...</div>
                ) : hasResults ? (
                  <div className="py-1">
                    {products.slice(0, 8).map((p) => (
                      <SuggestionItem
                        key={p.id}
                        id={p.id}
                        name={p.name}
                        category={p.category}
                        onClick={() => setOpen(false)}
                      />
                    ))}
                    {products.length > 8 && (
                      <Link
                        href={`/shop?search=${encodeURIComponent(query)}`}
                        className="block px-3 py-2 text-sm text-amber-700 hover:bg-amber-50"
                        onClick={() => setOpen(false)}
                      >
                        Voir plus de résultats
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="px-3 py-3 text-sm text-gray-500">Aucun résultat</div>
                )}
              </div>
            )}
          </div>

          {/* Quick links */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-amber-700"
            >
              <Package className="h-4 w-4" />
              Boutique
            </Link>
            <Link
              href="/shop?category=promotions"
              className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-amber-700"
            >
              <Tag className="h-4 w-4" />
              Offres
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-amber-700"
            >
              <HelpCircle className="h-4 w-4" />
              Aide
            </Link>
          </div>

          {/* Cart indicator */}
          <CartIndicator />
        </div>
      </div>
    </div>
  );
};

const CartIndicator: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem("cartItems");
      if (raw) {
        const items = JSON.parse(raw);
        setCount(Array.isArray(items) ? items.length : 0);
      }
    } catch (e) {
      // ignore
    }

    const handler = () => {
      try {
        const raw = localStorage.getItem("cartItems");
        if (raw) {
          const items = JSON.parse(raw);
          setCount(Array.isArray(items) ? items.length : 0);
        } else {
          setCount(0);
        }
      } catch (e) {}
    };

    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return (
    <Link
      href="/shop/cart"
      className="relative inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm hover:border-amber-300 hover:text-amber-700"
    >
      <ShoppingCart className="h-4 w-4" />
      <span>Panier</span>
      <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-600 px-1 text-xs font-semibold text-white">
        {count}
      </span>
    </Link>
  );
};

export default SubHeader;
