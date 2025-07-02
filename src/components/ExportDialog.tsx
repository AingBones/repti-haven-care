import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
import { Download, FileText, FileSpreadsheet, FileImage } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { DateRange } from 'react-day-picker';

const ExportDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [exportConfig, setExportConfig] = useState({
    type: 'bookings',
    format: 'csv',
    dateRange: undefined as DateRange | undefined,
    includeColumns: {
      id: true,
      petName: true,
      ownerName: true,
      ownerPhone: true,
      checkInDate: true,
      checkOutDate: true,
      status: true,
      services: true,
      totalCost: true,
      notes: false
    }
  });

  const dataTypes = [
    { value: 'bookings', label: 'Data Pemesanan', icon: FileText },
    { value: 'pets', label: 'Data Hewan', icon: FileText },
    { value: 'reports', label: 'Laporan Harian', icon: FileText },
    { value: 'financial', label: 'Laporan Keuangan', icon: FileSpreadsheet }
  ];

  const formatOptions = [
    { value: 'csv', label: 'CSV', icon: FileSpreadsheet },
    { value: 'xlsx', label: 'Excel', icon: FileSpreadsheet },
    { value: 'pdf', label: 'PDF', icon: FileText },
    { value: 'json', label: 'JSON', icon: FileText }
  ];

  const columnOptions = [
    { key: 'id', label: 'ID Pemesanan' },
    { key: 'petName', label: 'Nama Hewan' },
    { key: 'ownerName', label: 'Nama Pemilik' },
    { key: 'ownerPhone', label: 'Nomor Telepon' },
    { key: 'checkInDate', label: 'Tanggal Check-in' },
    { key: 'checkOutDate', label: 'Tanggal Check-out' },
    { key: 'status', label: 'Status' },
    { key: 'services', label: 'Layanan' },
    { key: 'totalCost', label: 'Total Biaya' },
    { key: 'notes', label: 'Catatan' }
  ];

  const handleExport = () => {
    console.log('Mengekspor data dengan konfigurasi:', exportConfig);
    
    // Simulate export process
    const fileName = `${exportConfig.type}_${new Date().toISOString().split('T')[0]}.${exportConfig.format}`;
    
    toast.success(`Data berhasil diekspor ke ${fileName}!`);
    setIsOpen(false);
  };

  const toggleColumn = (columnKey: string) => {
    setExportConfig({
      ...exportConfig,
      includeColumns: {
        ...exportConfig.includeColumns,
        [columnKey]: !exportConfig.includeColumns[columnKey as keyof typeof exportConfig.includeColumns]
      }
    });
  };

  const selectAllColumns = () => {
    const allSelected = Object.values(exportConfig.includeColumns).every(Boolean);
    const newColumns = Object.keys(exportConfig.includeColumns).reduce((acc, key) => {
      acc[key as keyof typeof exportConfig.includeColumns] = !allSelected;
      return acc;
    }, {} as typeof exportConfig.includeColumns);
    
    setExportConfig({
      ...exportConfig,
      includeColumns: newColumns
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
          <Download className="mr-2 h-4 w-4" />
          Ekspor Data
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ekspor Data</DialogTitle>
          <DialogDescription>
            Pilih jenis data dan format yang ingin diekspor
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Data Type */}
          <div>
            <Label className="text-sm font-medium">Jenis Data</Label>
            <Select value={exportConfig.type} onValueChange={(value) => setExportConfig({ ...exportConfig, type: value })}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {dataTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex items-center">
                      <type.icon className="mr-2 h-4 w-4" />
                      {type.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Format */}
          <div>
            <Label className="text-sm font-medium">Format File</Label>
            <Select value={exportConfig.format} onValueChange={(value) => setExportConfig({ ...exportConfig, format: value })}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {formatOptions.map((format) => (
                  <SelectItem key={format.value} value={format.value}>
                    <div className="flex items-center">
                      <format.icon className="mr-2 h-4 w-4" />
                      {format.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Range */}
          <div>
            <Label className="text-sm font-medium">Rentang Tanggal</Label>
            <div className="mt-2">
              <DatePickerWithRange
                date={exportConfig.dateRange}
                setDate={(dateRange) => setExportConfig({ ...exportConfig, dateRange })}
              />
            </div>
          </div>

          {/* Column Selection */}
          {exportConfig.type === 'bookings' && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <Label className="text-sm font-medium">Kolom yang Disertakan</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={selectAllColumns}
                  className="text-xs"
                >
                  {Object.values(exportConfig.includeColumns).every(Boolean) ? 'Hapus Semua' : 'Pilih Semua'}
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {columnOptions.map((column) => (
                  <div key={column.key} className="flex items-center space-x-2">
                    <Checkbox
                      id={column.key}
                      checked={exportConfig.includeColumns[column.key as keyof typeof exportConfig.includeColumns]}
                      onCheckedChange={() => toggleColumn(column.key)}
                    />
                    <Label htmlFor={column.key} className="text-sm font-normal">
                      {column.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Export Preview */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <Label className="text-sm font-medium">Preview Export</Label>
            <div className="mt-2 text-sm text-gray-600">
              <p>Jenis: {dataTypes.find(t => t.value === exportConfig.type)?.label}</p>
              <p>Format: {formatOptions.find(f => f.value === exportConfig.format)?.label}</p>
              <p>Kolom: {Object.values(exportConfig.includeColumns).filter(Boolean).length} kolom dipilih</p>
              {exportConfig.dateRange?.from && exportConfig.dateRange?.to && (
                <p>
                  Periode: {exportConfig.dateRange.from.toLocaleDateString('id-ID')} - {exportConfig.dateRange.to.toLocaleDateString('id-ID')}
                </p>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Batal
          </Button>
          <Button onClick={handleExport} className="bg-emerald-600 hover:bg-emerald-700">
            <Download className="mr-2 h-4 w-4" />
            Ekspor Sekarang
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExportDialog;
