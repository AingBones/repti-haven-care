
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, Users, DollarSign, TrendingUp, Heart, Clock, 
  CheckCircle, AlertCircle, Home, Phone, Camera, Settings 
} from 'lucide-react';
import { dummyPets, dummyBookings, dashboardStats } from '@/data/dummyData';

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  
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

  const getPriorityBookings = () => {
    return dummyBookings
      .filter(booking => booking.status === 'Pending' || booking.status === 'Confirmed')
      .sort((a, b) => new Date(a.checkInDate).getTime() - new Date(b.checkInDate).getTime())
      .slice(0, 5);
  };

  const getPetsInCare = () => {
    return dummyBookings
      .filter(booking => booking.status === 'In Care')
      .map(booking => ({
        ...booking,
        pet: dummyPets.find(pet => pet.id === booking.petId)
      }));
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
                ReptileCare Admin
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, Dr. Amanda</span>
              <Button variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Manage bookings, monitor pets, and oversee operations</p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="pets">Pets in Care</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-emerald-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    Rp {dashboardStats.monthlyRevenue.toLocaleString('id-ID')}
                  </div>
                  <p className="text-xs text-gray-500">This month</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/80 backdrop-blur-sm border-emerald-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Active Bookings</CardTitle>
                  <Calendar className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{dashboardStats.activBookings}</div>
                  <p className="text-xs text-gray-500">Currently in care</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/80 backdrop-blur-sm border-emerald-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Occupancy Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">{dashboardStats.occupancyRate}%</div>
                  <p className="text-xs text-gray-500">Facility utilization</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/80 backdrop-blur-sm border-emerald-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Satisfaction</CardTitle>
                  <Heart className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-500">{dashboardStats.customerSatisfaction}/5.0</div>
                  <p className="text-xs text-gray-500">Customer rating</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions & Priority Items */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-emerald-200">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800 flex items-center">
                    <AlertCircle className="mr-2 h-5 w-5 text-yellow-600" />
                    Priority Actions
                  </CardTitle>
                  <CardDescription>Immediate attention required</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {getPriorityBookings().map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div>
                        <p className="font-medium text-gray-800">{booking.petName}</p>
                        <p className="text-sm text-gray-600">
                          {booking.status === 'Pending' ? 'Needs confirmation' : `Check-in: ${new Date(booking.checkInDate).toLocaleDateString('id-ID')}`}
                        </p>
                      </div>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-emerald-200">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800 flex items-center">
                    <Heart className="mr-2 h-5 w-5 text-emerald-600" />
                    Pets Currently in Care
                  </CardTitle>
                  <CardDescription>Animals under our supervision</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {getPetsInCare().map((booking) => (
                    <div key={booking.id} className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                      <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                        <span className="text-lg">🦎</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{booking.petName}</p>
                        <p className="text-sm text-gray-600">{booking.pet?.species}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Owner:</p>
                        <p className="text-sm font-medium">{booking.ownerName}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">All Bookings</h2>
              <div className="flex space-x-2">
                <Button variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                  Filter
                </Button>
                <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                  Export Data
                </Button>
              </div>
            </div>
            
            <div className="grid gap-4">
              {dummyBookings.map((booking) => (
                <Card key={booking.id} className="bg-white/80 backdrop-blur-sm border-emerald-200 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{booking.petName}</h3>
                        <p className="text-gray-600">Owner: {booking.ownerName}</p>
                        <p className="text-sm text-gray-500">Booking ID: {booking.id}</p>
                      </div>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Check-in Date</p>
                        <p className="font-medium">{new Date(booking.checkInDate).toLocaleDateString('id-ID')}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Check-out Date</p>
                        <p className="font-medium">{new Date(booking.checkOutDate).toLocaleDateString('id-ID')}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Total Cost</p>
                        <p className="font-medium text-emerald-600">Rp {booking.totalCost.toLocaleString('id-ID')}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex space-x-2">
                        {booking.services.map((service, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                          View Details
                        </Button>
                        {booking.status === 'Pending' && (
                          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                            Approve
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Pets in Care Tab */}
          <TabsContent value="pets" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Pets Currently in Care</h2>
              <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                <Camera className="mr-2 h-4 w-4" />
                Daily Photo Report
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getPetsInCare().map((booking) => {
                const pet = booking.pet;
                if (!pet) return null;
                
                return (
                  <Card key={booking.id} className="bg-white/80 backdrop-blur-sm border-emerald-200 hover:shadow-lg transition-all duration-300 overflow-hidden">
                    <div className="aspect-square bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                      <img 
                        src={pet.photo} 
                        alt={pet.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl text-gray-800">{pet.name}</CardTitle>
                          <CardDescription className="text-gray-600">
                            {pet.species} • {pet.age} years old
                          </CardDescription>
                        </div>
                        <Badge className="bg-green-100 text-green-700 border-green-200">
                          In Care
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2 text-sm">
                          <Users className="h-4 w-4 text-gray-600" />
                          <span className="text-gray-600">Owner:</span>
                          <span className="font-medium">{booking.ownerName}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Phone className="h-4 w-4 text-gray-600" />
                          <span className="font-medium">{booking.ownerPhone}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Calendar className="h-4 w-4 text-gray-600" />
                          <span className="text-gray-600">Until:</span>
                          <span className="font-medium">{new Date(booking.checkOutDate).toLocaleDateString('id-ID')}</span>
                        </div>
                        
                        <div className="pt-2 border-t border-gray-200">
                          <p className="text-xs text-gray-500 mb-2">Special Needs:</p>
                          <div className="flex flex-wrap gap-1">
                            {pet.specialNeeds.slice(0, 2).map((need, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {need}
                              </Badge>
                            ))}
                            {pet.specialNeeds.length > 2 && (
                              <Badge variant="secondary" className="text-xs">
                                +{pet.specialNeeds.length - 2}
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex space-x-2 pt-2">
                          <Button size="sm" variant="outline" className="flex-1 border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                            Daily Report
                          </Button>
                          <Button size="sm" className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                            Health Check
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Reports & Analytics</h2>
              <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                Generate Report
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-emerald-200">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">Monthly Summary</CardTitle>
                  <CardDescription>Key performance indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Bookings</span>
                    <span className="font-semibold text-2xl text-emerald-600">{dummyBookings.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Revenue</span>
                    <span className="font-semibold text-2xl text-green-600">
                      Rp {dashboardStats.monthlyRevenue.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Average Stay</span>
                    <span className="font-semibold text-2xl text-blue-600">{dashboardStats.averageStayDuration} days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Customer Rating</span>
                    <span className="font-semibold text-2xl text-yellow-600">{dashboardStats.customerSatisfaction}/5.0</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-emerald-200">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">Booking Status Distribution</CardTitle>
                  <CardDescription>Current booking statuses</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {['Pending', 'Confirmed', 'In Care', 'Completed', 'Cancelled'].map((status) => {
                    const count = dummyBookings.filter(b => b.status === status).length;
                    const percentage = Math.round((count / dummyBookings.length) * 100);
                    
                    return (
                      <div key={status} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">{status}</span>
                          <span className="font-medium">{count} ({percentage}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-emerald-600 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
