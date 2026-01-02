import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, CheckCircle, RotateCcw, Code, Database, Shield, Cloud, Palette, Server, TrendingUp, Settings, FileText, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const questions = [
  {
    id: 1,
    question: "Qu'est-ce qui vous attire le plus dans le domaine IT ?",
    options: [
      { text: "Créer des sites web et applications visibles par tous", scores: { dev: 3, design: 2, marketing: 1 } },
      { text: "Analyser des données pour prendre des décisions éclairées", scores: { data: 3, bureautique: 1 } },
      { text: "Protéger les systèmes contre les attaques", scores: { cyber: 3, reseaux: 1 } },
      { text: "Automatiser et optimiser les processus", scores: { cloud: 2, odoo: 3 } },
    ]
  },
  {
    id: 2,
    question: "Comment préférez-vous travailler ?",
    options: [
      { text: "Résoudre des problèmes techniques complexes", scores: { dev: 2, cyber: 2, reseaux: 2 } },
      { text: "Créer des visuels et expériences esthétiques", scores: { design: 3, graphique: 2, marketing: 1 } },
      { text: "Analyser et interpréter des chiffres", scores: { data: 3, bureautique: 2 } },
      { text: "Collaborer et communiquer avec les équipes", scores: { marketing: 2, odoo: 2 } },
    ]
  },
  {
    id: 3,
    question: "Quel type de projet vous enthousiasme le plus ?",
    options: [
      { text: "Développer une application mobile innovante", scores: { dev: 3 } },
      { text: "Créer un tableau de bord d'analyse prédictive", scores: { data: 3, bureautique: 1 } },
      { text: "Concevoir une identité visuelle de marque", scores: { graphique: 3, design: 2 } },
      { text: "Mettre en place une infrastructure cloud sécurisée", scores: { cloud: 3, cyber: 1 } },
    ]
  },
  {
    id: 4,
    question: "Quel outil vous attire le plus ?",
    options: [
      { text: "Visual Studio Code, GitHub", scores: { dev: 3, cloud: 1 } },
      { text: "Excel, Power BI, Python", scores: { data: 2, bureautique: 3 } },
      { text: "Figma, Photoshop, Illustrator", scores: { design: 2, graphique: 3 } },
      { text: "AWS, Docker, Kubernetes", scores: { cloud: 3, cyber: 1 } },
    ]
  },
  {
    id: 5,
    question: "Quelle compétence souhaitez-vous le plus développer ?",
    options: [
      { text: "Programmer et coder", scores: { dev: 3, data: 1 } },
      { text: "Concevoir des interfaces utilisateur", scores: { design: 3, dev: 1 } },
      { text: "Gérer la sécurité informatique", scores: { cyber: 3, reseaux: 1 } },
      { text: "Administrer des serveurs et réseaux", scores: { reseaux: 3, cloud: 1 } },
    ]
  },
  {
    id: 6,
    question: "Quel secteur vous intéresse ?",
    options: [
      { text: "Startup tech et innovation", scores: { dev: 2, cloud: 2, design: 1 } },
      { text: "Finance et banque", scores: { data: 2, cyber: 2, bureautique: 1 } },
      { text: "Marketing et communication", scores: { marketing: 3, graphique: 2 } },
      { text: "Industrie et logistique", scores: { odoo: 3, reseaux: 1 } },
    ]
  },
  {
    id: 7,
    question: "Comment décririez-vous votre niveau actuel en informatique ?",
    options: [
      { text: "Débutant, je veux tout apprendre", scores: { bureautique: 2, design: 1, marketing: 1 } },
      { text: "Intermédiaire, j'ai des bases solides", scores: { dev: 1, data: 1, cloud: 1 } },
      { text: "Avancé, je cherche à me spécialiser", scores: { cyber: 1, cloud: 1, data: 1 } },
      { text: "Je me réoriente professionnellement", scores: { odoo: 2, bureautique: 2 } },
    ]
  },
  {
    id: 8,
    question: "Quel type de carrière envisagez-vous ?",
    options: [
      { text: "Développeur / Ingénieur logiciel", scores: { dev: 3 } },
      { text: "Data Scientist / Analyste", scores: { data: 3 } },
      { text: "Designer / Créatif", scores: { design: 2, graphique: 2 } },
      { text: "Consultant / Chef de projet", scores: { odoo: 2, marketing: 2, cloud: 1 } },
    ]
  }
];

const formations = {
  dev: { 
    id: "dev-web", 
    title: "Développement Web & Mobile", 
    icon: Code,
    description: "Créez des applications web et mobiles modernes avec les dernières technologies.",
    color: "from-blue-500 to-cyan-500"
  },
  data: { 
    id: "data-ia", 
    title: "Data & Intelligence Artificielle", 
    icon: Database,
    description: "Maîtrisez l'analyse de données et le machine learning pour des solutions intelligentes.",
    color: "from-purple-500 to-pink-500"
  },
  cyber: { 
    id: "cybersecurite", 
    title: "Cybersécurité", 
    icon: Shield,
    description: "Protégez les systèmes d'information et devenez expert en sécurité informatique.",
    color: "from-red-500 to-orange-500"
  },
  cloud: { 
    id: "cloud-devops", 
    title: "Cloud & DevOps", 
    icon: Cloud,
    description: "Déployez et gérez des infrastructures cloud avec les pratiques DevOps modernes.",
    color: "from-amber-500 to-yellow-500"
  },
  design: { 
    id: "design-ui-ux", 
    title: "UI/UX Design", 
    icon: Palette,
    description: "Concevez des interfaces utilisateur intuitives et des expériences mémorables.",
    color: "from-green-500 to-emerald-500"
  },
  reseaux: { 
    id: "reseaux", 
    title: "Réseaux & Systèmes", 
    icon: Server,
    description: "Administrez les infrastructures réseau et les systèmes d'entreprise.",
    color: "from-indigo-500 to-violet-500"
  },
  marketing: { 
    id: "marketing-digital", 
    title: "Marketing Digital", 
    icon: TrendingUp,
    description: "Maîtrisez les stratégies digitales pour développer la visibilité en ligne.",
    color: "from-pink-500 to-rose-500"
  },
  odoo: { 
    id: "odoo", 
    title: "Odoo ERP", 
    icon: Settings,
    description: "Implémentez et personnalisez Odoo pour optimiser la gestion d'entreprise.",
    color: "from-violet-500 to-purple-500"
  },
  bureautique: { 
    id: "bureautique", 
    title: "Bureautique Avancée", 
    icon: FileText,
    description: "Maîtrisez les outils bureautiques pour une productivité optimale.",
    color: "from-slate-500 to-gray-500"
  },
  graphique: { 
    id: "design-graphique", 
    title: "Design Graphique", 
    icon: PenTool,
    description: "Créez des visuels percutants et des identités de marque professionnelles.",
    color: "from-teal-500 to-cyan-500"
  }
};

type FormationKey = keyof typeof formations;

const OrientationTestPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [scores, setScores] = useState<Record<FormationKey, number>>({
    dev: 0, data: 0, cyber: 0, cloud: 0, design: 0,
    reseaux: 0, marketing: 0, odoo: 0, bureautique: 0, graphique: 0
  });
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (optionIndex: number, optionScores: Record<string, number>) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    const newScores = { ...scores };
    Object.entries(optionScores).forEach(([key, value]) => {
      if (key in newScores) {
        newScores[key as FormationKey] += value;
      }
    });
    setScores(newScores);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  const restart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setScores({
      dev: 0, data: 0, cyber: 0, cloud: 0, design: 0,
      reseaux: 0, marketing: 0, odoo: 0, bureautique: 0, graphique: 0
    });
    setShowResults(false);
  };

  const getTopFormations = () => {
    const sorted = Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3);
    return sorted.map(([key]) => formations[key as FormationKey]);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults) {
    const topFormations = getTopFormations();
    const primaryFormation = topFormations[0];
    const PrimaryIcon = primaryFormation.icon;

    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-20">
          <section className="py-20 bg-hero-gradient text-primary-foreground">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <CheckCircle className="w-16 h-16 text-accent mx-auto mb-6" />
                <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
                  Vos résultats
                </h1>
                <p className="text-xl text-primary-foreground/70">
                  Découvrez les formations qui correspondent à votre profil
                </p>
              </div>
            </div>
          </section>

          <section className="py-16 bg-background">
            <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
              {/* Primary Recommendation */}
              <div className={`relative rounded-3xl bg-gradient-to-br ${primaryFormation.color} p-8 mb-8 text-white`}>
                <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-sm font-semibold mb-4">
                  🎯 Formation recommandée
                </span>
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <PrimaryIcon className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
                      {primaryFormation.title}
                    </h2>
                    <p className="text-white/80 mb-6">
                      {primaryFormation.description}
                    </p>
                    <Button variant="secondary" size="lg" asChild>
                      <Link to={`/formations/${primaryFormation.id}`}>
                        Découvrir cette formation
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Other Recommendations */}
              <h3 className="font-display text-xl font-bold text-foreground mb-6">
                Autres formations adaptées à votre profil
              </h3>
              <div className="grid md:grid-cols-2 gap-4 mb-12">
                {topFormations.slice(1).map((formation, index) => {
                  const Icon = formation.icon;
                  return (
                    <Link
                      key={index}
                      to={`/formations/${formation.id}`}
                      className="flex items-center gap-4 p-6 rounded-xl bg-card border border-border hover:shadow-card transition-all"
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${formation.color} flex items-center justify-center text-white flex-shrink-0`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{formation.title}</h4>
                        <p className="text-sm text-muted-foreground">{formation.description}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="default" size="lg" asChild>
                  <Link to="/inscription">
                    S'inscrire maintenant
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" onClick={restart}>
                  <RotateCcw className="w-5 h-5" />
                  Refaire le test
                </Button>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <section className="py-20 bg-hero-gradient text-primary-foreground">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-sm font-semibold mb-6">
                Test d'orientation
              </span>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Trouvez votre formation idéale
              </h1>
              <p className="text-xl text-primary-foreground/70">
                Répondez à quelques questions pour découvrir les formations adaptées à votre profil.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Question {currentQuestion + 1} sur {questions.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Question */}
            <div className="bg-card rounded-2xl border border-border p-8 mb-8">
              <h2 className="font-display text-2xl font-bold text-foreground mb-8">
                {question.question}
              </h2>

              <div className="space-y-4">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index, option.scores)}
                    className="w-full text-left p-5 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all group"
                  >
                    <span className="text-foreground group-hover:text-primary font-medium">
                      {option.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={goBack}
                disabled={currentQuestion === 0}
              >
                <ArrowLeft className="w-4 h-4" />
                Précédent
              </Button>
              <Button variant="ghost" onClick={restart}>
                <RotateCcw className="w-4 h-4" />
                Recommencer
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default OrientationTestPage;
