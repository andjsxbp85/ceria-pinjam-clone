import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import EmployeeDashboard from './EmployeeDashboard';
import AdminDashboard from './AdminDashboard';
import AssetCatalog from './AssetCatalog';
import LoanRequest from './LoanRequest';
import MyLoans from './MyLoans';
import LoanManagement from './LoanManagement';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { UserRole, Asset, Loan, Employee } from '@/types';
import { employees, initialAssets, initialLoans } from '@/data/mockData';

type Page = 'dashboard' | 'assets' | 'loan-request' | 'my-loans' | 'loan-management';

const Index = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [assets, setAssets] = useState<Asset[]>(initialAssets);
  const [loans, setLoans] = useState<Loan[]>(initialLoans);
  const [selectedAsset, setSelectedAsset] = useState<Asset | undefined>();

  // For demo, use first employee
  const currentEmployee = employees[0];

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentPage('dashboard');
  };

  const handleBorrowAsset = (asset: Asset) => {
    setSelectedAsset(asset);
    setCurrentPage('loan-request');
  };

  const handleSubmitLoan = (loan: Omit<Loan, 'id'>) => {
    const newLoan: Loan = {
      ...loan,
      id: `L${(loans.length + 1).toString().padStart(3, '0')}`,
    };
    setLoans([...loans, newLoan]);
  };

  const handleApproveLoan = (loanId: string) => {
    setLoans(loans.map(loan => {
      if (loan.id === loanId) {
        // Update asset status
        setAssets(assets.map(asset =>
          asset.code === loan.assetCode
            ? { ...asset, status: 'Dipinjam' }
            : asset
        ));

        return {
          ...loan,
          status: 'Disetujui',
          approvedBy: 'Admin BMN',
          approvedDate: new Date().toISOString().split('T')[0],
        };
      }
      return loan;
    }));
  };

  const handleRejectLoan = (loanId: string) => {
    setLoans(loans.map(loan =>
      loan.id === loanId
        ? { ...loan, status: 'Ditolak' }
        : loan
    ));
  };

  const handleRecordReturn = (loanId: string) => {
    setLoans(loans.map(loan => {
      if (loan.id === loanId) {
        // Update asset status
        setAssets(assets.map(asset =>
          asset.code === loan.assetCode
            ? { ...asset, status: 'Tersedia' }
            : asset
        ));

        return {
          ...loan,
          status: 'Dikembalikan',
          returnDate: new Date().toISOString().split('T')[0],
        };
      }
      return loan;
    }));
  };

  if (!userRole) {
    return <Login onLogin={handleLogin} />;
  }

  const getPageContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return userRole === 'employee' ? (
          <EmployeeDashboard
            assets={assets}
            loans={loans}
            currentEmployee={currentEmployee.name}
          />
        ) : (
          <AdminDashboard assets={assets} loans={loans} />
        );
      case 'assets':
        return (
          <AssetCatalog
            assets={assets}
            onBorrow={userRole === 'employee' ? handleBorrowAsset : undefined}
            showBorrowButton={userRole === 'employee'}
          />
        );
      case 'loan-request':
        return (
          <LoanRequest
            employee={currentEmployee}
            assets={assets}
            selectedAsset={selectedAsset}
            onSubmit={handleSubmitLoan}
          />
        );
      case 'my-loans':
        return <MyLoans loans={loans} currentEmployee={currentEmployee.name} />;
      case 'loan-management':
        return (
          <LoanManagement
            loans={loans}
            assets={assets}
            onApproveLoan={handleApproveLoan}
            onRejectLoan={handleRejectLoan}
            onRecordReturn={handleRecordReturn}
          />
        );
      default:
        return null;
    }
  };

  const getNavItems = () => {
    if (userRole === 'employee') {
      return [
        { id: 'dashboard' as Page, label: 'Dashboard' },
        { id: 'assets' as Page, label: 'Daftar BMN' },
        { id: 'my-loans' as Page, label: 'Peminjaman Saya' },
      ];
    } else {
      return [
        { id: 'dashboard' as Page, label: 'Dashboard' },
        { id: 'assets' as Page, label: 'Daftar BMN' },
        { id: 'loan-management' as Page, label: 'Kelola Peminjaman' },
      ];
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        userRole={userRole}
        userName={currentEmployee.name}
        onLogout={handleLogout}
      />

      <div className="border-b bg-background/95 backdrop-blur">
        <div className="container">
          <nav className="flex gap-2 overflow-x-auto py-2">
            {getNavItems().map((item) => (
              <Button
                key={item.id}
                variant={currentPage === item.id ? 'default' : 'ghost'}
                onClick={() => setCurrentPage(item.id)}
                className="whitespace-nowrap"
              >
                {item.label}
              </Button>
            ))}
          </nav>
        </div>
      </div>

      <main className="container py-6">
        {getPageContent()}
      </main>

      <footer className="border-t bg-muted/30 mt-12">
        <div className="container py-6 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Badan Pengembangan SDM Komdig</p>
          <p className="mt-1">Sistem Peminjaman BMN - Pusat Pengembangan Talenta Digital</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;