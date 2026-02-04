"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Brain, Sparkles, X } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  brainRegions?: string[];
}

interface BrainRegionMatch {
  id: string;
  name: string;
  relevance: string;
}

// Knowledge base for brain region mapping
const brainKnowledge = {
  frontal: {
    id: "frontal-lobe",
    name: "Frontallappen",
    keywords: ["entscheidung", "planung", "strategie", "führung", "kontrolle", "willenskraft", "konzentration", "problemlösung", "kreativ", "denken", "logik", "urteil", "persönlichkeit", "motivation", "ziel", "fokus", "aufmerksamkeit", "selbstkontrolle", "impuls"],
    description: "Zuständig für Planung, Entscheidungsfindung und Impulskontrolle"
  },
  parietal: {
    id: "parietal-lobe",
    name: "Parietallappen", 
    keywords: ["raum", "orientierung", "berührung", "haptik", "position", "bewegung", "körper", "tasten", "fühlen", "sensorisch", "navigation", "rechnen", "mathematik", "größe", "form"],
    description: "Verarbeitet räumliche Informationen und Berührungsreize"
  },
  temporal: {
    id: "temporal-lobe",
    name: "Temporallappen",
    keywords: ["sprache", "hören", "musik", "gedächtnis", "erinnerung", "wort", "sprechen", "verstehen", "zuhören", "audio", "klang", "ton", "stimme", "erzählung", "story", "geschichte", "gesicht", "erkennen"],
    description: "Verarbeitet Sprache, Hören und Gedächtnis"
  },
  visual: {
    id: "visual-cortex",
    name: "Visueller Kortex",
    keywords: ["sehen", "bild", "farbe", "form", "visuell", "design", "grafik", "video", "film", "lesen", "text", "logo", "aussehen", "optik", "beobachten", "schauen", "blick", "auge"],
    description: "Verarbeitet alle visuellen Informationen"
  },
  auditory: {
    id: "auditory-cortex",
    name: "Auditorischer Cortex",
    keywords: ["hören", "musik", "sound", "klang", "ton", "stimme", "laut", "geräusch", "podcast", "radio", "jingle", "melodie", "rhythmus"],
    description: "Verarbeitet akustische Informationen"
  },
  cerebellum: {
    id: "cerebellum",
    name: "Kleinhirn",
    keywords: ["bewegung", "koordination", "balance", "gleichgewicht", "motorik", "sport", "geschicklichkeit", "timing", "routine", "gewohnheit", "automatisch", "lernen", "übung", "training"],
    description: "Koordiniert Bewegungen und motorisches Lernen"
  },
  brainstem: {
    id: "brainstem",
    name: "Hirnstamm",
    keywords: ["instinkt", "überleben", "angst", "flucht", "kampf", "stress", "adrenalin", "gefahr", "alarm", "reflex", "atmung", "herzschlag", "basic", "grundlegend", "unbewusst"],
    description: "Steuert lebenswichtige Funktionen und Urinstinkte"
  }
};

function analyzeInput(input: string): BrainRegionMatch[] {
  const lowerInput = input.toLowerCase();
  const matches: BrainRegionMatch[] = [];
  
  for (const [key, region] of Object.entries(brainKnowledge)) {
    const matchedKeywords = region.keywords.filter(kw => lowerInput.includes(kw));
    if (matchedKeywords.length > 0) {
      matches.push({
        id: region.id,
        name: region.name,
        relevance: region.description
      });
    }
  }
  
  return matches;
}

function generateResponse(input: string, matches: BrainRegionMatch[]): string {
  if (matches.length === 0) {
    return "Interessante Frage! Könnten Sie mir mehr Details geben? Beschreiben Sie die Situation, Aufgabe oder das Verhalten genauer, damit ich die relevanten Hirnareale identifizieren kann.\n\nBeispiele:\n• \"Wie treffe ich bessere Kaufentscheidungen?\"\n• \"Warum reagiere ich emotional auf Werbung?\"\n• \"Welches Hirnareal ist beim Lesen aktiv?\"";
  }
  
  let response = "**Basierend auf Ihrer Anfrage sind folgende Hirnareale relevant:**\n\n";
  
  matches.forEach((match, index) => {
    response += `🧠 **${match.name}**\n${match.relevance}\n\n`;
  });
  
  response += "---\n*Klicken Sie auf ein Areal im 3D-Modell oben, um mehr über die Business-Relevanz zu erfahren.*";
  
  return response;
}

export function NeuroChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "👋 Hallo! Ich bin der **Neuro-Assistent**.\n\nBeschreiben Sie mir eine Situation, Aufgabe oder ein Verhalten, und ich sage Ihnen, welche Hirnareale dabei aktiv sind.\n\n**Beispiele:**\n• \"Was passiert im Gehirn bei einer Kaufentscheidung?\"\n• \"Welche Areale sind beim Musikhören aktiv?\"\n• \"Warum erinnere ich mich an manche Werbung?\""
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    const matches = analyzeInput(input);
    const response = generateResponse(input, matches);

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response,
      brainRegions: matches.map(m => m.id)
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-lg shadow-cyan-500/30 flex items-center justify-center hover:scale-110 transition-transform"
      >
        {isOpen ? (
          <X className="w-7 h-7 text-white" />
        ) : (
          <Bot className="w-7 h-7 text-white" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[400px] max-w-[calc(100vw-3rem)] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-600 to-blue-700 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Neuro-Assistent</h3>
                  <p className="text-cyan-100 text-sm">Powered by PROVOID</p>
                </div>
                <Sparkles className="w-5 h-5 text-cyan-200 ml-auto" />
              </div>
            </div>

            {/* Messages */}
            <div className="h-[400px] overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === "user" 
                      ? "bg-cyan-500" 
                      : "bg-slate-700"
                  }`}>
                    {message.role === "user" ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-cyan-400" />
                    )}
                  </div>
                  <div className={`max-w-[80%] p-3 rounded-2xl ${
                    message.role === "user"
                      ? "bg-cyan-600 text-white rounded-tr-sm"
                      : "bg-slate-800 text-slate-200 rounded-tl-sm"
                  }`}>
                    <div className="text-sm whitespace-pre-wrap" dangerouslySetInnerHTML={{ 
                      __html: message.content
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\n/g, '<br/>')
                    }} />
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-slate-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Beschreiben Sie eine Situation..."
                  className="flex-1 bg-slate-800 text-white placeholder-slate-500 px-4 py-3 rounded-xl border border-slate-700 focus:border-cyan-500 focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center hover:from-cyan-400 hover:to-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5 text-white" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
