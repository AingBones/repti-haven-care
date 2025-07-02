
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/sonner';
import { User, Building, Bell, Shield, Database, Mail } from 'lucide-react';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    profile: {
      name: 'Dr. Amanda',
      email: 'amanda@reptilecare.com',
      phone: '+62 812-3456-7890',
      bio: 'Dokter hewan spesialis reptile dengan pengalaman 10 tahun'
    },
    facility: {
      name: 'ReptileCare Premium',
      address: 'Jl. Sudirman No. 123, Jakarta Selatan',
      capacity: 50,
      operatingHours: '08:00 - 18:00'
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      dailyReports: true
    },
    system: {
      autoBackup: true,
      maintenanceMode: false,
      debugMode: false
    }
  });

  const handleSaveSettings = () => {
    console.log('Menyimpan pengaturan:', settings);
    toast.success('Pengaturan berhasil disimpan!');
  };

  const updateSetting = (section: string, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Pengaturan Admin</h2>
        <p className="text-gray-600">Kelola profil dan konfigurasi sistem</p>
      </div>

      <div className="grid gap-6">
        {/* Profile Settings */}
        <Card className="bg-white/80 backdrop-blur-sm border-emerald-200">
          <CardHeader>
            <CardTitle className="flex items-center text-xl text-gray-800">
              <User className="mr-2 h-5 w-5 text-emerald-600" />
              Profil Admin
            </CardTitle>
            <CardDescription>Informasi profil administrator</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="admin-name">Nama Lengkap</Label>
                <Input
                  id="admin-name"
                  value={settings.profile.name}
                  onChange={(e) => updateSetting('profile', 'name', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="admin-email">Email</Label>
                <Input
                  id="admin-email"
                  type="email"
                  value={settings.profile.email}
                  onChange={(e) => updateSetting('profile', 'email', e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="admin-phone">Nomor Telepon</Label>
              <Input
                id="admin-phone"
                value={settings.profile.phone}
                onChange={(e) => updateSetting('profile', 'phone', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="admin-bio">Bio</Label>
              <Textarea
                id="admin-bio"
                value={settings.profile.bio}
                onChange={(e) => updateSetting('profile', 'bio', e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Facility Settings */}
        <Card className="bg-white/80 backdrop-blur-sm border-emerald-200">
          <CardHeader>
            <CardTitle className="flex items-center text-xl text-gray-800">
              <Building className="mr-2 h-5 w-5 text-emerald-600" />
              Pengaturan Fasilitas
            </CardTitle>
            <CardDescription>Konfigurasi fasilitas penitipan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="facility-name">Nama Fasilitas</Label>
              <Input
                id="facility-name"
                value={settings.facility.name}
                onChange={(e) => updateSetting('facility', 'name', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="facility-address">Alamat</Label>
              <Textarea
                id="facility-address"
                value={settings.facility.address}
                onChange={(e) => updateSetting('facility', 'address', e.target.value)}
                rows={2}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="facility-capacity">Kapasitas Maksimal</Label>
                <Input
                  id="facility-capacity"
                  type="number"
                  value={settings.facility.capacity}
                  onChange={(e) => updateSetting('facility', 'capacity', parseInt(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="facility-hours">Jam Operasional</Label>
                <Input
                  id="facility-hours"
                  value={settings.facility.operatingHours}
                  onChange={(e) => updateSetting('facility', 'operatingHours', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="bg-white/80 backdrop-blur-sm border-emerald-200">
          <CardHeader>
            <CardTitle className="flex items-center text-xl text-gray-800">
              <Bell className="mr-2 h-5 w-5 text-emerald-600" />
              Pengaturan Notifikasi
            </CardTitle>
            <CardDescription>Kelola preferensi notifikasi</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Notifikasi Email</Label>
                <p className="text-sm text-gray-600">Terima notifikasi melalui email</p>
              </div>
              <Switch
                checked={settings.notifications.emailNotifications}
                onCheckedChange={(checked) => updateSetting('notifications', 'emailNotifications', checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>Notifikasi SMS</Label>
                <p className="text-sm text-gray-600">Terima notifikasi melalui SMS</p>
              </div>
              <Switch
                checked={settings.notifications.smsNotifications}
                onCheckedChange={(checked) => updateSetting('notifications', 'smsNotifications', checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>Push Notifications</Label>
                <p className="text-sm text-gray-600">Terima push notifications</p>
              </div>
              <Switch
                checked={settings.notifications.pushNotifications}
                onCheckedChange={(checked) => updateSetting('notifications', 'pushNotifications', checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>Laporan Harian</Label>
                <p className="text-sm text-gray-600">Terima laporan harian otomatis</p>
              </div>
              <Switch
                checked={settings.notifications.dailyReports}
                onCheckedChange={(checked) => updateSetting('notifications', 'dailyReports', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card className="bg-white/80 backdrop-blur-sm border-emerald-200">
          <CardHeader>
            <CardTitle className="flex items-center text-xl text-gray-800">
              <Database className="mr-2 h-5 w-5 text-emerald-600" />
              Pengaturan Sistem
            </CardTitle>
            <CardDescription>Konfigurasi sistem dan keamanan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto Backup</Label>
                <p className="text-sm text-gray-600">Backup otomatis data harian</p>
              </div>
              <Switch
                checked={settings.system.autoBackup}
                onCheckedChange={(checked) => updateSetting('system', 'autoBackup', checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>Mode Maintenance</Label>
                <p className="text-sm text-gray-600">Aktifkan mode pemeliharaan</p>
              </div>
              <Switch
                checked={settings.system.maintenanceMode}
                onCheckedChange={(checked) => updateSetting('system', 'maintenanceMode', checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>Debug Mode</Label>
                <p className="text-sm text-gray-600">Aktifkan mode debugging</p>
              </div>
              <Switch
                checked={settings.system.debugMode}
                onCheckedChange={(checked) => updateSetting('system', 'debugMode', checked)}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSaveSettings} className="bg-emerald-600 hover:bg-emerald-700">
            Simpan Pengaturan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
