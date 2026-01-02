import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CheckCircle, Upload, User, Mail, Phone, MapPin, GraduationCap, FileText, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formations = [
  "Développement Web & Mobile",
  "Data Science & Intelligence Artificielle",
  "Cybersécurité & Ethical Hacking",
  "Cloud Computing & DevOps",
  "UI/UX Design",
  "Réseaux & Systèmes",
];

const sessions = [
  { id: "jan-2026", label: "Janvier 2026", available: true },
  { id: "mars-2026", label: "Mars 2026", available: true },
  { id: "juin-2026", label: "Juin 2026", available: true },
  { id: "sept-2026", label: "Septembre 2026", available: true },
];

const InscriptionPage = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    birthDate: "",
    formation: "",
    session: "",
    level: "",
    motivation: "",
    cv: null as File | null,
    coverLetter: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: "cv" | "coverLetter") => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, [field]: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'envoi
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    toast({
      title: "Candidature envoyée !",
      description: "Nous avons bien reçu votre dossier. Vous recevrez une confirmation par email.",
    });
    
    setStep(4);
    setIsSubmitting(false);
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const isStepValid = () => {
    if (step === 1) {
      return formData.firstName && formData.lastName && formData.email && formData.phone;
    }
    if (step === 2) {
      return formData.formation && formData.session && formData.level;
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-hero-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Inscription</h1>
            <p className="text-xl text-white/80">
              Rejoignez DJEUTCH ACADEMY et lancez votre carrière dans les métiers du numérique
            </p>
          </div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-8 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between">
              {[
                { num: 1, label: "Informations" },
                { num: 2, label: "Formation" },
                { num: 3, label: "Documents" },
                { num: 4, label: "Confirmation" },
              ].map((s, i) => (
                <div key={s.num} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                      step >= s.num
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step > s.num ? <CheckCircle className="w-5 h-5" /> : s.num}
                  </div>
                  <span
                    className={`hidden sm:block ml-2 font-medium ${
                      step >= s.num ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {s.label}
                  </span>
                  {i < 3 && (
                    <div
                      className={`w-8 sm:w-16 h-0.5 mx-2 transition-all ${
                        step > s.num ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Personal Info */}
              {step === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Informations personnelles
                  </h2>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Prénom *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          placeholder="Votre prénom"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Nom *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        placeholder="Votre nom"
                      />
                    </div>
                  </div>

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

                  <div className="grid sm:grid-cols-2 gap-4">
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
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Ville
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          placeholder="Douala, Yaoundé..."
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Date de naissance
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Formation */}
              {step === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Choix de la formation
                  </h2>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Formation souhaitée *
                    </label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <select
                        name="formation"
                        value={formData.formation}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
                      >
                        <option value="">Sélectionnez une formation</option>
                        {formations.map((f) => (
                          <option key={f} value={f}>
                            {f}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Session de formation *
                    </label>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {sessions.map((session) => (
                        <label
                          key={session.id}
                          className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            formData.session === session.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <input
                            type="radio"
                            name="session"
                            value={session.id}
                            checked={formData.session === session.id}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <Calendar className="w-5 h-5 text-primary mr-3" />
                          <span className="font-medium">{session.label}</span>
                          {session.available && (
                            <span className="ml-auto text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                              Disponible
                            </span>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Niveau actuel *
                    </label>
                    <select
                      name="level"
                      value={formData.level}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    >
                      <option value="">Sélectionnez votre niveau</option>
                      <option value="debutant">Débutant - Aucune expérience</option>
                      <option value="intermediaire">Intermédiaire - Notions de base</option>
                      <option value="avance">Avancé - Expérience significative</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Motivation (optionnel)
                    </label>
                    <textarea
                      name="motivation"
                      value={formData.motivation}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                      placeholder="Parlez-nous de votre projet professionnel..."
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Documents */}
              {step === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Documents à joindre
                  </h2>

                  <div className="bg-muted/50 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">CV (optionnel)</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Formats acceptés : PDF, DOC, DOCX (max 5 Mo)
                        </p>
                        <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-background border border-border hover:border-primary cursor-pointer transition-all">
                          <Upload className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            {formData.cv ? formData.cv.name : "Téléverser mon CV"}
                          </span>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => handleFileChange(e, "cv")}
                            className="sr-only"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          Lettre de motivation (optionnel)
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Formats acceptés : PDF, DOC, DOCX (max 5 Mo)
                        </p>
                        <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-background border border-border hover:border-primary cursor-pointer transition-all">
                          <Upload className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            {formData.coverLetter
                              ? formData.coverLetter.name
                              : "Téléverser ma lettre"}
                          </span>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => handleFileChange(e, "coverLetter")}
                            className="sr-only"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                    <p className="text-sm text-foreground">
                      <strong>Note :</strong> Les documents ne sont pas obligatoires pour soumettre
                      votre candidature. Vous pourrez les ajouter ultérieurement si nécessaire.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {step === 4 && (
                <div className="text-center py-12 animate-fade-in">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    Candidature envoyée !
                  </h2>
                  <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
                    Merci pour votre intérêt ! Notre équipe examinera votre dossier et vous
                    contactera dans les plus brefs délais.
                  </p>
                  <div className="bg-muted/50 rounded-xl p-6 max-w-md mx-auto text-left mb-8">
                    <h3 className="font-semibold text-foreground mb-3">Récapitulatif :</h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <span className="text-muted-foreground">Formation :</span>{" "}
                        <strong>{formData.formation}</strong>
                      </li>
                      <li>
                        <span className="text-muted-foreground">Session :</span>{" "}
                        <strong>
                          {sessions.find((s) => s.id === formData.session)?.label}
                        </strong>
                      </li>
                      <li>
                        <span className="text-muted-foreground">Email :</span>{" "}
                        <strong>{formData.email}</strong>
                      </li>
                    </ul>
                  </div>
                  <Button variant="accent" size="lg" asChild>
                    <a href="/">Retour à l'accueil</a>
                  </Button>
                </div>
              )}

              {/* Navigation Buttons */}
              {step < 4 && (
                <div className="flex justify-between mt-8 pt-6 border-t border-border">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={step === 1}
                  >
                    Précédent
                  </Button>
                  {step < 3 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      disabled={!isStepValid()}
                    >
                      Suivant
                    </Button>
                  ) : (
                    <Button type="submit" variant="accent" disabled={isSubmitting}>
                      {isSubmitting ? "Envoi en cours..." : "Envoyer ma candidature"}
                    </Button>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InscriptionPage;
