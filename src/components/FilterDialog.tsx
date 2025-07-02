
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
import { Badge } from '@/components/ui/badge';
import { X, Filter } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface FilterDialogProps {
  onApplyFilter: (filters: any) => void;
}

const FilterDialog = ({ onApplyFilter }: FilterDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: { from: undefined, to: undefined },
    status: '',
    petType: '',
    ownerName: '',
    minAmount: '',
    maxAmount: '',
    services: [] as string[]
  });

  const handleApplyFilters = () => {
    console.log('Menerapkan filter:', filters);
    onApplyFilter(filters);
    toast.success('Filter berhasil diterapkan!');
    setIsOpen(false);
  };

  const handleClearFilters = () => {
    setFilters({
      dateRange: { from: undefined, to: undefined },
      status: '',
      petType: '',
      ownerName: '',
      minAmount: '',
      maxAmount: '',
      services: []
    });
    onApplyFilter({});
    toast.info('Filter berhasil dihapus!');
  };

  const statusOptions = [
    { value: 'pending', label: 'Menunggu' },
    { value: 'confirmed', label: 'Dikonfirmasi' },
    { value: 'in-care', label: 'Dalam Perawatan' },
    { value: 'completed', label: 'Selesai' },
    { value: 'cancelled', label: 'Dibatalkan' }
  ];

  const petTypeOptions = [
    { value: 'bearded-dragon', label: 'Bearded Dragon' },
    { value: 'ball-python', label: 'Ball Python' },
    { value: 'leopard-gecko', label: 'Leopard Gecko' },
    { value: 'corn-snake', label: 'Corn Snake' },
    { value: 'blue-tongue-skink', label: 'Blue Tongue Skink' }
  ];

  const serviceOptions = [
    'Penitipan Harian',
    'Perawatan Medis',
    'Grooming',
    'Konsultasi Kesehatan',
    'Terapi UV'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Filter Data Pemesanan</DialogTitle>
          <DialogDescription>
            Atur filter untuk menampilkan data sesuai kriteria yang diinginkan
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Date Range */}
          <div>
            <Label className="text-sm font-medium">Rentang Tanggal</Label>
            <div className="mt-2">
              <DatePickerWithRange
                date={filters.dateRange}
                setDate={(dateRange) => setFilters({ ...filters, dateRange })}
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <Label className="text-sm font-medium">Status Pemesanan</Label>
            <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Pilih status..." />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Pet Type */}
          <div>
            <Label className="text-sm font-medium">Jenis Hewan</Label>
            <Select value={filters.petType} onValueChange={(value) => setFilters({ ...filters, petType: value })}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Pilih jenis hewan..." />
              </SelectTrigger>
              <SelectContent>
                {petTypeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Owner Name */}
          <div>
            <Label htmlFor="owner-name" className="text-sm font-medium">Nama Pemilik</Label>
            <Input
              id="owner-name"
              placeholder="Cari berdasarkan nama pemilik..."
              value={filters.ownerName}
              onChange={(e) => setFilters({ ...filters, ownerName: e.target.value })}
              className="mt-2"
            />
          </div>

          {/* Price Range */}
          <div>
            <Label className="text-sm font-medium">Rentang Harga</Label>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <Input
                  type="number"
                  placeholder="Harga minimum"
                  value={filters.minAmount}
                  onChange={(e) => setFilters({ ...filters, minAmount: e.target.value })}
                />
              </div>
              <div>
                <Input
                  type="number"
                  placeholder="Harga maksimum"
                  value={filters.maxAmount}
                  onChange={(e) => setFilters({ ...filters, maxAmount: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <Label className="text-sm font-medium">Layanan</Label>
            <div className="mt-2 space-y-2">
              {serviceOptions.map((service) => (
                <div key={service} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={service}
                    checked={filters.services.includes(service)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFilters({
                          ...filters,
                          services: [...filters.services, service]
                        });
                      } else {
                        setFilters({
                          ...filters,
                          services: filters.services.filter(s => s !== service)
                        });
                      }
                    }}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor={service} className="text-sm">{service}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Active Filters */}
          {(filters.status || filters.petType || filters.ownerName || filters.services.length > 0) && (
            <div>
              <Label className="text-sm font-medium">Filter Aktif</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {filters.status && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Status: {statusOptions.find(s => s.value === filters.status)?.label}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setFilters({ ...filters, status: '' })} />
                  </Badge>
                )}
                {filters.petType && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Jenis: {petTypeOptions.find(p => p.value === filters.petType)?.label}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setFilters({ ...filters, petType: '' })} />
                  </Badge>
                )}
                {filters.ownerName && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Pemilik: {filters.ownerName}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setFilters({ ...filters, ownerName: '' })} />
                  </Badge>
                )}
                {filters.services.map((service) => (
                  <Badge key={service} variant="secondary" className="flex items-center gap-1">
                    {service}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => setFilters({
                        ...filters,
                        services: filters.services.filter(s => s !== service)
                      })} 
                    />
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClearFilters}>
            Hapus Filter
          </Button>
          <Button onClick={handleApplyFilters} className="bg-emerald-600 hover:bg-emerald-700">
            Terapkan Filter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FilterDialog;
