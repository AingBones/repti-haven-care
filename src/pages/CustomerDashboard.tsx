
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, User, Phone, Mail, Home, Plus, Camera, Heart, Clock, CheckCircle } from 'lucide-react';
import { dummyPets, dummyBookings, dummyReports } from '@/data/dummyData';

const CustomerDashboard = () => {
  const [selectedCustomer] = useState('owner1'); // Simulating logged in customer
  
  // Filter data for current customer
  const customerPets = dummyPets.filter(pet => pet.ownerId === selectedCustomer);
  const customerBookings = dummyBookings.filter(booking => 
    customerPets.some(pet => pet.id === booking.petId)
  );
  const activeBookings = customerBookings.filter(booking => 
    booking.status === 'In Care' || booking.status === 'Confirmed'
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'In Care': return 'bg-green-100 text-green-700 border-green-200';
      case 'Completed': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const currentCustomer = dummyPets.find(pet => pet.ownerId === selectedCustomer);

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
              <span className="text-gray-600">Welcome back, {currentCustomer?.ownerName}!</span>
              <Link to="/booking">
                <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                  <Plus className="mr-2 h-4 w-4" />
                  New Booking
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Customer Dashboard
          </h1>
          <p className="text-gray-600">Manage your reptile care bookings and track your pets</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-emerald-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Pets</CardTitle>
              <Heart className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">{customerPets.length}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm border-emerald-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Bookings</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{activeBookings.length}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm border-emerald-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{customerBookings.length}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm border-emerald-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {customerBookings.filter(b => b.status === 'Completed').length}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="pets">My Pets</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">My Bookings</h2>
              <Link to="/booking">
                <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                  <Plus className="mr-2 h-4 w-4" />
                  New Booking
                </Button>
              </Link>
            </div>
            
            <div className="grid gap-6">
              {customerBookings.map((booking) => (
                <Card key={booking.id} className="bg-white/80 backdrop-blur-sm border-emerald-200 hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl text-gray-800">{booking.petName}</CardTitle>
                        <CardDescription className="text-gray-600">
                          Booking ID: {booking.id}
                        </CardDescription>
                      </div>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>Check-in: {new Date(booking.checkInDate).toLocaleDateString('id-ID')}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>Check-out: {new Date(booking.checkOutDate).toLocaleDateString('id-ID')}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <span className="font-semibold">Services:</span>
                          <span>{booking.services.join(', ')}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-lg font-semibold text-emerald-600">
                          Rp {booking.totalCost.toLocaleString('id-ID')}
                        </div>
                        {booking.notes && (
                          <p className="text-sm text-gray-600 italic">"{booking.notes}"</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Pets Tab */}
          <TabsContent value="pets" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">My Pets</h2>
              <Button variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                <Plus className="mr-2 h-4 w-4" />
                Add Pet
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {customerPets.map((pet) => (
                <Card key={pet.id} className="bg-white/80 backdrop-blur-sm border-emerald-200 hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="aspect-square bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                    <img 
                      src={pet.photo} 
                      alt={pet.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-800">{pet.name}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {pet.species} • {pet.gender} • {pet.age} years old
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Breed:</span>
                        <span className="font-medium">{pet.breed}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Weight:</span>
                        <span className="font-medium">{pet.weight}g</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Color:</span>
                        <span className="font-medium">{pet.color}</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-xs text-gray-500 mb-2">Special Needs:</p>
                      <div className="flex flex-wrap gap-1">
                        {pet.specialNeeds.slice(0, 2).map((need, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {need}
                          </Badge>
                        ))}
                        {pet.specialNeeds.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{pet.specialNeeds.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
            
            <Card className="bg-white/80 backdrop-blur-sm border-emerald-200">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">Customer Information</CardTitle>
                <CardDescription>Your personal details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-emerald-600" />
                      <div>
                        <p className="text-sm text-gray-600">Full Name</p>
                        <p className="font-medium">{currentCustomer?.ownerName}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-emerald-600" />
                      <div>
                        <p className="text-sm text-gray-600">Phone Number</p>
                        <p className="font-medium">{currentCustomer?.ownerPhone}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-emerald-600" />
                      <div>
                        <p className="text-sm text-gray-600">Email Address</p>
                        <p className="font-medium">sarah.johnson@email.com</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Home className="h-5 w-5 text-emerald-600" />
                      <div>
                        <p className="text-sm text-gray-600">Address</p>
                        <p className="font-medium">Jl. Kebon Jeruk No. 123<br />Jakarta Barat, 11530</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-emerald-600" />
                      <div>
                        <p className="text-sm text-gray-600">Member Since</p>
                        <p className="font-medium">January 2024</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-emerald-200">
                  <Button variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CustomerDashboard;
