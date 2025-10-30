import { useState } from "react";
import { Header } from "@/components/Header";
import { StatsCard } from "@/components/StatsCard";
import { AssetCard } from "@/components/AssetCard";
import { LoanCard } from "@/components/LoanCard";
import { AssetDetailDialog } from "@/components/AssetDetailDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Package, CheckCircle, Clock, Search, Calendar, Eye } from "lucide-react";
import { Asset, Employee, Loan } from "@/data/sampleData";
import { toast } from "sonner";

interface EmployeeDashboardProps {
  employee: Employee;
  assets: Asset[];
  loans: Loan[];
  onLogout: () => void;
  onSubmitLoan: (loan: Omit<Loan, 'id' | 'status' | 'requestDate'>) => void;
  onCancelLoan: (loanId: string) => void;
}

const EmployeeDashboard = ({ employee, assets, loans, onLogout, onSubmitLoan, onCancelLoan }: EmployeeDashboardProps) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'assets' | 'myLoans' | 'request'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [detailAsset, setDetailAsset] = useState<Asset | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [loanForm, setLoanForm] = useState({
    purpose: '',
    startDate: '',
    endDate: '',
    email: '',
    phone: '',
  });

  const myLoans = loans.filter(loan => loan.employeeNip === employee.nip);
  const visibleAssets = assets.filter(a => a.status !== 'Disembunyikan');
  const availableAssets = visibleAssets.filter(a => a.status === 'Tersedia');
  const filteredAssets = visibleAssets.filter(asset =>
    asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBorrowClick = (asset: Asset) => {
    setSelectedAsset(asset);
    setActiveTab('request');
  };

  const handleSubmitLoan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAsset) return;

    onSubmitLoan({
      employeeName: employee.name,
      employeeNip: employee.nip,
      employeeEmail: loanForm.email || undefined,
      employeePhone: loanForm.phone || undefined,
      assetId: selectedAsset.id,
      assetName: selectedAsset.name,
      assetCode: selectedAsset.code,
      purpose: loanForm.purpose,
      startDate: loanForm.startDate,
      endDate: loanForm.endDate,
    });

    toast.success('Pengajuan peminjaman berhasil dikirim!');
    setLoanForm({ purpose: '', startDate: '', endDate: '', email: '', phone: '' });
    setSelectedAsset(null);
    setActiveTab('myLoans');
  };

  const handleViewDetail = (asset: Asset) => {
    setDetailAsset(asset);
    setIsDetailDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userName={employee.name} userRole="Pegawai" onLogout={onLogout} employee={employee} />
      
      {/* Navigation Tabs */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4">
          <nav className="flex gap-6 overflow-x-auto">
            {[
              { id: 'dashboard', label: 'Dashboard' },
              { id: 'assets', label: 'Daftar BMN' },
              { id: 'myLoans', label: 'Peminjaman Saya' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Selamat Datang, {employee.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard title="Total BMN" value={visibleAssets.length} icon={Package} colorClass="bg-primary/10 text-primary" />
                <StatsCard title="Tersedia" value={availableAssets.length} icon={CheckCircle} colorClass="bg-success-light text-success" />
                <StatsCard title="Dipinjam Saya" value={myLoans.filter(l => l.status === 'Disetujui').length} icon={Package} colorClass="bg-warning-light text-warning" />
                <StatsCard title="Menunggu" value={myLoans.filter(l => l.status === 'Menunggu Persetujuan').length} icon={Clock} colorClass="bg-pending-light text-pending" />
              </div>
            </div>

            {myLoans.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Peminjaman Terbaru</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {myLoans.slice(0, 3).map((loan) => {
                    const loanAsset = assets.find(a => a.id === loan.assetId);
                    return (
                      <LoanCard key={loan.id} loan={loan} asset={loanAsset} />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'assets' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Daftar Barang Milik Negara</h2>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari BMN..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAssets.map((asset) => (
                <AssetCard
                  key={asset.id}
                  asset={asset}
                  showBorrowButton={true}
                  onBorrow={handleBorrowClick}
                  onViewDetail={handleViewDetail}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'myLoans' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Peminjaman Saya</h2>
            {myLoans.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg text-muted-foreground">Belum ada peminjaman</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myLoans.map((loan) => {
                  const loanAsset = assets.find(a => a.id === loan.assetId);
                  return (
                    <LoanCard 
                      key={loan.id} 
                      loan={loan}
                      asset={loanAsset}
                      onCancel={loan.status === 'Menunggu Persetujuan' ? onCancelLoan : undefined}
                    />
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'request' && selectedAsset && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
              <h2 className="text-2xl font-bold text-foreground mb-6">Ajukan Peminjaman</h2>
              
              <div className="mb-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium text-foreground mb-2">BMN yang Dipilih:</p>
                <p className="text-lg font-semibold text-foreground">{selectedAsset.name}</p>
                <p className="text-sm text-muted-foreground">Kode: {selectedAsset.code}</p>
              </div>

              <form onSubmit={handleSubmitLoan} className="space-y-6">
                <div>
                  <Label htmlFor="employee">Nama Pegawai</Label>
                  <Input id="employee" value={employee.name} disabled />
                </div>

                <div>
                  <Label htmlFor="nip">NIP</Label>
                  <Input id="nip" value={employee.nip} disabled />
                </div>

                <div>
                  <Label htmlFor="purpose">Tujuan Peminjaman *</Label>
                  <Textarea
                    id="purpose"
                    placeholder="Jelaskan tujuan peminjaman..."
                    value={loanForm.purpose}
                    onChange={(e) => setLoanForm({ ...loanForm, purpose: e.target.value })}
                    required
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email (Optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      value={loanForm.email}
                      onChange={(e) => setLoanForm({ ...loanForm, email: e.target.value })}
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Nomor HP (Optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={loanForm.phone}
                      onChange={(e) => setLoanForm({ ...loanForm, phone: e.target.value })}
                      placeholder="08123456789"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Tanggal Mulai *</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="startDate"
                        type="date"
                        value={loanForm.startDate}
                        onChange={(e) => setLoanForm({ ...loanForm, startDate: e.target.value })}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className="pl-9"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="endDate">Tanggal Selesai *</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="endDate"
                        type="date"
                        value={loanForm.endDate}
                        onChange={(e) => setLoanForm({ ...loanForm, endDate: e.target.value })}
                        required
                        min={loanForm.startDate || new Date().toISOString().split('T')[0]}
                        className="pl-9"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="flex-1">
                    Ajukan Peminjaman
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setSelectedAsset(null);
                      setActiveTab('assets');
                    }}
                  >
                    Batal
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Asset Detail Dialog */}
      <AssetDetailDialog
        asset={detailAsset}
        open={isDetailDialogOpen}
        onOpenChange={setIsDetailDialogOpen}
      />
    </div>
  );
};

export default EmployeeDashboard;
