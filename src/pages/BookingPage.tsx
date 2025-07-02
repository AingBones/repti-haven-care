
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Calendar, CheckCircle, ArrowLeft, Star, Shield } from 'lucide-react';
import { servicePackages } from '@/data/dummyData';
import { toast } from '@/hooks/use-toast';

const BookingPage = () => {
  const [formData, setFormData] = useState({
    petName: '',
    petSpecies: '',
    petBreed: '',
    petAge: '',
    petWeight: '',
    petGender: '',
    ownerName: '',
    ownerPhone: '',
    ownerEmail: '',
    checkInDate: '',
    checkOutDate: '',
    selectedPackage: '',
    additionalServices: [] as string[],
    specialInstructions: '',
    emergencyContact: ''
  });

  const additionalServices = [
    { id: 'photo-updates', name: 'Daily Photo Updates', price: 25000 },
    { id: 'video-calls', name: 'Video Call Sessions', price: 50000 },
    { id: 'exercise', name: 'Exercise & Enrichment', price: 35000 },
    { id: 'grooming', name: 'Grooming Service', price: 75000 },
    { id: 'medical', name: 'Health Monitoring', price: 100000 }
  ];

  const calculateTotal = () => {
    if (!formData.checkInDate || !formData.checkOutDate || !formData.selectedPackage) {
      return 0;
    }
    
    const checkIn = new Date(formData.checkInDate);
    const checkOut = new Date(formData.checkOutDate);
    const days = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    
    const selectedPackage = servicePackages.find(pkg => pkg.id === formData.selectedPackage);
    const packageCost = selectedPackage ? selectedPackage.price * days : 0;
    
    const additionalCost = formData.additionalServices.reduce((total, serviceId) => {
      const service = additionalServices.find(s => s.id === serviceId);
      return total + (service ? service.price * days : 0);
    }, 0);
    
    return packageCost + additionalCost;
  };

  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      additionalServices: prev.additionalServices.includes(serviceId)
        ? prev.additionalServices.filter(id => id !== serviceId)
        : [...prev.additionalServices, serviceId]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.petName || !formData.ownerName || !formData.ownerPhone || 
        !formData.checkInDate || !formData.checkOutDate || !formData.selectedPackage) {
      toast({
        title: "Form Incomplete",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Simulate booking submission
    toast({
      title: "Booking Submitted Successfully!",
      description: "We'll contact you within 24 hours to confirm your booking.",
    });

    console.log('Booking submitted:', formData);
  };

  const getDaysCount = () => {
    if (!formData.checkInDate || !formData.checkOutDate) return 0;
    const checkIn = new Date(formData.checkInDate);
    const checkOut = new Date(formData.checkOutDate);
    return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
  };

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
            <Link to="/">
              <Button variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Book Your Reptile's Stay
            </h1>
            <p className="text-xl text-gray-600">
              Provide the best care for your reptile with our professional services
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <Card className="bg-white/80 backdrop-blur-sm border-emerald-200">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-800 flex items-center">
                    <Calendar className="mr-2 h-6 w-6 text-emerald-600" />
                    Booking Details
                  </CardTitle>
                  <CardDescription>
                    Fill in the information about your reptile and preferred dates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Pet Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800 border-b border-emerald-200 pb-2">
                        Pet Information
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="petName">Pet Name *</Label>
                          <Input
                            id="petName"
                            value={formData.petName}
                            onChange={(e) => setFormData(prev => ({ ...prev, petName: e.target.value }))}
                            placeholder="Enter your pet's name"
                            className="border-emerald-200 focus:border-emerald-400"
                          />
                        </div>
                        <div>
                          <Label htmlFor="petSpecies">Species *</Label>
                          <Select 
                            value={formData.petSpecies} 
                            onValueChange={(value) => setFormData(prev => ({ ...prev, petSpecies: value }))}
                          >
                            <SelectTrigger className="border-emerald-200 focus:border-emerald-400">
                              <SelectValue placeholder="Select species" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                              <SelectItem value="bearded-dragon">Bearded Dragon</SelectItem>
                              <SelectItem value="ball-python">Ball Python</SelectItem>
                              <SelectItem value="leopard-gecko">Leopard Gecko</SelectItem>
                              <SelectItem value="iguana">Iguana</SelectItem>
                              <SelectItem value="blue-tongue-skink">Blue Tongue Skink</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="petBreed">Breed</Label>
                          <Input
                            id="petBreed"
                            value={formData.petBreed}
                            onChange={(e) => setFormData(prev => ({ ...prev, petBreed: e.target.value }))}
                            placeholder="Enter breed (if known)"
                            className="border-emerald-200 focus:border-emerald-400"
                          />
                        </div>
                        <div>
                          <Label htmlFor="petAge">Age (years)</Label>
                          <Input
                            id="petAge"
                            type="number"
                            value={formData.petAge}
                            onChange={(e) => setFormData(prev => ({ ...prev, petAge: e.target.value }))}
                            placeholder="Age in years"
                            className="border-emerald-200 focus:border-emerald-400"
                          />
                        </div>
                        <div>
                          <Label htmlFor="petWeight">Weight (grams)</Label>
                          <Input
                            id="petWeight"
                            type="number"
                            value={formData.petWeight}
                            onChange={(e) => setFormData(prev => ({ ...prev, petWeight: e.target.value }))}
                            placeholder="Weight in grams"
                            className="border-emerald-200 focus:border-emerald-400"
                          />
                        </div>
                        <div>
                          <Label htmlFor="petGender">Gender</Label>
                          <Select 
                            value={formData.petGender} 
                            onValueChange={(value) => setFormData(prev => ({ ...prev, petGender: value }))}
                          >
                            <SelectTrigger className="border-emerald-200 focus:border-emerald-400">
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="unknown">Unknown</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Owner Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800 border-b border-emerald-200 pb-2">
                        Contact Information
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="ownerName">Full Name *</Label>
                          <Input
                            id="ownerName"
                            value={formData.ownerName}
                            onChange={(e) => setFormData(prev => ({ ...prev, ownerName: e.target.value }))}
                            placeholder="Your full name"
                            className="border-emerald-200 focus:border-emerald-400"
                          />
                        </div>
                        <div>
                          <Label htmlFor="ownerPhone">Phone Number *</Label>
                          <Input
                            id="ownerPhone"
                            value={formData.ownerPhone}
                            onChange={(e) => setFormData(prev => ({ ...prev, ownerPhone: e.target.value }))}
                            placeholder="+62 812-3456-7890"
                            className="border-emerald-200 focus:border-emerald-400"
                          />
                        </div>
                        <div>
                          <Label htmlFor="ownerEmail">Email Address</Label>
                          <Input
                            id="ownerEmail"
                            type="email"
                            value={formData.ownerEmail}
                            onChange={(e) => setFormData(prev => ({ ...prev, ownerEmail: e.target.value }))}
                            placeholder="your.email@example.com"
                            className="border-emerald-200 focus:border-emerald-400"
                          />
                        </div>
                        <div>
                          <Label htmlFor="emergencyContact">Emergency Contact</Label>
                          <Input
                            id="emergencyContact"
                            value={formData.emergencyContact}
                            onChange={(e) => setFormData(prev => ({ ...prev, emergencyContact: e.target.value }))}
                            placeholder="Emergency contact number"
                            className="border-emerald-200 focus:border-emerald-400"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Booking Dates */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800 border-b border-emerald-200 pb-2">
                        Booking Dates
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="checkInDate">Check-in Date *</Label>
                          <Input
                            id="checkInDate"
                            type="date"
                            value={formData.checkInDate}
                            onChange={(e) => setFormData(prev => ({ ...prev, checkInDate: e.target.value }))}
                            className="border-emerald-200 focus:border-emerald-400"
                          />
                        </div>
                        <div>
                          <Label htmlFor="checkOutDate">Check-out Date *</Label>
                          <Input
                            id="checkOutDate"
                            type="date"
                            value={formData.checkOutDate}
                            onChange={(e) => setFormData(prev => ({ ...prev, checkOutDate: e.target.value }))}
                            className="border-emerald-200 focus:border-emerald-400"
                          />
                        </div>
                      </div>
                      {getDaysCount() > 0 && (
                        <p className="text-sm text-emerald-600 font-medium">
                          Duration: {getDaysCount()} day{getDaysCount() > 1 ? 's' : ''}
                        </p>
                      )}
                    </div>

                    {/* Special Instructions */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800 border-b border-emerald-200 pb-2">
                        Special Instructions
                      </h3>
                      <Textarea
                        value={formData.specialInstructions}
                        onChange={(e) => setFormData(prev => ({ ...prev, specialInstructions: e.target.value }))}
                        placeholder="Any special care instructions, dietary requirements, or behavioral notes..."
                        className="border-emerald-200 focus:border-emerald-400 min-h-[100px]"
                      />
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Service Selection & Summary */}
            <div className="space-y-6">
              {/* Service Packages */}
              <Card className="bg-white/80 backdrop-blur-sm border-emerald-200">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">Select Care Package</CardTitle>
                  <CardDescription>Choose the level of care for your reptile</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {servicePackages.map((pkg) => (
                    <div 
                      key={pkg.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        formData.selectedPackage === pkg.id 
                          ? 'border-emerald-400 bg-emerald-50' 
                          : 'border-gray-200 hover:border-emerald-300'
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, selectedPackage: pkg.id }))}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-800">{pkg.name}</h4>
                        <div className="text-right">
                          <p className="font-bold text-emerald-600">Rp {pkg.price.toLocaleString('id-ID')}</p>
                          <p className="text-xs text-gray-500">{pkg.duration}</p>
                        </div>
                      </div>
                      <ul className="space-y-1">
                        {pkg.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="h-3 w-3 text-emerald-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      {pkg.id === 'premium' && (
                        <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white mt-2">
                          <Star className="h-3 w-3 mr-1" />
                          Most Popular
                        </Badge>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Additional Services */}
              <Card className="bg-white/80 backdrop-blur-sm border-emerald-200">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">Additional Services</CardTitle>
                  <CardDescription>Optional extras to enhance your pet's stay</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {additionalServices.map((service) => (
                    <div key={service.id} className="flex items-center space-x-3">
                      <Checkbox
                        id={service.id}
                        checked={formData.additionalServices.includes(service.id)}
                        onCheckedChange={() => handleServiceToggle(service.id)}
                        className="border-emerald-300 data-[state=checked]:bg-emerald-600"
                      />
                      <Label htmlFor={service.id} className="flex-1 cursor-pointer">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-800">{service.name}</span>
                          <span className="text-sm font-medium text-emerald-600">
                            +Rp {service.price.toLocaleString('id-ID')}/day
                          </span>
                        </div>
                      </Label>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Booking Summary */}
              <Card className="bg-white/80 backdrop-blur-sm border-emerald-200">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formData.selectedPackage && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Selected Package:</span>
                        <span className="font-medium">
                          {servicePackages.find(p => p.id === formData.selectedPackage)?.name}
                        </span>
                      </div>
                      {getDaysCount() > 0 && (
                        <div className="flex justify-between text-sm">
                          <span>Duration:</span>
                          <span className="font-medium">{getDaysCount()} day{getDaysCount() > 1 ? 's' : ''}</span>
                        </div>
                      )}
                      {formData.additionalServices.length > 0 && (
                        <div className="space-y-1">
                          <p className="text-sm text-gray-600">Additional Services:</p>
                          {formData.additionalServices.map(serviceId => {
                            const service = additionalServices.find(s => s.id === serviceId);
                            return service ? (
                              <div key={serviceId} className="flex justify-between text-xs text-gray-600 ml-4">
                                <span>• {service.name}</span>
                                <span>+Rp {(service.price * getDaysCount()).toLocaleString('id-ID')}</span>
                              </div>
                            ) : null;
                          })}
                        </div>
                      )}
                    </div>
                  )}
                  
                  {calculateTotal() > 0 && (
                    <>
                      <div className="border-t border-emerald-200 pt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold text-gray-800">Total:</span>
                          <span className="text-2xl font-bold text-emerald-600">
                            Rp {calculateTotal().toLocaleString('id-ID')}
                          </span>
                        </div>
                      </div>
                      
                      <Button 
                        onClick={handleSubmit}
                        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-lg py-6"
                      >
                        <Shield className="mr-2 h-5 w-5" />
                        Confirm Booking
                      </Button>
                    </>
                  )}
                  
                  <div className="text-xs text-gray-500 text-center">
                    * Final confirmation and payment will be processed after we contact you
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
