import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { ArrowRight, HelpCircle, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqCategories = [
  {
    title: "Inscriptions & Admissions",
    icon: "📝",
    questions: [
      {
        question: "Comment puis-je m'inscrire à une formation ?",
        answer: "L'inscription se fait en ligne via notre formulaire d'inscription. Vous devez remplir vos informations personnelles, choisir votre formation et téléverser votre CV et lettre de motivation. Notre équipe vous contactera sous 48h pour confirmer votre inscription."
      },
      {
        question: "Quels sont les prérequis pour intégrer une formation ?",
        answer: "Les prérequis varient selon les formations. Certaines sont accessibles aux débutants, d'autres nécessitent des connaissances de base en informatique. Consultez la fiche détaillée de chaque formation ou contactez-nous pour plus d'informations."
      },
      {
        question: "Y a-t-il un test d'entrée ?",
        answer: "Pour certaines formations avancées, un test de niveau ou un entretien peut être requis. Nous proposons également un test d'orientation gratuit pour vous aider à choisir la formation adaptée à votre profil."
      },
      {
        question: "Puis-je m'inscrire en cours d'année ?",
        answer: "Oui, nous proposons des sessions de formation tout au long de l'année. Consultez notre calendrier des sessions pour connaître les prochaines dates de démarrage."
      }
    ]
  },
  {
    title: "Formations & Programmes",
    icon: "🎓",
    questions: [
      {
        question: "Quelles formations proposez-vous ?",
        answer: "Nous proposons des formations dans les domaines IT les plus demandés : Développement Web & Mobile, Data & IA, Cybersécurité, Cloud & DevOps, UI/UX Design, Réseaux & Systèmes, Marketing Digital, Odoo, Bureautique et Design Graphique."
      },
      {
        question: "Quelle est la durée des formations ?",
        answer: "La durée varie de 3 à 12 mois selon les formations. Chaque programme est conçu pour vous permettre d'acquérir des compétences opérationnelles dans un délai optimisé."
      },
      {
        question: "Les formations sont-elles certifiantes ?",
        answer: "Oui, à l'issue de chaque formation, vous recevez une attestation de compétences DJEUTCH ACADEMY. Nous préparons également aux certifications professionnelles reconnues (AWS, Azure, Cisco, etc.)."
      },
      {
        question: "Proposez-vous des formations en ligne ?",
        answer: "Oui, nous proposons trois modalités : présentiel, en ligne (100% à distance) et hybride (mix des deux). Vous pouvez choisir selon vos contraintes et préférences."
      }
    ]
  },
  {
    title: "Financement & Paiement",
    icon: "💰",
    questions: [
      {
        question: "Quels sont les tarifs des formations ?",
        answer: "Les tarifs varient selon les formations, de 250 000 à 550 000 FCFA. Consultez les fiches formations pour les tarifs détaillés ou demandez un devis personnalisé."
      },
      {
        question: "Proposez-vous des facilités de paiement ?",
        answer: "Oui, nous proposons un paiement en plusieurs fois sans frais (jusqu'à 4 mensualités). Des réductions sont également disponibles pour les inscriptions anticipées et les groupes."
      },
      {
        question: "Y a-t-il des bourses ou aides financières ?",
        answer: "Nous proposons des réductions pour les étudiants et demandeurs d'emploi. Des partenariats avec des entreprises permettent également de financer certaines formations. Contactez-nous pour en savoir plus."
      },
      {
        question: "Comment obtenir un devis pour une entreprise ?",
        answer: "Vous pouvez demander un devis personnalisé via notre formulaire de demande de devis. Notre équipe commerciale vous répondra sous 24h avec une proposition adaptée à vos besoins."
      }
    ]
  },
  {
    title: "Déroulement & Pédagogie",
    icon: "📚",
    questions: [
      {
        question: "Comment se déroulent les cours ?",
        answer: "Les cours combinent théorie et pratique avec 70% de projets concrets. Vous travaillez sur des cas réels, en équipe, avec l'accompagnement de formateurs experts du terrain."
      },
      {
        question: "Quelle est la taille des classes ?",
        answer: "Nos classes sont limitées à 15-20 apprenants maximum pour garantir un suivi personnalisé et une interaction optimale avec les formateurs."
      },
      {
        question: "Quels outils sont utilisés ?",
        answer: "Nous utilisons les outils et technologies utilisés en entreprise : environnements de développement professionnels, plateformes cloud, outils de collaboration (Slack, GitHub, Jira, etc.)."
      },
      {
        question: "Y a-t-il un accompagnement après la formation ?",
        answer: "Oui, nous proposons un accompagnement à l'insertion professionnelle : aide à la rédaction de CV, préparation aux entretiens, mise en relation avec nos entreprises partenaires."
      }
    ]
  },
  {
    title: "Carrière & Insertion",
    icon: "🚀",
    questions: [
      {
        question: "Quel est le taux d'insertion professionnelle ?",
        answer: "Notre taux d'insertion est de 92% dans les 6 mois suivant la fin de formation. Nos partenariats avec plus de 50 entreprises facilitent l'accès à l'emploi."
      },
      {
        question: "Proposez-vous des stages ?",
        answer: "Oui, la plupart de nos formations incluent une période de stage en entreprise. Nous vous accompagnons dans la recherche et nous avons un réseau d'entreprises partenaires."
      },
      {
        question: "Les certifications sont-elles reconnues ?",
        answer: "Nos formations préparent aux certifications internationalement reconnues (AWS, Azure, Google, Cisco, etc.). Notre attestation DJEUTCH ACADEMY est également reconnue par nos entreprises partenaires."
      }
    ]
  }
];

const FAQPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-hero-gradient text-primary-foreground">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-sm font-semibold mb-6">
                FAQ
              </span>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Questions fréquentes
              </h1>
              <p className="text-xl text-primary-foreground/70">
                Retrouvez les réponses à toutes vos questions sur nos formations et notre centre.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">{category.icon}</span>
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    {category.title}
                  </h2>
                </div>
                
                <Accordion type="single" collapsible className="space-y-3">
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem 
                      key={faqIndex} 
                      value={`${categoryIndex}-${faqIndex}`}
                      className="bg-card rounded-xl border border-border px-6 data-[state=open]:shadow-card"
                    >
                      <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary py-5">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-5">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <HelpCircle className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Vous n'avez pas trouvé votre réponse ?
              </h2>
              <p className="text-muted-foreground mb-8">
                Notre équipe est disponible pour répondre à toutes vos questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="default" size="lg" asChild>
                  <Link to="/contact">
                    <Mail className="w-5 h-5" />
                    Nous contacter
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="tel:+237600000000">
                    <Phone className="w-5 h-5" />
                    +237 6 00 00 00 00
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FAQPage;
