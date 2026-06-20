import { Zap, ShieldCheck, Clock, Headphones, Wallet, BadgeCheck } from "lucide-react";

export function WhyUs() {
  const reasons = [
    {
      icon: Zap,
      title: "Livraison instantanée",
      desc: "Recharges et codes envoyés en 5 à 30 minutes après confirmation du paiement Wave. Comptes livrés en moins d'1 heure.",
      color: "bg-amber-100 text-amber-700",
    },
    {
      icon: Wallet,
      title: "Paiement Wave facile",
      desc: "Payez en 1 clic via Wave, le mobile money n°1 au Sénégal. Aucun frais caché, montant exact à envoyer.",
      color: "bg-sky-100 text-sky-700",
    },
    {
      icon: ShieldCheck,
      title: "100% sécurisé",
      desc: "Comptes vérifiés et garantis. Codes cartes cadeaux neufs et authentiques. Remboursement en cas de problème.",
      color: "bg-green-100 text-green-700",
    },
    {
      icon: BadgeCheck,
      title: "Meilleurs prix",
      desc: "Tarifs les plus bas du marché sénégalais. Promos régulières et codes de réduction sur WhatsApp.",
      color: "bg-purple-100 text-purple-700",
    },
    {
      icon: Headphones,
      title: "Support 24/7",
      desc: "Une question ? Notre équipe répond sur WhatsApp à toute heure, tous les jours. Aide personnalisée.",
      color: "bg-pink-100 text-pink-700",
    },
    {
      icon: Clock,
      title: "+5 ans d'expérience",
      desc: "Plus de 2 000 clients satisfaits depuis 2020. Boutique de confiance recommandée par la communauté gaming.",
      color: "bg-indigo-100 text-indigo-700",
    },
  ];

  return (
    <section id="pourquoi" className="py-16 md:py-20 bg-gradient-to-b from-sky-50 to-white scroll-mt-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <span className="inline-block bg-sky-100 text-sky-800 text-sm font-medium px-3 py-1 rounded-full mb-3">
            Pourquoi nous choisir
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900">
            La boutique gaming de confiance au Sénégal
          </h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            Depuis 2020, GAME SHOP 221 accompagne les gamers sénégalais avec des
            produits authentiques, des prix imbattables et un service client
            réactif. Voici pourquoi nous restons le premier choix.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <div
                key={i}
                className="group bg-white rounded-2xl p-6 border border-slate-100 hover:border-sky-200 hover:shadow-lg transition-all"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${reason.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">
                  {reason.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {reason.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
