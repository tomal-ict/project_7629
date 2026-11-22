import React from 'react';
import { useSite } from '../context/SiteContext';
import { Building2, Rocket } from 'lucide-react';

export default function Clients() {
  const { settings, clients, pilots } = useSite();

  if ((!clients || clients.length === 0) && (!pilots || pilots.length === 0)) return null;

  return (
    <section className="py-16 border-t border-slate-800/80 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enterprise Clients */}
        {clients && clients.length > 0 && (
          <div className="mb-14">
            <div className="text-center mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-500">
                {settings.clients_tag || 'TRUSTED BY'}
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                {settings.clients_title || 'Our Clients'}
              </h3>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
              {clients.map((c) => (
                <div
                  key={c.id}
                  className="px-6 py-4 rounded-xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-700 transition-all flex items-center gap-3 text-slate-300 hover:text-white"
                >
                  <Building2 className="w-5 h-5 text-cyan-400" />
                  <span className="font-semibold text-sm">{c.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Running Pilots */}
        {pilots && pilots.length > 0 && (
          <div>
            <div className="text-center mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">
                DEPLOYED PROOFS OF CONCEPT
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                {settings.pilots_title || 'Pilot Running'}
              </h3>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
              {pilots.map((p) => (
                <div
                  key={p.id}
                  className="px-6 py-4 rounded-xl bg-slate-900/40 border border-indigo-900/40 hover:border-indigo-600/50 transition-all flex items-center gap-3 text-slate-300 hover:text-indigo-200"
                >
                  <Rocket className="w-5 h-5 text-indigo-400" />
                  <span className="font-semibold text-sm">{p.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
