
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Shield, Heart, Star, Calendar, Phone, Mail } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: Shield,
      title: "Perawatan Profesional",
      description: "Tim ahli reptile berpengalaman dengan sertifikasi internasional"
    },
    {
      icon: Heart,
      title: "Fasilitas Premium",
      description: "Kandang individual dengan kontrol suhu dan kelembaban optimal"
    },
    {
      icon: Users,
      title: "Monitoring 24/7",
      description: "Pengawasan kesehatan hewan sepanjang waktu dengan laporan harian"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment: "Bearded dragon saya dirawat dengan sangat baik! Pelayanan luar biasa.",
      pet: "Bearded Dragon"
    },
    {
      name: "Michael Chen",
      rating: 5,
      comment: "Fasilitas bersih dan modern. Python saya tampak bahagia dan sehat.",
      pet: "Ball Python"
    },
    {
      name: "Lisa Rodriguez",
      rating: 5,
      comment: "Staff sangat berpengalaman. Iguana saya mendapat perawatan terbaik.",
      pet: "Green Iguana"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-emerald-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🦎</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                ReptileCare
              </span>
            </div>
            <div className="flex space-x-4">
              <Link to="/customer">
                <Button variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                  Dashboard Customer
                </Button>
              </Link>
              <Link to="/admin">
                <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                  Admin Panel
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent leading-tight">
              Penitipan Reptile Terpercaya
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Berikan perawatan terbaik untuk reptile kesayangan Anda dengan fasilitas modern dan tim profesional berpengalaman
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/booking">
                <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <Calendar className="mr-2 h-5 w-5" />
                  Booking Sekarang
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-2 border-emerald-300 text-emerald-700 hover:bg-emerald-50 text-lg px-8 py-6 rounded-xl">
                Pelajari Lebih Lanjut
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white/50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Mengapa Memilih ReptileCare?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-emerald-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-gray-800">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600 text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Apa Kata Mereka?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-emerald-200 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription className="text-emerald-600 font-medium">
                    Owner of {testimonial.pet}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 italic">"{testimonial.comment}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="container mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Siap Menitipkan Reptile Anda?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Hubungi kami sekarang untuk konsultasi gratis dan booking penitipan
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-50 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <Calendar className="mr-2 h-5 w-5" />
                Booking Sekarang
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6 rounded-xl">
              <Phone className="mr-2 h-5 w-5" />
              Hubungi Kami
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">🦎</span>
                </div>
                <span className="text-xl font-bold">ReptileCare</span>
              </div>
              <p className="text-gray-400">
                Penitipan reptile terpercaya dengan layanan profesional dan fasilitas modern.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Layanan</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Penitipan Harian</li>
                <li>Penitipan Mingguan</li>
                <li>Perawatan Medis</li>
                <li>Konsultasi Gratis</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Kontak</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>+62 812-3456-7890</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>info@reptilecare.com</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Jam Operasional</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Senin - Jumat: 8:00 - 18:00</li>
                <li>Sabtu: 8:00 - 16:00</li>
                <li>Minggu: 10:00 - 14:00</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ReptileCare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
