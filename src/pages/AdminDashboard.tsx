import { Header } from "@/components/Header";
import { StatsCard } from "@/components/StatsCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Package, CheckCircle, Clock, AlertCircle, Calendar, User, FileText, Plus, Search, Trash2, Edit2 } from "lucide-react";
import { Asset, Loan } from "@/data/sampleData";
import { toast } from "sonner";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useState } from "react";
import { AssetCard } from "@/components/AssetCard";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { ReturnAssetDialog } from "@/components/ReturnAssetDialog";
import { LoanHistory } from "./LoanHistory";
import { AddUserDialog } from "@/components/AddUserDialog";
import { EditUserDialog } from "@/components/EditUserDialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { employeesData, EmployeeData } from "@/data/employeesData";
import { adminsData } from "@/components/AddUserDialog";

interface AdminDashboardProps {
  assets: Asset[];
  loans: Loan[];
  onLogout: () => void;
  onApproveLoan: (loanId: string) => void;
  onRejectLoan: (loanId: string) => void;
  onReturnAsset: (loanId: string, returnData?: {
    returnDate: Date;
    condition: string;
    photoFile: File | null;
    notes: string;
    documentFile: File | null;
  }) => void;
  onAddAsset: (asset: Omit<Asset, 'id'>) => void;
  onEditAsset: (asset: Asset) => void;
  onDeleteAsset: (assetId: number) => void;
  onHideAsset: (assetId: number) => void;
}

const AdminDashboard = ({ 
  assets, 
  loans, 
  onLogout, 
  onApproveLoan, 
  onRejectLoan, 
  onReturnAsset,
  onAddAsset,
  onEditAsset,
  onDeleteAsset,
  onHideAsset
}: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'manage' | 'assets' | 'history' | 'users'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [displayedAssetsCount, setDisplayedAssetsCount] = useState(12);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isHideDialogOpen, setIsHideDialogOpen] = useState(false);
  const [isReturnDialogOpen, setIsReturnDialogOpen] = useState(false);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<EmployeeData | { username: string; password: string; name: string } | null>(null);
  const [editingUserType, setEditingUserType] = useState<'employee' | 'admin'>('employee');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    category: '',
    condition: 'Baik',
    status: 'Tersedia' as Asset['status'],
    location: '',
    description: '',
    imageUrls: ['']
  });

  const availableAssets = assets.filter(a => a.status === 'Tersedia');
  const onLoanAssets = assets.filter(a => a.status === 'Dipinjam');
  const pendingLoans = loans.filter(l => l.status === 'Menunggu Persetujuan');
  const activeLoans = loans.filter(l => l.status === 'Disetujui');

  const handleApprove = (loanId: string) => {
    onApproveLoan(loanId);
    toast.success('Peminjaman telah disetujui');
  };

  const handleReject = (loanId: string) => {
    onRejectLoan(loanId);
    toast.success('Peminjaman telah ditolak');
  };

  const handleReturn = (loan: Loan) => {
    setSelectedLoan(loan);
    setIsReturnDialogOpen(true);
  };

  const handleReturnConfirm = (data: {
    returnDate: Date;
    condition: string;
    photoFile: File | null;
    notes: string;
    documentFile: File | null;
  }) => {
    if (selectedLoan) {
      onReturnAsset(selectedLoan.id, data);
      toast.success('Pengembalian BMN telah dicatat');
      setIsReturnDialogOpen(false);
      setSelectedLoan(null);
    }
  };

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         asset.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         asset.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleAddAsset = () => {
    if (!formData.code || !formData.name || !formData.category || !formData.location) {
      toast.error('Mohon lengkapi semua field yang wajib');
      return;
    }
    
    const filteredImageUrls = formData.imageUrls.filter(url => url.trim() !== '');
    onAddAsset({ ...formData, imageUrls: filteredImageUrls.length > 0 ? filteredImageUrls : undefined });
    toast.success('BMN berhasil ditambahkan');
    setIsAddDialogOpen(false);
    setFormData({
      code: '',
      name: '',
      category: '',
      condition: 'Baik',
      status: 'Tersedia',
      location: '',
      description: '',
      imageUrls: ['']
    });
  };

  const handleEditAsset = () => {
    if (!selectedAsset || !formData.code || !formData.name || !formData.category || !formData.location) {
      toast.error('Mohon lengkapi semua field yang wajib');
      return;
    }
    
    onEditAsset({ ...formData, id: selectedAsset.id } as Asset);
    toast.success('BMN berhasil diperbarui');
    setIsEditDialogOpen(false);
    setSelectedAsset(null);
  };

  const handleDeleteAsset = (asset: Asset) => {
    if (confirm(`Apakah Anda yakin ingin menghapus ${asset.name}?`)) {
      onDeleteAsset(asset.id);
      toast.success('BMN berhasil dihapus');
    }
  };

  const handleHideAsset = () => {
    if (selectedAsset) {
      onHideAsset(selectedAsset.id);
      toast.success('BMN berhasil disembunyikan');
      setIsHideDialogOpen(false);
      setSelectedAsset(null);
    }
  };

  const openEditDialog = (asset: Asset) => {
    setSelectedAsset(asset);
    setFormData({
      code: asset.code,
      name: asset.name,
      category: asset.category,
      condition: asset.condition,
      status: asset.status,
      location: asset.location,
      description: asset.description,
      imageUrls: asset.imageUrls && asset.imageUrls.length > 0 ? asset.imageUrls : ['']
    });
    setIsEditDialogOpen(true);
  };

  const openHideDialog = (asset: Asset) => {
    setSelectedAsset(asset);
    setIsHideDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userName="Admin BMN" userRole="Administrator" onLogout={onLogout} employee={null} />
      
      {/* Navigation Tabs */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4">
          <nav className="flex gap-6 overflow-x-auto">
            {[
              { id: 'dashboard', label: 'Dashboard' },
              { id: 'assets', label: 'Daftar BMN' },
              { id: 'manage', label: 'Kelola Peminjaman' },
              { id: 'history', label: 'Riwayat Pengembalian' },
              { id: 'users', label: 'Kelola Pengguna' },
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
              <h2 className="text-2xl font-bold text-foreground mb-6">Dashboard Admin</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard title="Total BMN" value={assets.length} icon={Package} colorClass="bg-primary/10 text-primary" />
                <StatsCard title="Tersedia" value={availableAssets.length} icon={CheckCircle} colorClass="bg-success-light text-success" />
                <StatsCard title="Sedang Dipinjam" value={onLoanAssets.length} icon={Package} colorClass="bg-warning-light text-warning" />
                <StatsCard title="Menunggu Persetujuan" value={pendingLoans.length} icon={Clock} colorClass="bg-pending-light text-pending" />
              </div>
            </div>

            {pendingLoans.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Perlu Persetujuan</h3>
                <div className="space-y-4">
                  {pendingLoans.map((loan) => (
                    <div key={loan.id} className="bg-card rounded-xl p-6 border border-pending/30 shadow-sm">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="text-lg font-semibold text-foreground">{loan.assetName}</h4>
                              <p className="text-sm text-muted-foreground">Kode: {loan.assetCode}</p>
                            </div>
                            <StatusBadge status={loan.status} />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span className="text-foreground">{loan.employeeName}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">
                                {format(new Date(loan.startDate), 'dd MMM', { locale: id })} - {format(new Date(loan.endDate), 'dd MMM yyyy', { locale: id })}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <p className="text-sm text-muted-foreground">{loan.purpose}</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-3">
                          <Button onClick={() => handleApprove(loan.id)} className="flex-1 lg:flex-none">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Setujui
                          </Button>
                          <Button variant="destructive" onClick={() => handleReject(loan.id)} className="flex-1 lg:flex-none">
                            <AlertCircle className="h-4 w-4 mr-2" />
                            Tolak
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'assets' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Daftar BMN</h2>
              <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Cari BMN..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah BMN
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAssets.slice(0, displayedAssetsCount).map((asset) => {
                  const activeLoan = loans.find(
                    loan => loan.assetId === asset.id && loan.status === 'Disetujui'
                  );
                  const pendingLoan = loans.find(
                    loan => loan.assetId === asset.id && loan.status === 'Menunggu Persetujuan'
                  );
                  return (
                    <AssetCard
                      key={asset.id}
                      asset={asset}
                      isAdmin={true}
                      onEdit={openEditDialog}
                      onDelete={handleDeleteAsset}
                      onHide={openHideDialog}
                      borrowerInfo={activeLoan ? { name: activeLoan.employeeName, nip: activeLoan.employeeNip } : undefined}
                      pendingLoanInfo={pendingLoan ? { name: pendingLoan.employeeName, nip: pendingLoan.employeeNip } : undefined}
                    />
                  );
                })}
              </div>

              {filteredAssets.length > displayedAssetsCount && (
                <div className="col-span-full text-center mt-6">
                  <Button 
                    onClick={() => setDisplayedAssetsCount(prev => prev + 12)}
                    variant="outline"
                    size="lg"
                  >
                    Show More
                  </Button>
                </div>
              )}

              {filteredAssets.length === 0 && (
                <div className="text-center py-12 bg-card rounded-xl border border-border col-span-full">
                  <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg text-muted-foreground">Tidak ada BMN ditemukan</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'manage' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Sedang Dipinjam</h2>
              {activeLoans.length === 0 ? (
                <div className="text-center py-12 bg-card rounded-xl border border-border">
                  <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg text-muted-foreground">Tidak ada peminjaman aktif</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeLoans.map((loan) => (
                    <div key={loan.id} className="bg-card rounded-xl p-6 border border-border shadow-sm">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="text-lg font-semibold text-foreground">{loan.assetName}</h4>
                              <p className="text-sm text-muted-foreground">Kode: {loan.assetCode}</p>
                            </div>
                            <StatusBadge status={loan.status} />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span className="text-foreground">{loan.employeeName}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">
                                {format(new Date(loan.startDate), 'dd MMM', { locale: id })} - {format(new Date(loan.endDate), 'dd MMM yyyy', { locale: id })}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <Button onClick={() => handleReturn(loan)}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Catat Pengembalian
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <LoanHistory loans={loans} assets={assets} />
        )}

        {activeTab === 'users' && (
          <div className="space-y-8">
            <div>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Kelola Pengguna</h2>
                <Button onClick={() => setIsAddUserOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Pengguna
                </Button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Daftar Pegawai</h3>
                  <div className="border rounded-lg overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>NIP</TableHead>
                          <TableHead>Nama</TableHead>
                          <TableHead>Unit</TableHead>
                          <TableHead>Sub Unit</TableHead>
                          <TableHead>Jabatan</TableHead>
                          <TableHead>No. HP</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Tanggal Mulai</TableHead>
                          <TableHead className="w-24">Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {employeesData.map((employee) => (
                          <TableRow key={employee.email}>
                            <TableCell className="font-mono text-sm">{employee.nip}</TableCell>
                            <TableCell>{employee.name}</TableCell>
                            <TableCell className="max-w-[150px] truncate">{employee.unit}</TableCell>
                            <TableCell className="max-w-[150px] truncate">{employee.sub_unit}</TableCell>
                            <TableCell>{employee.position}</TableCell>
                            <TableCell>{employee.phone}</TableCell>
                            <TableCell>{employee.email}</TableCell>
                            <TableCell>{employee.startDate}</TableCell>
                            <TableCell>
                              <div className="flex gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setEditingUser(employee);
                                    setEditingUserType('employee');
                                    setIsEditUserOpen(true);
                                  }}
                                >
                                  <Edit2 className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    const index = employeesData.findIndex(emp => emp.email === employee.email);
                                    if (index > -1) {
                                      employeesData.splice(index, 1);
                                      toast.success("Pegawai berhasil dihapus");
                                    }
                                  }}
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Daftar Admin</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Username</TableHead>
                          <TableHead>Nama</TableHead>
                          <TableHead className="w-24">Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {adminsData.map((admin) => (
                          <TableRow key={admin.username}>
                            <TableCell>{admin.username}</TableCell>
                            <TableCell>{admin.name}</TableCell>
                            <TableCell>
                              <div className="flex gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setEditingUser(admin);
                                    setEditingUserType('admin');
                                    setIsEditUserOpen(true);
                                  }}
                                >
                                  <Edit2 className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    const index = adminsData.findIndex(a => a.username === admin.username);
                                    if (index > -1) {
                                      adminsData.splice(index, 1);
                                      toast.success("Admin berhasil dihapus");
                                    }
                                  }}
                                  disabled={admin.username === 'Admin'}
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Asset Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Tambah BMN Baru</DialogTitle>
            <DialogDescription>Lengkapi informasi BMN yang akan ditambahkan</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="code">Kode BMN *</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="IT-LAP-001"
                />
              </div>
              <div>
                <Label htmlFor="name">Nama BMN *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Laptop Dell"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Kategori *</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Elektronik"
                />
              </div>
              <div>
                <Label htmlFor="condition">Kondisi</Label>
                <Select value={formData.condition} onValueChange={(value) => setFormData({ ...formData, condition: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Baik">Baik</SelectItem>
                    <SelectItem value="Cukup">Cukup</SelectItem>
                    <SelectItem value="Buruk">Buruk</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="location">Lokasi *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Ruang IT"
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>URL Gambar (Multiple)</Label>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => setFormData({ ...formData, imageUrls: [...formData.imageUrls, ''] })}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Tambah Gambar
                </Button>
              </div>
              {formData.imageUrls.map((url, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={url}
                    onChange={(e) => {
                      const newUrls = [...formData.imageUrls];
                      newUrls[index] = e.target.value;
                      setFormData({ ...formData, imageUrls: newUrls });
                    }}
                    placeholder={`URL Gambar ${index + 1} ${index === 0 ? '(Thumbnail)' : ''}`}
                  />
                  {formData.imageUrls.length > 1 && (
                    <Button
                      type="button"
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        const newUrls = formData.imageUrls.filter((_, i) => i !== index);
                        setFormData({ ...formData, imageUrls: newUrls });
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <div>
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Deskripsi BMN"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Batal</Button>
            <Button onClick={handleAddAsset}>Tambah BMN</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Asset Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit BMN</DialogTitle>
            <DialogDescription>Perbarui informasi BMN</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-code">Kode BMN *</Label>
                <Input
                  id="edit-code"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-name">Nama BMN *</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-category">Kategori *</Label>
                <Input
                  id="edit-category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-condition">Kondisi</Label>
                <Select value={formData.condition} onValueChange={(value) => setFormData({ ...formData, condition: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Baik">Baik</SelectItem>
                    <SelectItem value="Cukup">Cukup</SelectItem>
                    <SelectItem value="Buruk">Buruk</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="edit-location">Lokasi *</Label>
              <Input
                id="edit-location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value as Asset['status'] })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tersedia">Tersedia</SelectItem>
                  <SelectItem value="Dipinjam">Dipinjam</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                  <SelectItem value="Disembunyikan">Disembunyikan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>URL Gambar (Multiple)</Label>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => setFormData({ ...formData, imageUrls: [...formData.imageUrls, ''] })}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Tambah Gambar
                </Button>
              </div>
              {formData.imageUrls.map((url, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={url}
                    onChange={(e) => {
                      const newUrls = [...formData.imageUrls];
                      newUrls[index] = e.target.value;
                      setFormData({ ...formData, imageUrls: newUrls });
                    }}
                    placeholder={`URL Gambar ${index + 1} ${index === 0 ? '(Thumbnail)' : ''}`}
                  />
                  {formData.imageUrls.length > 1 && (
                    <Button
                      type="button"
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        const newUrls = formData.imageUrls.filter((_, i) => i !== index);
                        setFormData({ ...formData, imageUrls: newUrls });
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <div>
              <Label htmlFor="edit-description">Deskripsi</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Batal</Button>
            <Button onClick={handleEditAsset}>Simpan Perubahan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Hide Asset Confirmation Dialog */}
      <AlertDialog open={isHideDialogOpen} onOpenChange={setIsHideDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sembunyikan BMN?</AlertDialogTitle>
            <AlertDialogDescription>
              BMN "{selectedAsset?.name}" akan disembunyikan dari daftar pegawai. Anda masih dapat melihatnya di daftar admin dan mengubah statusnya kembali.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleHideAsset}>Sembunyikan</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Return Asset Dialog */}
      <ReturnAssetDialog
        open={isReturnDialogOpen}
        onOpenChange={setIsReturnDialogOpen}
        onConfirm={handleReturnConfirm}
        assetName={selectedLoan?.assetName || ''}
      />

      {/* Add User Dialog */}
      <AddUserDialog
        open={isAddUserOpen}
        onOpenChange={setIsAddUserOpen}
      />

      {/* Edit User Dialog */}
      <EditUserDialog
        open={isEditUserOpen}
        onOpenChange={setIsEditUserOpen}
        user={editingUser}
        userType={editingUserType}
      />
    </div>
  );
};

export default AdminDashboard;
