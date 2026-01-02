import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const galleryCategories = [
  { id: "all", label: "Tout" },
  { id: "campus", label: "Campus" },
  { id: "formations", label: "Formations" },
  { id: "evenements", label: "Événements" },
  { id: "projets", label: "Projets étudiants" },
  { id: "partenaires", label: "Partenaires" },
];

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800",
    alt: "Étudiants en formation",
    category: "formations",
    title: "Session de formation développement web"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800",
    alt: "Espace de coworking",
    category: "campus",
    title: "Notre espace de coworking moderne"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    alt: "Conférence tech",
    category: "evenements",
    title: "Conférence annuelle Tech Summit 2024"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800",
    alt: "Travail en équipe",
    category: "projets",
    title: "Projet de fin de formation - E-commerce"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
    alt: "Salle informatique",
    category: "campus",
    title: "Laboratoire informatique équipé"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
    alt: "Workshop design",
    category: "formations",
    title: "Atelier UI/UX Design en action"
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800",
    alt: "Cérémonie de remise de diplômes",
    category: "evenements",
    title: "Remise des attestations - Promotion 2024"
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800",
    alt: "Partenariat entreprise",
    category: "partenaires",
    title: "Signature de partenariat avec TechCorp"
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800",
    alt: "Formation data science",
    category: "formations",
    title: "Cours de Data Science et Python"
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800",
    alt: "Hackathon",
    category: "evenements",
    title: "Hackathon Innovation 48h"
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=800",
    alt: "Projet mobile",
    category: "projets",
    title: "Application mobile de santé - Projet étudiant"
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800",
    alt: "Réunion partenaires",
    category: "partenaires",
    title: "Rencontre avec nos entreprises partenaires"
  },
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=800",
    alt: "Bibliothèque",
    category: "campus",
    title: "Espace bibliothèque et documentation"
  },
  {
    id: 14,
    src: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800",
    alt: "Formation cybersécurité",
    category: "formations",
    title: "Lab de cybersécurité"
  },
  {
    id: 15,
    src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800",
    alt: "Dashboard projet",
    category: "projets",
    title: "Dashboard analytics - Projet Data"
  }
];

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [lightboxImage, setLightboxImage] = useState<number | null>(null);

  const filteredImages = selectedCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const openLightbox = (id: number) => {
    setLightboxImage(id);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    document.body.style.overflow = 'auto';
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (lightboxImage === null) return;
    const currentIndex = filteredImages.findIndex(img => img.id === lightboxImage);
    let newIndex;
    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === filteredImages.length - 1 ? 0 : currentIndex + 1;
    }
    setLightboxImage(filteredImages[newIndex].id);
  };

  const currentLightboxImage = galleryImages.find(img => img.id === lightboxImage);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-hero-gradient text-primary-foreground">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-sm font-semibold mb-6">
                Galerie
              </span>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Notre vie au centre
              </h1>
              <p className="text-xl text-primary-foreground/70">
                Découvrez en images nos locaux, formations, événements et projets étudiants.
              </p>
            </div>
          </div>
        </section>

        {/* Filter */}
        <section className="py-8 bg-background border-b border-border sticky top-20 z-40">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex overflow-x-auto gap-2 pb-2 -mx-4 px-4 scrollbar-hide">
              {galleryCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-5 py-2.5 rounded-full whitespace-nowrap font-medium text-sm transition-all ${
                    selectedCategory === category.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  onClick={() => openLightbox(image.id)}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-medium mb-2">
                      {galleryCategories.find(c => c.id === image.category)?.label}
                    </span>
                    <h3 className="text-white font-semibold">{image.title}</h3>
                  </div>
                </div>
              ))}
            </div>

            {filteredImages.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">Aucune image dans cette catégorie.</p>
              </div>
            )}
          </div>
        </section>

        {/* Lightbox */}
        {lightboxImage !== null && currentLightboxImage && (
          <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/70 hover:text-white z-10"
            >
              <X className="w-8 h-8" />
            </button>
            
            <button
              onClick={() => navigateLightbox('prev')}
              className="absolute left-6 text-white/70 hover:text-white z-10"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
            
            <button
              onClick={() => navigateLightbox('next')}
              className="absolute right-6 text-white/70 hover:text-white z-10"
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            <div className="max-w-5xl max-h-[80vh] px-16">
              <img
                src={currentLightboxImage.src}
                alt={currentLightboxImage.alt}
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
              />
              <div className="text-center mt-6">
                <h3 className="text-white font-semibold text-lg">{currentLightboxImage.title}</h3>
                <p className="text-white/60 text-sm mt-1">
                  {galleryCategories.find(c => c.id === currentLightboxImage.category)?.label}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default GalleryPage;
