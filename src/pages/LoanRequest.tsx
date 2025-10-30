import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Asset, Employee, Loan } from '@/types';
import { toast } from '@/hooks/use-toast';

interface LoanRequestProps {
  employee: Employee;
  assets: Asset[];
  selectedAsset?: Asset;
  onSubmit: (loan: Omit<Loan, 'id'>) => void;
}

const LoanRequest = ({ employee, assets, selectedAsset, onSubmit }: LoanRequestProps) => {
  const navigate = useNavigate();
  const [assetId, setAssetId] = useState(selectedAsset?.id || '');
  const [purpose, setPurpose] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const availableAssets = assets.filter(a => a.status === 'Tersedia');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!assetId || !purpose || !startDate || !endDate) {
      toast({
        title: 'Error',
        description: 'Semua field harus diisi',
        variant: 'destructive',
      });
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      toast({
        title: 'Error',
        description: 'Tanggal selesai harus lebih besar dari tanggal mulai',
        variant: 'destructive',
      });
      return;
    }

    const selectedAssetData = assets.find(a => a.id === assetId);
    if (!selectedAssetData) return;

    const loan: Omit<Loan, 'id'> = {
      employeeName: employee.name,
      employeeNip: employee.nip,
      assetName: selectedAssetData.name,
      assetCode: selectedAssetData.code,
      purpose,
      startDate,
      endDate,
      status: 'Menunggu Persetujuan',
      requestDate: new Date().toISOString().split('T')[0],
    };

    onSubmit(loan);

    toast({
      title: 'Berhasil',
      description: 'Pengajuan peminjaman berhasil diajukan',
    });

    navigate('/my-loans');
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <Button variant="ghost" onClick={() => navigate('/assets')} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali
        </Button>
        <h2 className="text-3xl font-bold text-foreground">Ajukan Peminjaman BMN</h2>
        <p className="text-muted-foreground">Isi formulir untuk mengajukan peminjaman</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Formulir Peminjaman</CardTitle>
          <CardDescription>Semua field wajib diisi</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label>Nama Pegawai</Label>
              <Input value={employee.name} disabled />
            </div>

            <div className="space-y-2">
              <Label>NIP</Label>
              <Input value={employee.nip} disabled />
            </div>

            <div className="space-y-2">
              <Label>Unit Kerja</Label>
              <Input value={employee.sub_unit} disabled />
            </div>

            <div className="space-y-2">
              <Label htmlFor="asset">BMN yang Dipinjam *</Label>
              <Select value={assetId} onValueChange={setAssetId}>
                <SelectTrigger id="asset">
                  <SelectValue placeholder="Pilih BMN" />
                </SelectTrigger>
                <SelectContent>
                  {availableAssets.map((asset) => (
                    <SelectItem key={asset.id} value={asset.id}>
                      {asset.name} ({asset.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="purpose">Tujuan Peminjaman *</Label>
              <Textarea
                id="purpose"
                placeholder="Jelaskan tujuan peminjaman BMN..."
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                rows={4}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="startDate">Tanggal Mulai *</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">Tanggal Selesai *</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate || new Date().toISOString().split('T')[0]}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="flex-1">
                <FileText className="mr-2 h-4 w-4" />
                Ajukan Peminjaman
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/assets')}
              >
                Batal
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoanRequest;