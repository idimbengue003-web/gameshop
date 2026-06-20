import { Card } from "@/components/ui/card";
import { Waves, MessageCircle, Package, ArrowRight } from "lucide-react";

export function OrderGuide() {
  const steps = [
    {
      num: "1",
      icon: Package,
      title: "Choisissez votre produit",
      desc: "Parcourez le catalogue : comptes, recharges UC/diamants/VP ou cartes cadeaux. Cliquez sur « Commander ».",
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
      icon: MessageCircle,
      title: "Confirmez sur WhatsApp",
      desc: "Faites une capture du paiement et envoyez-la via le bouton WhatsApp. On vous livre en 5 à 30 minutes.",
      color: "from-green-500 to-emerald-600",
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
            Pas besoin de créer un compte. Pas besoin de carte bancaire.
            Réglez directement avec Wave et recevez votre commande sur WhatsApp.
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

        {/* Note bas */}
        <div className="mt-10 max-w-2xl mx-auto bg-sky-50 border border-sky-100 rounded-xl p-5 text-center">
          <p className="text-sm text-slate-700">
            <strong className="text-sky-800">💡 Astuce :</strong> Pour accélérer la
            livraison des recharges (UC, diamants, VP), indiquez votre ID joueur
            dans la fenêtre de commande avant de payer.
          </p>
        </div>
      </div>
    </section>
  );
}
