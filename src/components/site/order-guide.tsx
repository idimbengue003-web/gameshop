import { Card } from "@/components/ui/card";
import { Waves, Lock, Package, Zap, ArrowRight, Clock } from "lucide-react";

export function OrderGuide() {
  const steps = [
    {
      num: "1",
      icon: Package,
      title: "Choisissez votre produit",
      desc: "Parcourez le catalogue : comptes, recharges UC/diamants/VP ou cartes cadeaux. Repérez le badge ⚡ pour les produits à livraison automatique.",
      color: "from-sky-500 to-sky-600",
    },
    {
      num: "2",
      icon: Waves,
      title: "Payez via Wave",
      desc: "Cliquez sur « Ouvrir Wave » dans la fenêtre de commande. Envoyez le montant exact au numéro affiché (copiable en 1 clic).",
      color: "from-cyan-500 to-sky-600",
    },
    {
      num: "3",
      icon: Zap,
      title: "Recevez votre commande",
      desc: "Cliquez sur « J'ai payé ». Pour les produits ⚡, votre code/compte s'affiche immédiatement. Sinon, traitement sous le délai indiqué.",
      color: "from-amber-500 to-orange-500",
    },
  ];

  return (
    <section
      id="guide"
      className="py-16 md:py-20 bg-white border-t border-sky-50 scroll-mt-20"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <span className="inline-block bg-sky-100 text-sky-800 text-sm font-medium px-3 py-1 rounded-full mb-3">
            Comment commander
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900">
            Commandez en 3 étapes simples
          </h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            Pas besoin de WhatsApp. Pas besoin d'attendre. Réglez avec Wave et
            recevez votre commande{" "}
            <strong className="text-amber-600">automatiquement sur le site ⚡</strong>
            .
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* Ligne pointillée entre les étapes (desktop) */}
          <div className="hidden md:block absolute top-16 left-[16%] right-[16%] h-0.5 border-t-2 border-dashed border-sky-200" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="relative">
                <Card className="relative h-full p-6 text-center border-slate-100 hover:shadow-lg transition-shadow bg-white">
                  {/* Cercle numéro */}
                  <div className="relative mx-auto w-16 h-16 mb-4">
                    <div
                      className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.color} shadow-lg flex items-center justify-center`}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white border-2 border-sky-200 flex items-center justify-center text-xs font-black text-sky-700">
                      {step.num}
                    </div>
                  </div>

                  <h3 className="font-bold text-lg text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </Card>

                {/* Flèche entre étapes (mobile) */}
                {i < steps.length - 1 && (
                  <div className="md:hidden flex justify-center my-3">
                    <ArrowRight className="h-5 w-5 text-sky-400 rotate-90" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bandeau explicatif livraison */}
        <div className="mt-10 grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          <div className="rounded-xl bg-amber-50 border-2 border-amber-200 p-5">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-5 w-5 text-amber-600 fill-amber-500" />
              <h3 className="font-bold text-amber-900">
                Produits ⚡ Instantané
              </h3>
            </div>
            <p className="text-sm text-amber-800">
              Le contenu (code, identifiants compte) s'affiche immédiatement sur
              le site après confirmation du paiement Wave. Aucune attente, aucun
              échange.
            </p>
          </div>

          <div className="rounded-xl bg-sky-50 border-2 border-sky-200 p-5">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-sky-600" />
              <h3 className="font-bold text-sky-900">Produits à délai</h3>
            </div>
            <p className="text-sm text-sky-800">
              Certains comptes nécessitent une préparation manuelle. Le délai
              estimé est affiché sur la fiche produit. Vous serez notifié(e)
              quand votre commande est prête.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
