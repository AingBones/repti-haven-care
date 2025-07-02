
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, Heart, Users, Clock, Thermometer, Camera, 
  Award, CheckCircle, Star, Phone, Mail, MapPin,
  ArrowLeft, Calendar
} from 'lucide-react';

const LearnMore = () => {
  const services = [
    {
      title: "Penitipan Harian",
      description: "Layanan penitipan untuk reptile kesayangan Anda dengan pengawasan 24/7",
      features: ["Kandang individual", "Kontrol suhu optimal", "Pemberian makan teratur", "Monitoring kesehatan"],
      price: "Mulai dari Rp 150.000/hari"
    },
    {
      title: "Perawatan Medis",
      description: "Pemeriksaan kesehatan dan perawatan medis oleh dokter hewan berpengalaman",
      features: ["Pemeriksaan rutin", "Pengobatan penyakit", "Vaksinasi", "Konsultasi gratis"],
      price: "Mulai dari Rp 200.000"
    },
    {
      title: "Grooming & Spa",
      description: "Layanan perawatan tubuh dan pembersihan untuk menjaga kesehatan reptile",
      features: ["Pembersihan kulit", "Perawatan kuku", "Mandi khusus", "Terapi UV"],
      price: "Mulai dari Rp 100.000"
    }
  ];

  const facilities = [
    {
      icon: Thermometer,
      title: "Kontrol Suhu Otomatis",
      description: "Sistem pengatur suhu dan kelembaban otomatis sesuai kebutuhan setiap spesies reptile"
    },
    {
      icon: Camera,
      title: "CCTV 24/7",
      description: "Pemantauan keamanan dan kesehatan hewan peliharaan sepanjang waktu"
    },
    {
      icon: Heart,
      title: "Tim Medis Ahli",
      description: "Dokter hewan spesialis reptile dengan pengalaman lebih dari 10 tahun"
    },
    {
      icon: Shield,
      title: "Fasilitas Steril",
      description: "Lingkungan bersih dan steril dengan protokol kebersihan ketat"
    }
  ];

  const certifications = [
    "Sertifikat Dokter Hewan Spesialis Reptile",
    "Lisensi Fasilitas Penitipan Hewan",
    "Sertifikat ISO 9001:2015",
    "Anggota Asosiasi Dokter Hewan Indonesia"
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      pet: "Bearded Dragon - Rex",
      rating: 5,
      comment: "Pelayanan luar biasa! Rex terlihat sangat bahagia dan sehat setelah dititipkan di ReptileCare. Tim sangat profesional dan peduli.",
      image: "/placeholder.svg"
    },
    {
      name: "Michael Chen",
      pet: "Ball Python - Luna",
      rating: 5,
      comment: "Fasilitas modern dan bersih. Luna mendapat perawatan terbaik dan saya mendapat laporan harian yang detail. Sangat rekomendasi!",
      image: "/placeholder.svg"
    },
    {
      name: "Lisa Rodriguez",
      pet: "Green Iguana - Verde",
      rating: 5,
      comment: "Dr. Amanda dan timnya sangat ahli dalam menangani reptile. Verde mendapat perawatan medis yang tepat dan sembuh dengan cepat.",
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-emerald-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🦎</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                ReptileCare
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Kembali
                </Button>
              </Link>
              <Link to="/booking">
                <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                  <Calendar className="mr-2 h-4 w-4" />
                  Booking Sekarang
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent">
            Mengapa Memilih ReptileCare?
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Kami adalah fasilitas penitipan reptile terdepan dengan standar internasional, 
            didukung oleh tim ahli dan teknologi modern untuk memberikan perawatan terbaik bagi reptile kesayangan Anda.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Layanan Kami
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-emerald-200 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">{service.title}</CardTitle>
                  <CardDescription className="text-gray-600">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-emerald-600 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                    {service.price}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Fasilitas Modern
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {facilities.map((facility, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-emerald-200 text-center hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mb-4">
                    <facility.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg text-gray-800">{facility.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">{facility.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Sertifikasi & Kredibilitas
          </h2>
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/80 backdrop-blur-sm border-emerald-200">
              <CardHeader className="text-center">
                <Award className="mx-auto h-12 w-12 text-emerald-600 mb-4" />
                <CardTitle className="text-2xl text-gray-800">Standar Internasional</CardTitle>
                <CardDescription className="text-gray-600">
                  ReptileCare memiliki berbagai sertifikasi dan kredibilitas yang menjamin kualitas layanan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {certifications.map((cert, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-emerald-600" />
                      <span className="text-gray-700">{cert}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Testimoni Pelanggan
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-emerald-200 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription className="text-emerald-600 font-medium">
                    {testimonial.pet}
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

      {/* Contact Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="container mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-8">Hubungi Kami</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <Phone className="h-8 w-8 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Telepon</h3>
              <p>+62 812-3456-7890</p>
              <p className="text-emerald-100">24/7 Emergency Line</p>
            </div>
            <div className="flex flex-col items-center">
              <Mail className="h-8 w-8 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p>info@reptilecare.com</p>
              <p className="text-emerald-100">Respon dalam 2 jam</p>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="h-8 w-8 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Alamat</h3>
              <p>Jl. Sudirman No. 123</p>
              <p className="text-emerald-100">Jakarta Selatan</p>
            </div>
          </div>
          <div className="mt-12">
            <Link to="/booking">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-50 text-lg px-8 py-4 rounded-xl shadow-lg">
                <Calendar className="mr-2 h-5 w-5" />
                Booking Sekarang
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">🦎</span>
            </div>
            <span className="text-xl font-bold">ReptileCare</span>
          </div>
          <p className="text-gray-400 mb-4">
            Penitipan reptile terpercaya dengan layanan profesional dan fasilitas modern.
          </p>
          <p className="text-gray-500">&copy; 2024 ReptileCare. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LearnMore;
