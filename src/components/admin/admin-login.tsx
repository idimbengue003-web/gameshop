"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Lock, ArrowLeft, Loader2, Eye, EyeOff } from "lucide-react";
import { siteConfig } from "@/config/site";

interface AdminLoginProps {
  onSuccess: () => void;
  onBack: () => void;
}

export function AdminLogin({ onSuccess, onBack }: AdminLoginProps) {
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (password === siteConfig.adminPassword) {
        sessionStorage.setItem("gs221_admin", "1");
        onSuccess();
      } else {
        setError("Mot de passe incorrect");
      }
      setLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-900 via-slate-900 to-sky-900 p-4">
      <Card className="w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-6">
          <img
            src="/logo/gameshop221.jpg"
            alt="GAME SHOP 221"
            className="h-20 w-20 rounded-2xl object-cover shadow-lg mb-3"
          />
          <h1 className="text-2xl font-black text-slate-900">
            Admin · GAME SHOP 221
          </h1>
          <p className="text-sm text-slate-500 mt-1 text-center">
            Espace réservé au gérant de la boutique.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="password" className="flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5" />
              Mot de passe
            </Label>
            <div className="relative mt-1">
              <Input
                id="password"
                type={showPwd ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez votre mot de passe"
                required
                autoFocus
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPwd((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-slate-100"
                aria-label="Afficher/masquer"
              >
                {showPwd ? (
                  <EyeOff className="h-4 w-4 text-slate-500" />
                ) : (
                  <Eye className="h-4 w-4 text-slate-500" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
              ⚠️ {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-sky-600 hover:bg-sky-700 text-white h-11"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Lock className="h-4 w-4 mr-1.5" />
                Se connecter
              </>
            )}
          </Button>
        </form>

        <Button
          type="button"
          variant="ghost"
          onClick={onBack}
          className="w-full mt-3 text-slate-500"
        >
          <ArrowLeft className="h-4 w-4 mr-1.5" />
          Retour au site
        </Button>

        <div className="mt-5 pt-4 border-t border-slate-100 text-center text-xs text-slate-400">
          <p>Mot de passe par défaut : <code className="bg-slate-100 px-1 rounded">admin221</code></p>
          <p className="mt-1">Modifiable dans <code>src/config/site.ts</code></p>
        </div>
      </Card>
    </div>
  );
}
