import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: number;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const predefinedResponses: Record<string, string> = {
  "bonjour": "Bonjour ! 👋 Bienvenue chez DJEUTCH ACADEMY. Comment puis-je vous aider aujourd'hui ?",
  "salut": "Salut ! 👋 Je suis l'assistant virtuel de DJEUTCH ACADEMY. Que souhaitez-vous savoir ?",
  "formations": "Nous proposons plusieurs formations IT :\n\n• Développement Web & Mobile\n• Data & Intelligence Artificielle\n• Cybersécurité\n• Cloud & DevOps\n• UI/UX Design\n• Réseaux & Systèmes\n• Marketing Digital\n• Odoo ERP\n• Bureautique Avancée\n• Design Graphique\n\nQuelle formation vous intéresse ?",
  "prix": "Les tarifs varient selon les formations :\n\n• Bureautique : 250 000 FCFA\n• Design : 300-400 000 FCFA\n• Développement : 450 000 FCFA\n• Data/Cloud : 480-500 000 FCFA\n• Cybersécurité : 550 000 FCFA\n\nNous proposons des facilités de paiement !",
  "tarif": "Les tarifs varient selon les formations :\n\n• Bureautique : 250 000 FCFA\n• Design : 300-400 000 FCFA\n• Développement : 450 000 FCFA\n• Data/Cloud : 480-500 000 FCFA\n• Cybersécurité : 550 000 FCFA\n\nNous proposons des facilités de paiement !",
  "inscription": "Pour vous inscrire :\n\n1. Rendez-vous sur la page Inscription\n2. Remplissez le formulaire\n3. Joignez votre CV et lettre de motivation\n4. Notre équipe vous contactera sous 48h\n\nBesoin d'aide pour l'inscription ?",
  "contact": "Vous pouvez nous contacter :\n\n📧 Email : contact@djeutch-academy.com\n📞 Téléphone : +237 6 00 00 00 00\n📍 Adresse : Douala, Cameroun\n\nOu utilisez notre formulaire de contact !",
  "horaires": "Nos horaires d'ouverture :\n\n🕐 Lundi - Vendredi : 8h - 18h\n🕐 Samedi : 9h - 14h\n🕐 Dimanche : Fermé\n\nNos formations ont lieu du lundi au samedi.",
  "durée": "La durée des formations varie :\n\n• Bureautique : 2-3 mois\n• Design : 4-6 mois\n• Développement : 6-12 mois\n• Data/IA : 6-9 mois\n• Cybersécurité : 6-9 mois\n\nChaque programme est adapté au rythme des apprenants.",
  "stage": "Oui ! La plupart de nos formations incluent un stage en entreprise. Nous avons un réseau de +50 entreprises partenaires pour faciliter votre insertion professionnelle.",
  "emploi": "Notre taux d'insertion est de 92% dans les 6 mois suivant la formation. Nous vous accompagnons : CV, préparation aux entretiens, mise en relation avec nos partenaires.",
  "certificat": "À la fin de chaque formation, vous recevez une attestation de compétences DJEUTCH ACADEMY. Nous préparons également aux certifications internationales (AWS, Azure, Cisco, etc.).",
  "prérequis": "Les prérequis varient selon les formations. Certaines sont accessibles aux débutants complets, d'autres nécessitent des bases. Faites notre test d'orientation pour trouver la formation adaptée !",
  "test": "Notre test d'orientation IT vous aide à trouver la formation idéale selon votre profil. C'est gratuit et ça prend 5 minutes ! Rendez-vous sur la page Test d'orientation.",
  "paiement": "Nous proposons des facilités de paiement :\n\n• Paiement en 2, 3 ou 4 fois sans frais\n• Réduction pour inscription anticipée\n• Tarifs préférentiels pour groupes\n• Bourses pour étudiants méritants",
  "en ligne": "Oui, nous proposons 3 modalités :\n\n• 🏢 Présentiel : Dans nos locaux\n• 💻 En ligne : 100% à distance\n• 🔄 Hybride : Mix des deux\n\nChoisissez selon vos contraintes !",
  "default": "Je ne suis pas sûr de comprendre votre question. Voici ce que je peux vous aider à trouver :\n\n• Nos formations disponibles\n• Les tarifs et paiement\n• Les inscriptions\n• Nos horaires et contact\n• Le test d'orientation\n\nQue souhaitez-vous savoir ?"
};

const quickReplies = [
  "Formations disponibles",
  "Tarifs",
  "Comment s'inscrire",
  "Horaires",
  "Test d'orientation"
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      content: "Bonjour ! 👋 Je suis l'assistant virtuel de DJEUTCH ACADEMY. Comment puis-je vous aider ?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [keyword, response] of Object.entries(predefinedResponses)) {
      if (keyword !== 'default' && lowerMessage.includes(keyword)) {
        return response;
      }
    }
    
    return predefinedResponses.default;
  };

  const handleSend = (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        type: 'bot',
        content: getBotResponse(messageText),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-primary text-primary-foreground shadow-elevated hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center"
        aria-label="Ouvrir le chat"
      >
        <MessageCircle className="w-7 h-7" />
      </button>
    );
  }

  return (
    <div 
      className={`fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] bg-card border border-border rounded-2xl shadow-elevated overflow-hidden transition-all ${
        isMinimized ? 'h-16' : 'h-[600px] max-h-[calc(100vh-120px)]'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-primary text-primary-foreground">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold">Assistant DJEUTCH</h3>
            <p className="text-xs text-primary-foreground/70">En ligne • Réponse instantanée</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1.5 hover:bg-primary-foreground/10 rounded-lg transition-colors"
          >
            <Minimize2 className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1.5 hover:bg-primary-foreground/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto h-[420px] space-y-4 bg-muted/30">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.type === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground rounded-tr-sm'
                      : 'bg-card border border-border rounded-tl-sm'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.type === 'user' ? 'text-primary-foreground/60' : 'text-muted-foreground'
                  }`}>
                    {message.timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {message.type === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-accent" />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:0.1s]" />
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:0.2s]" />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className="px-4 py-2 border-t border-border overflow-x-auto">
            <div className="flex gap-2">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleSend(reply)}
                  className="px-3 py-1.5 text-xs font-medium bg-muted text-muted-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-colors whitespace-nowrap"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border bg-background">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Écrivez votre message..."
                className="flex-1 px-4 py-3 rounded-xl bg-muted border-0 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                size="icon"
                className="w-12 h-12 rounded-xl"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Chatbot;
