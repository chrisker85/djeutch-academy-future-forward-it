import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CheckCircle, Building2, Users, Mail, Phone, MessageSquare, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formations = [
  { id: "web", name: "Développement Web & Mobile", price: "À partir de 500 000 FCFA" },
  { id: "data", name: "Data Science & Intelligence Artificielle", price: "À partir de 600 000 FCFA" },
  { id: "cyber", name: "Cybersécurité & Ethical Hacking", price: "À partir de 550 000 FCFA" },
  { id: "cloud", name: "Cloud Computing & DevOps", price: "À partir de 650 000 FCFA" },
  { id: "design", name: "UI/UX Design", price: "À partir de 450 000 FCFA" },
  { id: "reseaux", name: "Réseaux & Systèmes", price: "À partir de 500 000 FCFA" },
];

const typeFormation = [
  { id: "individuelle", label: "Formation individuelle", description: "Pour une personne" },
  { id: "groupe", label: "Formation en groupe", description: "Pour plusieurs personnes" },
  { id: "entreprise", label: "Formation entreprise", description: "Équipe ou département" },
  { id: "sur-mesure", label: "Formation sur-mesure", description: "Programme personnalisé" },
];

const DevisPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    type: "",
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    formations: [] as string[],
    participants: "1",
    modalite: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormationToggle = (formationId: string) => {
    setFormData((prev) => ({
      ...prev,
      formations: prev.formations.includes(formationId)
        ? prev.formations.filter((f) => f !== formationId)
        : [...prev.formations, formationId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulation d'envoi
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast({
      title: "Demande envoyée !",
      description: "Notre équipe commerciale vous contactera sous 24h.",
    });

    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto text-center py-16 animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-4">
                Demande de devis envoyée !
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                Merci pour votre intérêt ! Notre équipe commerciale étudiera votre demande et vous
                enverra un devis personnalisé sous 24 heures ouvrées.
              </p>
              <div className="bg-muted/50 rounded-xl p-6 text-left mb-8">
                <h3 className="font-semibold text-foreground mb-3">Prochaines étapes :</h3>
                <ol className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      1
                    </span>
                    <span>Étude de votre demande par notre équipe</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      2
                    </span>
                    <span>Envoi d'un devis détaillé par email</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      3
                    </span>
                    <span>Appel de qualification pour affiner vos besoins</span>
                  </li>
                </ol>
              </div>
              <Button variant="accent" size="lg" asChild>
                <a href="/">Retour à l'accueil</a>
              </Button>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-hero-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Demander un devis</h1>
            <p className="text-xl text-white/80">
              Obtenez un devis personnalisé pour vos besoins de formation IT
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Type de formation */}
              <div>
                <h2 className="text-xl font-bold text-foreground mb-4">Type de formation</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {typeFormation.map((type) => (
                    <label
                      key={type.id}
                      className={`flex items-start p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.type === type.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="type"
                        value={type.id}
                        checked={formData.type === type.id}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div>
                        <span className="font-semibold text-foreground">{type.label}</span>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Formations souhaitées */}
              <div>
                <h2 className="text-xl font-bold text-foreground mb-4">Formations souhaitées</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {formations.map((formation) => (
                    <label
                      key={formation.id}
                      className={`flex items-start p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.formations.includes(formation.id)
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.formations.includes(formation.id)}
                        onChange={() => handleFormationToggle(formation.id)}
                        className="sr-only"
                      />
                      <div className="flex-1">
                        <span className="font-semibold text-foreground block">{formation.name}</span>
                        <span className="text-sm text-primary">{formation.price}</span>
                      </div>
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          formData.formations.includes(formation.id)
                            ? "border-primary bg-primary"
                            : "border-muted-foreground"
                        }`}
                      >
                        {formData.formations.includes(formation.id) && (
                          <CheckCircle className="w-4 h-4 text-primary-foreground" />
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Informations de contact */}
              <div>
                <h2 className="text-xl font-bold text-foreground mb-4">Vos informations</h2>
                <div className="space-y-4">
                  {(formData.type === "entreprise" || formData.type === "groupe") && (
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Nom de l'entreprise / Organisation
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          placeholder="Nom de votre entreprise"
                        />
                      </div>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Nom complet *
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type="text"
                          name="contactName"
                          value={formData.contactName}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          placeholder="Votre nom"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Nombre de participants *
                      </label>
                      <select
                        name="participants"
                        value={formData.participants}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      >
                        <option value="1">1 personne</option>
                        <option value="2-5">2 à 5 personnes</option>
                        <option value="6-10">6 à 10 personnes</option>
                        <option value="11-20">11 à 20 personnes</option>
                        <option value="20+">Plus de 20 personnes</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          placeholder="votre@email.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Téléphone *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          placeholder="+237 6XX XXX XXX"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Modalité souhaitée
                    </label>
                    <select
                      name="modalite"
                      value={formData.modalite}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    >
                      <option value="">Sélectionnez une modalité</option>
                      <option value="presentiel">Présentiel</option>
                      <option value="distanciel">Distanciel (en ligne)</option>
                      <option value="hybride">Hybride (présentiel + en ligne)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Message / Précisions
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                        placeholder="Décrivez vos besoins spécifiques, contraintes de planning, objectifs..."
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-4">
                <Button
                  type="submit"
                  variant="accent"
                  size="lg"
                  className="w-full"
                  disabled={
                    isSubmitting ||
                    !formData.type ||
                    formData.formations.length === 0 ||
                    !formData.contactName ||
                    !formData.email ||
                    !formData.phone
                  }
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span> Envoi en cours...
                    </>
                  ) : (
                    <>
                      <FileText className="w-5 h-5 mr-2" />
                      Recevoir mon devis personnalisé
                    </>
                  )}
                </Button>
                <p className="text-center text-sm text-muted-foreground mt-4">
                  Réponse garantie sous 24h ouvrées
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DevisPage;
