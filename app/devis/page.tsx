import React from 'react';
import type { Metadata } from 'next';
import { Mail, ShieldCheck, Clock, BadgeCheck } from 'lucide-react';
import { ContactForm } from '@/components/forms/ContactForm';

export const metadata: Metadata = {
  title: "Demande de Devis | Renovlux Groupe",
  description:
    "Obtenez un devis personnalisé pour votre projet (granit, marbre, quartz, cuisines, salles de bains). Réponse rapide et accompagnement premium.",
  openGraph: {
    title: "Demande de Devis | Renovlux Groupe",
    description:
      "Obtenez un devis personnalisé pour votre projet. Réponse rapide et accompagnement premium.",
    type: 'website',
    locale: 'fr_FR',
  },
};

export default function DevisPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="mb-8">
            <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-inset ring-amber-200">
              Devis gratuit et rapide
            </span>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Demande de Devis
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-gray-600">
              Décrivez votre projet et notre équipe vous répondra dans les meilleurs délais
              avec une estimation précise et un accompagnement personnalisé.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Infos / USP */}
            <div className="order-2 lg:order-1 lg:col-span-1">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-base font-semibold text-gray-900">Pourquoi demander un devis ?</h2>
                <ul className="mt-4 space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-3">
                    <BadgeCheck className="mt-0.5 h-4 w-4 text-amber-600" />
                    Estimation précise et personnalisée
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-4 w-4 text-amber-600" />
                    Réponse rapide sous 24 à 48h
                  </li>
                  <li className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 h-4 w-4 text-amber-600" />
                    Conseils d'experts et qualité premium
                  </li>
                </ul>

                <div className="mt-6 rounded-lg bg-amber-50 p-4 text-sm text-amber-800 ring-1 ring-inset ring-amber-200">
                  <p className="flex items-start gap-2">
                    <Mail className="mt-0.5 h-4 w-4" />
                    Vous pouvez aussi nous écrire directement: contact@renovlux-group.com
                  </p>
                </div>
              </div>
            </div>

            {/* Formulaire */}
            <div className="order-1 lg:order-2 lg:col-span-2">
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.85),rgba(255,255,255,0.95))] shadow-sm">
                <div className="border-b border-gray-200 bg-white/70 px-6 py-4">
                  <h2 className="text-base font-semibold text-gray-900">Votre projet</h2>
                </div>
                <div className="p-4 sm:p-6">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
