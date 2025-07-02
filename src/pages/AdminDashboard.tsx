import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/sonner';
import { 
  Calendar, Users, DollarSign, TrendingUp, Heart, Clock, 
  CheckCircle, AlertCircle, Home, Phone, Camera, Settings,
  Thermometer, Activity, Utensils, Droplets, FileText, Eye
} from 'lucide-react';
import { dummyPets, dummyBookings, dashboardStats } from '@/data/dummyData';
import AdminSettings from '@/components/AdminSettings';
import FilterDialog from '@/components/FilterDialog';
import ExportDialog from '@/components/ExportDialog';

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [filteredBookings, setFilteredBookings] = useState(dummyBookings);
  const [healthCheckData, setHealthCheckData] = useState({
    temperature: '',
    activity: 'Normal',
    appetite: 'Baik',
    notes: ''
  });
  const [dailyReportData, setDailyReportData] = useState({
    feeding: { morning: false, afternoon: false, evening: false, notes: '' },
    health: { temperature: '', activity: 'Normal', appetite: 'Baik', notes: '' },
    cleaning: { habitat: false, water: false, notes: '' },
    photos: []
  });
  
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
    return filteredBookings
      .filter(booking => booking.status === 'Pending' || booking.status === 'Confirmed')
      .sort((a, b) => new Date(a.checkInDate).getTime() - new Date(b.checkInDate).getTime())
      .slice(0, 5);
  };

  const getPetsInCare = () => {
    return filteredBookings
      .filter(booking => booking.status === 'In Care')
      .map(booking => ({
        ...booking,
        pet: dummyPets.find(pet => pet.id === booking.petId)
      }));
  };

  const handleApproveBooking = (bookingId: string) => {
    toast.success(`Booking ${bookingId} berhasil disetujui!`);
    console.log('Menyetujui booking:', bookingId);
  };

  const handleHealthCheck = (petId: string) => {
    console.log('Data pemeriksaan kesehatan:', healthCheckData);
    toast.success('Pemeriksaan kesehatan berhasil disimpan!');
    setHealthCheckData({ temperature: '', activity: 'Normal', appetite: 'Baik', notes: '' });
  };

  const handleDailyReport = (petId: string) => {
    console.log('Data laporan harian:', dailyReportData);
    toast.success('Laporan harian berhasil disimpan!');
    setDailyReportData({
      feeding: { morning: false, afternoon: false, evening: false, notes: '' },
      health: { temperature: '', activity: 'Normal', appetite: 'Baik', notes: '' },
      cleaning: { habitat: false, water: false, notes: '' },
      photos: []
    });
  };

  const handleViewBookingDetails = (booking: any) => {
    setSelectedBooking(booking);
  };

  const handleApplyFilter = (filters: any) => {
    console.log('Filter diterapkan:', filters);
    // Apply filters to bookings data
    let filtered = [...dummyBookings];
    
    if (filters.status) {
      filtered = filtered.filter(booking => booking.status.toLowerCase().includes(filters.status));
    }
    
    if (filters.ownerName) {
      filtered = filtered.filter(booking => 
        booking.ownerName.toLowerCase().includes(filters.ownerName.toLowerCase())
      );
    }
    
    setFilteredBookings(filtered);
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
              <span className="text-gray-600">Selamat datang, Dr. Amanda</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Dashboard Admin
          </h1>
          <p className="text-gray-600">Kelola pemesanan, pantau hewan peliharaan, dan awasi operasional</p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="overview">Ringkasan</TabsTrigger>
            <TabsTrigger value="bookings">Pemesanan</TabsTrigger>
            <TabsTrigger value="pets">Hewan dalam Perawatan</TabsTrigger>
            <TabsTrigger value="reports">Laporan</TabsTrigger>
            <TabsTrigger value="settings">Pengaturan</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-emerald-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Pendapatan</CardTitle>
                  <DollarSign className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    Rp {dashboardStats.monthlyRevenue.toLocaleString('id-ID')}
                  </div>
                  <p className="text-xs text-gray-500">Bulan ini</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/80 backdrop-blur-sm border-emerald-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Pemesanan Aktif</CardTitle>
                  <Calendar className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{dashboardStats.activBookings}</div>
                  <p className="text-xs text-gray-500">Sedang dalam perawatan</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/80 backdrop-blur-sm border-emerald-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Tingkat Hunian</CardTitle>
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">{dashboardStats.occupancyRate}%</div>
                  <p className="text-xs text-gray-500">Utilisasi fasilitas</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/80 backdrop-blur-sm border-emerald-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Kepuasan</CardTitle>
                  <Heart className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-500">{dashboardStats.customerSatisfaction}/5.0</div>
                  <p className="text-xs text-gray-500">Rating pelanggan</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions & Priority Items */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-emerald-200">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800 flex items-center">
                    <AlertCircle className="mr-2 h-5 w-5 text-yellow-600" />
                    Tindakan Prioritas
                  </CardTitle>
                  <CardDescription>Memerlukan perhatian segera</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {getPriorityBookings().map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div>
                        <p className="font-medium text-gray-800">{booking.petName}</p>
                        <p className="text-sm text-gray-600">
                          {booking.status === 'Pending' ? 'Perlu konfirmasi' : `Check-in: ${new Date(booking.checkInDate).toLocaleDateString('id-ID')}`}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status === 'Pending' ? 'Menunggu' : 
                           booking.status === 'Confirmed' ? 'Dikonfirmasi' : booking.status}
                        </Badge>
                        {booking.status === 'Pending' && (
                          <Button 
                            size="sm" 
                            onClick={() => handleApproveBooking(booking.id)}
                            className="bg-emerald-600 hover:bg-emerald-700"
                          >
                            Setujui
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-emerald-200">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800 flex items-center">
                    <Heart className="mr-2 h-5 w-5 text-emerald-600" />
                    Hewan Sedang dalam Perawatan
                  </CardTitle>
                  <CardDescription>Hewan di bawah pengawasan kami</CardDescription>
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
                        <p className="text-sm text-gray-600">Pemilik:</p>
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
              <h2 className="text-2xl font-bold text-gray-800">Semua Pemesanan</h2>
              <div className="flex space-x-2">
                <FilterDialog onApplyFilter={handleApplyFilter} />
                <ExportDialog />
              </div>
            </div>
            
            <div className="grid gap-4">
              {filteredBookings.map((booking) => (
                <Card key={booking.id} className="bg-white/80 backdrop-blur-sm border-emerald-200 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{booking.petName}</h3>
                        <p className="text-gray-600">Pemilik: {booking.ownerName}</p>
                        <p className="text-sm text-gray-500">ID Pemesanan: {booking.id}</p>
                      </div>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status === 'Pending' ? 'Menunggu' : 
                         booking.status === 'Confirmed' ? 'Dikonfirmasi' :
                         booking.status === 'In Care' ? 'Dalam Perawatan' :
                         booking.status === 'Completed' ? 'Selesai' :
                         booking.status === 'Cancelled' ? 'Dibatalkan' : booking.status}
                      </Badge>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Tanggal Check-in</p>
                        <p className="font-medium">{new Date(booking.checkInDate).toLocaleDateString('id-ID')}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Tanggal Check-out</p>
                        <p className="font-medium">{new Date(booking.checkOutDate).toLocaleDateString('id-ID')}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Total Biaya</p>
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
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                              onClick={() => handleViewBookingDetails(booking)}
                            >
                              <Eye className="mr-1 h-4 w-4" />
                              Lihat Detail
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Detail Pemesanan - {booking.petName}</DialogTitle>
                              <DialogDescription>
                                Informasi lengkap pemesanan ID: {booking.id}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-sm font-medium">Nama Hewan</Label>
                                  <p className="text-sm text-gray-600">{booking.petName}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Pemilik</Label>
                                  <p className="text-sm text-gray-600">{booking.ownerName}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Telepon</Label>
                                  <p className="text-sm text-gray-600">{booking.ownerPhone}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Status</Label>
                                  <Badge className={getStatusColor(booking.status)}>
                                    {booking.status === 'Pending' ? 'Menunggu' : 
                                     booking.status === 'Confirmed' ? 'Dikonfirmasi' :
                                     booking.status === 'In Care' ? 'Dalam Perawatan' :
                                     booking.status === 'Completed' ? 'Selesai' :
                                     booking.status === 'Cancelled' ? 'Dibatalkan' : booking.status}
                                  </Badge>
                                </div>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">Layanan</Label>
                                <p className="text-sm text-gray-600">{booking.services.join(', ')}</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">Catatan</Label>
                                <p className="text-sm text-gray-600">{booking.notes}</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">Total Biaya</Label>
                                <p className="text-lg font-semibold text-emerald-600">Rp {booking.totalCost.toLocaleString('id-ID')}</p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        {booking.status === 'Pending' && (
                          <Button 
                            size="sm" 
                            className="bg-emerald-600 hover:bg-emerald-700"
                            onClick={() => handleApproveBooking(booking.id)}
                          >
                            Setujui
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
              <h2 className="text-2xl font-bold text-gray-800">Hewan Sedang dalam Perawatan</h2>
              <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                <Camera className="mr-2 h-4 w-4" />
                Laporan Foto Harian
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
                            {pet.species} • {pet.age} tahun
                          </CardDescription>
                        </div>
                        <Badge className="bg-green-100 text-green-700 border-green-200">
                          Dalam Perawatan
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2 text-sm">
                          <Users className="h-4 w-4 text-gray-600" />
                          <span className="text-gray-600">Pemilik:</span>
                          <span className="font-medium">{booking.ownerName}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Phone className="h-4 w-4 text-gray-600" />
                          <span className="font-medium">{booking.ownerPhone}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Calendar className="h-4 w-4 text-gray-600" />
                          <span className="text-gray-600">Sampai:</span>
                          <span className="font-medium">{new Date(booking.checkOutDate).toLocaleDateString('id-ID')}</span>
                        </div>
                        
                        <div className="pt-2 border-t border-gray-200">
                          <p className="text-xs text-gray-500 mb-2">Kebutuhan Khusus:</p>
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
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline" className="flex-1 border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                                <FileText className="mr-1 h-4 w-4" />
                                Laporan Harian
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Laporan Harian - {pet.name}</DialogTitle>
                                <DialogDescription>
                                  Buat laporan harian untuk {pet.name}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <Label className="text-sm font-medium mb-2 block">Pemberian Makan</Label>
                                  <div className="flex space-x-4 mb-2">
                                    <label className="flex items-center space-x-2">
                                      <input 
                                        type="checkbox" 
                                        checked={dailyReportData.feeding.morning}
                                        onChange={(e) => setDailyReportData({
                                          ...dailyReportData,
                                          feeding: { ...dailyReportData.feeding, morning: e.target.checked }
                                        })}
                                      />
                                      <span className="text-sm">Pagi</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                      <input 
                                        type="checkbox" 
                                        checked={dailyReportData.feeding.afternoon}
                                        onChange={(e) => setDailyReportData({
                                          ...dailyReportData,
                                          feeding: { ...dailyReportData.feeding, afternoon: e.target.checked }
                                        })}
                                      />
                                      <span className="text-sm">Siang</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                      <input 
                                        type="checkbox" 
                                        checked={dailyReportData.feeding.evening}
                                        onChange={(e) => setDailyReportData({
                                          ...dailyReportData,
                                          feeding: { ...dailyReportData.feeding, evening: e.target.checked }
                                        })}
                                      />
                                      <span className="text-sm">Malam</span>
                                    </label>
                                  </div>
                                  <Textarea 
                                    placeholder="Catatan pemberian makan..."
                                    value={dailyReportData.feeding.notes}
                                    onChange={(e) => setDailyReportData({
                                      ...dailyReportData,
                                      feeding: { ...dailyReportData.feeding, notes: e.target.value }
                                    })}
                                  />
                                </div>
                                <div>
                                  <Label className="text-sm font-medium mb-2 block">Kesehatan</Label>
                                  <div className="grid grid-cols-2 gap-4 mb-2">
                                    <div>
                                      <Label className="text-xs">Suhu (°C)</Label>
                                      <Input 
                                        type="number" 
                                        placeholder="37.5"
                                        value={dailyReportData.health.temperature}
                                        onChange={(e) => setDailyReportData({
                                          ...dailyReportData,
                                          health: { ...dailyReportData.health, temperature: e.target.value }
                                        })}
                                      />
                                    </div>
                                    <div>
                                      <Label className="text-xs">Aktivitas</Label>
                                      <select 
                                        className="w-full p-2 border rounded-md text-sm"
                                        value={dailyReportData.health.activity}
                                        onChange={(e) => setDailyReportData({
                                          ...dailyReportData,
                                          health: { ...dailyReportData.health, activity: e.target.value }
                                        })}
                                      >
                                        <option value="Rendah">Rendah</option>
                                        <option value="Normal">Normal</option>
                                        <option value="Tinggi">Tinggi</option>
                                      </select>
                                    </div>
                                  </div>
                                  <Textarea 
                                    placeholder="Catatan kesehatan..."
                                    value={dailyReportData.health.notes}
                                    onChange={(e) => setDailyReportData({
                                      ...dailyReportData,
                                      health: { ...dailyReportData.health, notes: e.target.value }
                                    })}
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button onClick={() => handleDailyReport(pet.id)} className="bg-emerald-600 hover:bg-emerald-700">
                                  Simpan Laporan
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                                <Thermometer className="mr-1 h-4 w-4" />
                                Cek Kesehatan
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Pemeriksaan Kesehatan - {pet.name}</DialogTitle>
                                <DialogDescription>
                                  Catat hasil pemeriksaan kesehatan untuk {pet.name}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor="temperature">Suhu Tubuh (°C)</Label>
                                  <Input 
                                    id="temperature"
                                    type="number" 
                                    placeholder="37.5"
                                    value={healthCheckData.temperature}
                                    onChange={(e) => setHealthCheckData({
                                      ...healthCheckData,
                                      temperature: e.target.value
                                    })}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="activity">Tingkat Aktivitas</Label>
                                  <select 
                                    id="activity"
                                    className="w-full p-2 border rounded-md"
                                    value={healthCheckData.activity}
                                    onChange={(e) => setHealthCheckData({
                                      ...healthCheckData,
                                      activity: e.target.value
                                    })}
                                  >
                                    <option value="Rendah">Rendah</option>
                                    <option value="Normal">Normal</option>
                                    <option value="Tinggi">Tinggi</option>
                                  </select>
                                </div>
                                <div>
                                  <Label htmlFor="appetite">Nafsu Makan</Label>
                                  <select 
                                    id="appetite"
                                    className="w-full p-2 border rounded-md"
                                    value={healthCheckData.appetite}
                                    onChange={(e) => setHealthCheckData({
                                      ...healthCheckData,
                                      appetite: e.target.value
                                    })}
                                  >
                                    <option value="Buruk">Buruk</option>
                                    <option value="Normal">Normal</option>
                                    <option value="Baik">Baik</option>
                                  </select>
                                </div>
                                <div>
                                  <Label htmlFor="notes">Catatan Tambahan</Label>
                                  <Textarea 
                                    id="notes"
                                    placeholder="Catatan pemeriksaan kesehatan..."
                                    value={healthCheckData.notes}
                                    onChange={(e) => setHealthCheckData({
                                      ...healthCheckData,
                                      notes: e.target.value
                                    })}
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button onClick={() => handleHealthCheck(pet.id)} className="bg-emerald-600 hover:bg-emerald-700">
                                  Simpan Pemeriksaan
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
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
              <h2 className="text-2xl font-bold text-gray-800">Laporan & Analitik</h2>
              <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                Buat Laporan
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-emerald-200">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">Ringkasan Bulanan</CardTitle>
                  <CardDescription>Indikator kinerja utama</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Pemesanan</span>
                    <span className="font-semibold text-2xl text-emerald-600">{dummyBookings.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Pendapatan</span>
                    <span className="font-semibold text-2xl text-green-600">
                      Rp {dashboardStats.monthlyRevenue.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Rata-rata Menginap</span>
                    <span className="font-semibold text-2xl text-blue-600">{dashboardStats.averageStayDuration} hari</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Rating Pelanggan</span>
                    <span className="font-semibold text-2xl text-yellow-600">{dashboardStats.customerSatisfaction}/5.0</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-emerald-200">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">Distribusi Status Pemesanan</CardTitle>
                  <CardDescription>Status pemesanan saat ini</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {['Pending', 'Confirmed', 'In Care', 'Completed', 'Cancelled'].map((status) => {
                    const count = dummyBookings.filter(b => b.status === status).length;
                    const percentage = Math.round((count / dummyBookings.length) * 100);
                    const statusText = status === 'Pending' ? 'Menunggu' : 
                                     status === 'Confirmed' ? 'Dikonfirmasi' :
                                     status === 'In Care' ? 'Dalam Perawatan' :
                                     status === 'Completed' ? 'Selesai' :
                                     status === 'Cancelled' ? 'Dibatalkan' : status;
                    
                    return (
                      <div key={status} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">{statusText}</span>
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

          {/* Settings Tab */}
          <TabsContent value="settings">
            <AdminSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
