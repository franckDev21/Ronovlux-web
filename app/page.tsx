'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Star, 
  ArrowRight, 
  Check,
  Facebook,
  Instagram,
  MessageCircle,
  Music,
  ChevronDown,
  Crown,
  Sparkles,
  Award,
  Users,
  Calendar,
  Wrench
} from 'lucide-react';

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const services = [
    {
      title: "Granit, Marbre & Quartz",
      description: "Fourniture et pose de surfaces premium en pierre naturelle et engineered stone pour vos plans de travail",
      image: "https://images.pexels.com/photos/6585597/pexels-photo-6585597.jpeg",
      features: ["Granit naturel", "Marbre italien", "Quartz engineered", "Finitions sur mesure"]
    },
    {
      title: "Revêtements Premium",
      description: "Installation experte de revêtements d&apos;escaliers, sols et murs avec les matériaux les plus nobles",
      image: "https://images.pexels.com/photos/6585593/pexels-photo-6585593.jpeg",
      features: ["Escaliers en pierre", "Sols en marbre", "Murs décoratifs", "Finitions luxueuses"]
    },
    {
      title: "Cuisines Modernes",
      description: "Conception et installation de cuisines contemporaines alliant design et fonctionnalité",
      image: "https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg",
      features: ["Design sur mesure", "Électroménager haut de gamme", "Éclairage LED", "Optimisation espace"]
    },
    {
      title: "Salles de Bains Luxe",
      description: "Création de salles de bains modernes et spa avec les meilleurs matériaux et équipements",
      image: "https://images.pexels.com/photos/6585751/pexels-photo-6585751.jpeg",
      features: ["Douche italienne", "Baignoires design", "Robinetterie premium", "Éclairage d&apos;ambiance"]
    }
  ];

  const portfolio = [
    {
      title: "Cuisine Moderne Minimaliste",
      category: "Cuisine",
      image: "https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg"
    },
    {
      title: "Plan de Travail Granit Noir",
      category: "Granit",
      image: "https://images.pexels.com/photos/6585597/pexels-photo-6585597.jpeg"
    },
    {
      title: "Salle de Bain Spa",
      category: "Salle de Bain",
      image: "https://images.pexels.com/photos/6585751/pexels-photo-6585751.jpeg"
    },
    {
      title: "Escalier Marbre Italien",
      category: "Escalier",
      image: "https://images.pexels.com/photos/6585593/pexels-photo-6585593.jpeg"
    },
    {
      title: "Îlot Central Quartz",
      category: "Quartz",
      image: "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg"
    },
    {
      title: "Douche Marbre Carrara",
      category: "Marbre",
      image: "https://images.pexels.com/photos/6480263/pexels-photo-6480263.jpeg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-200/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Crown className="h-8 w-8 text-amber-600" />
              <span className="text-xl font-bold text-gray-900">Ronovlux Group</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#accueil" className="text-gray-700 hover:text-amber-600 transition-colors">Accueil</a>
              <a href="#services" className="text-gray-700 hover:text-amber-600 transition-colors">Services</a>
              <a href="#realisations" className="text-gray-700 hover:text-amber-600 transition-colors">Réalisations</a>
              <a href="#contact" className="text-gray-700 hover:text-amber-600 transition-colors">Contact</a>
              <Button className="bg-amber-600 hover:bg-amber-700 text-white px-6">
                Devis Gratuit
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="accueil" className="relative pb-30 pt-40 flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('https://images.pexels.com/photos/6585597/pexels-photo-6585597.jpeg')"
          }}
        />
        <div className={`relative z-10 text-center text-white max-w-4xl mx-auto px-4 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="h-8 w-8 text-amber-400 mr-3" />
            <Badge variant="secondary" className="bg-amber-600/20 text-amber-200 border-amber-400/30 text-sm px-4 py-2">
              Excellence & Raffinement
            </Badge>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent">
            Ronovlux Group
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 font-light leading-relaxed">
            Votre partenaire d&apos;exception pour la transformation de vos espaces<br />
            <span className="text-amber-300">Granit • Marbre • Quartz • Cuisines • Salles de Bains</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full text-lg font-medium shadow-2xl transform hover:scale-105 transition-all duration-300">
              <Calendar className="mr-2 h-5 w-5" />
              Demander un Devis Gratuit
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-amber-700 hover:bg-white hover:text-gray-900 px-8 py-4 rounded-full text-lg font-medium backdrop-blur-sm">
              <Phone className="mr-2 h-5 w-5" />
              Nous Appeler
            </Button>
          </div>
          <div className="mt-12 animate-bounce">
            <ChevronDown className="h-8 w-8 text-amber-400 mx-auto" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Award className="h-8 w-8 text-amber-600 mr-3" />
                <Badge variant="outline" className="border-amber-600 text-amber-700">À Propos</Badge>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                L&apos;Excellence au Service de Votre Habitat
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Depuis notre création, <strong>Ronovlux Group Sarl</strong> s&apos;est imposée comme la référence 
                en matière de rénovation haut de gamme. Nous combinons savoir-faire traditionnel et 
                technologies modernes pour créer des espaces d&apos;exception qui reflètent votre style de vie.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-amber-600 mb-2">500+</div>
                  <div className="text-sm text-gray-600">Projets Réalisés</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-amber-600 mb-2">15+</div>
                  <div className="text-sm text-gray-600">Années d&apos;Expérience</div>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Check className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Notre Engagement Qualité</h4>
                  <p className="text-gray-600">Matériaux premium, artisans certifiés et garantie étendue sur tous nos travaux.</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/20 to-transparent rounded-2xl transform rotate-3"></div>
              <img 
                src="https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg" 
                alt="Réalisation Ronovlux" 
                className="rounded-2xl shadow-2xl relative z-10 w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Wrench className="h-8 w-8 text-amber-600 mr-3" />
              <Badge variant="outline" className="border-amber-600 text-amber-700">Nos Services</Badge>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Des Services d&apos;Exception
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez notre gamme complète de services premium pour transformer vos espaces
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className={`group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:scale-105 ${
                  activeService === index ? 'ring-2 ring-amber-500 shadow-2xl' : ''
                }`}
                onClick={() => setActiveService(index)}
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-700">
                        <Star className="h-4 w-4 text-amber-500 mr-2 fill-current" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="realisations" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Crown className="h-8 w-8 text-amber-600 mr-3" />
              <Badge variant="outline" className="border-amber-600 text-amber-700">Portfolio</Badge>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Nos Plus Belles Réalisations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez quelques-uns de nos projets les plus prestigieux
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolio.map((project, index) => (
              <div key={index} className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <Badge className="bg-amber-600 text-white mb-2">{project.category}</Badge>
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-8 py-3 rounded-full">
              <Users className="mr-2 h-5 w-5" />
              Voir Tous Nos Projets
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-gray-900 to-slate-800 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Phone className="h-8 w-8 text-amber-400 mr-3" />
              <Badge variant="secondary" className="bg-amber-600/20 text-amber-200 border-amber-400/30">Contact</Badge>
            </div>
            <h2 className="text-4xl font-bold mb-6">
              Démarrons Votre Projet
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Contactez-nous dès aujourd&apos;hui pour un devis gratuit et personnalisé
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-white/5 backdrop-blur-sm border-gray-700">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Demande de Devis</h3>
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input placeholder="Prénom" className="bg-white/10 border-gray-600 text-white placeholder:text-gray-400" />
                    <Input placeholder="Nom" className="bg-white/10 border-gray-600 text-white placeholder:text-gray-400" />
                  </div>
                  <Input placeholder="Email" type="email" className="bg-white/10 border-gray-600 text-white placeholder:text-gray-400" />
                  <Input placeholder="Téléphone" type="tel" className="bg-white/10 border-gray-600 text-white placeholder:text-gray-400" />
                  <Textarea placeholder="Décrivez votre projet..." className="bg-white/10 border-gray-600 text-white placeholder:text-gray-400 h-32" />
                  <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3">
                    <Mail className="mr-2 h-5 w-5" />
                    Envoyer ma Demande
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info & Map */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Nos Coordonnées</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <MapPin className="h-6 w-6 text-amber-400 mr-4" />
                    <div>
                      <p className="text-white font-medium">Adresse</p>
                      <p className="text-gray-300">123 Avenue de la Pierre, 75000 Paris</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-6 w-6 text-amber-400 mr-4" />
                    <div>
                      <p className="text-white font-medium">Téléphone</p>
                      <p className="text-gray-300">+33 1 23 45 67 89</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-6 w-6 text-amber-400 mr-4" />
                    <div>
                      <p className="text-white font-medium">Email</p>
                      <p className="text-gray-300">contact@ronovluxgroup.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-gray-800 rounded-lg p-8 text-center">
                <MapPin className="h-12 w-12 text-amber-400 mx-auto mb-4" />
                <p className="text-gray-300">Carte Interactive</p>
                <p className="text-sm text-gray-400 mt-2">
                  Cliquez ici pour voir notre emplacement sur Google Maps
                </p>
              </div>

              {/* Social Media */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Suivez-nous</h4>
                <div className="flex space-x-4">
                  <Button size="sm" variant="outline" className="border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-white">
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-white">
                    <Instagram className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-white">
                    <Music className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-white">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Crown className="h-8 w-8 text-amber-500" />
                <span className="text-xl font-bold">Ronovlux Group</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Votre partenaire d&apos;exception pour la transformation de vos espaces avec les matériaux les plus nobles.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Granit & Marbre</li>
                <li>Quartz Premium</li>
                <li>Cuisines Modernes</li>
                <li>Salles de Bains</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>+33 1 23 45 67 89</li>
                <li>contact@ronovluxgroup.com</li>
                <li>123 Avenue de la Pierre</li>
                <li>75000 Paris, France</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Ronovlux Group Sarl. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}