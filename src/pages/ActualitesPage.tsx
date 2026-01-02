import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Clock, Tag, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const categories = [
  "Toutes",
  "Formations",
  "Événements",
  "Success Stories",
  "Tech News",
  "Partenariats",
];

const articles = [
  {
    id: 1,
    title: "Nouvelle session de formation Développement Web Full-Stack",
    excerpt: "Inscrivez-vous dès maintenant à notre prochaine session intensive de 6 mois. Places limitées !",
    category: "Formations",
    date: "28 Décembre 2025",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
    featured: true,
  },
  {
    id: 2,
    title: "Success Story : De débutant à développeur senior en 2 ans",
    excerpt: "Découvrez le parcours inspirant de Fabrice, ancien apprenant devenu tech lead chez une startup.",
    category: "Success Stories",
    date: "22 Décembre 2025",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
    featured: true,
  },
  {
    id: 3,
    title: "Hackathon DJEUTCH ACADEMY 2026 : Appel à candidatures",
    excerpt: "Participez à notre hackathon annuel et remportez des prix exceptionnels. Thème : IA pour l'éducation.",
    category: "Événements",
    date: "20 Décembre 2025",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop",
    featured: false,
  },
  {
    id: 4,
    title: "L'IA générative : révolution ou évolution ?",
    excerpt: "Analyse des tendances et de l'impact de l'intelligence artificielle générative sur le marché du travail.",
    category: "Tech News",
    date: "15 Décembre 2025",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    featured: false,
  },
  {
    id: 5,
    title: "Partenariat stratégique avec Microsoft Afrique",
    excerpt: "DJEUTCH ACADEMY devient partenaire officiel Microsoft pour la certification Azure.",
    category: "Partenariats",
    date: "10 Décembre 2025",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=600&h=400&fit=crop",
    featured: false,
  },
  {
    id: 6,
    title: "Journée portes ouvertes : Samedi 15 Janvier 2026",
    excerpt: "Venez découvrir nos locaux, rencontrer nos formateurs et assister à des démonstrations.",
    category: "Événements",
    date: "5 Décembre 2025",
    readTime: "2 min",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
    featured: false,
  },
];

const ActualitesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Toutes");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = selectedCategory === "Toutes" || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticles = filteredArticles.filter((a) => a.featured);
  const regularArticles = filteredArticles.filter((a) => !a.featured);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-hero-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Actualités & Événements
            </h1>
            <p className="text-xl text-white/80">
              Restez informé des dernières nouvelles, événements et success stories de DJEUTCH ACADEMY
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 bg-card border-b border-border sticky top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher un article..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-8">À la une</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredArticles.map((article) => (
                <article
                  key={article.id}
                  className="group bg-card rounded-2xl overflow-hidden border border-border shadow-card hover:shadow-elevated transition-all duration-300"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                        {article.category}
                      </span>
                      <div className="flex items-center gap-1 text-muted-foreground text-sm">
                        <Calendar className="w-4 h-4" />
                        {article.date}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-muted-foreground text-sm">
                        <Clock className="w-4 h-4" />
                        {article.readTime} de lecture
                      </div>
                      <Button variant="ghost" size="sm" className="group/btn">
                        Lire plus
                        <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            {selectedCategory === "Toutes" ? "Tous les articles" : selectedCategory}
          </h2>
          
          {regularArticles.length === 0 && featuredArticles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">Aucun article trouvé</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularArticles.map((article) => (
                <article
                  key={article.id}
                  className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-card transition-all duration-300"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-2.5 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
                        {article.category}
                      </span>
                      <span className="text-muted-foreground text-xs">{article.date}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                    <Button variant="link" size="sm" className="p-0 h-auto group/btn">
                      Lire l'article
                      <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Charger plus d'articles
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-hero-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Restez informé</h2>
            <p className="text-white/80 mb-8">
              Abonnez-vous à notre newsletter pour recevoir nos dernières actualités et offres exclusives.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <Button variant="accent" size="lg">
                S'abonner
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ActualitesPage;
