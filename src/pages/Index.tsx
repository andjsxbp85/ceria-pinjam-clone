import { useState, useEffect } from "react";
import Login from "./Login";
import EmployeeDashboard from "./EmployeeDashboard";
import AdminDashboard from "./AdminDashboard";
import { employees, assets as initialAssets, initialLoans, Employee, Asset, Loan } from "@/data/sampleData";

const STORAGE_KEY = 'bmn_session';

const Index = () => {
  const [userRole, setUserRole] = useState<'employee' | 'admin' | null>(null);
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);
  const [assets, setAssets] = useState<Asset[]>(initialAssets);
  const [loans, setLoans] = useState<Loan[]>(initialLoans);

  // Load session from localStorage on mount
  useEffect(() => {
    const savedSession = localStorage.getItem(STORAGE_KEY);
    if (savedSession) {
      try {
        const session = JSON.parse(savedSession);
        setUserRole(session.userRole);
        setCurrentEmployee(session.currentEmployee);
      } catch (error) {
        console.error('Failed to restore session:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const handleLogin = (role: 'employee' | 'admin', employee?: Employee) => {
    setUserRole(role);
    if (employee) {
      setCurrentEmployee(employee);
    }
    
    // Save session to localStorage
    const session = {
      userRole: role,
      currentEmployee: employee || null
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentEmployee(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleSubmitLoan = (loanData: Omit<Loan, 'id' | 'status' | 'requestDate'>) => {
    const newLoan: Loan = {
      ...loanData,
      id: `L${String(loans.length + 1).padStart(3, '0')}`,
      status: 'Menunggu Persetujuan',
      requestDate: new Date().toISOString().split('T')[0],
    };
    setLoans([...loans, newLoan]);
  };

  const handleCancelLoan = (loanId: string) => {
    setLoans(loans.map(loan =>
      loan.id === loanId
        ? { ...loan, status: 'Dibatalkan' as const }
        : loan
    ));
  };

  const handleApproveLoan = (loanId: string) => {
    setLoans(loans.map(loan => {
      if (loan.id === loanId) {
        // Update asset status to borrowed using asset ID
        setAssets(assets.map(asset =>
          asset.id === loan.assetId
            ? { ...asset, status: 'Dipinjam' as const }
            : asset
        ));
        
        return {
          ...loan,
          status: 'Disetujui' as const,
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
        ? { ...loan, status: 'Ditolak' as const }
        : loan
    ));
  };

  const handleReturnAsset = (loanId: string, returnData?: {
    returnDate: Date;
    condition: string;
    photoFile: File | null;
    notes: string;
    documentFile: File | null;
  }) => {
    setLoans(loans.map(loan => {
      if (loan.id === loanId) {
        // Update asset status back to available using asset ID
        setAssets(assets.map(asset =>
          asset.id === loan.assetId
            ? { ...asset, status: 'Tersedia' as const }
            : asset
        ));
        
        return {
          ...loan,
          status: 'Dikembalikan' as const,
          returnedDate: returnData?.returnDate.toISOString().split('T')[0] || new Date().toISOString().split('T')[0],
          returnCondition: returnData?.condition,
          returnPhotoUrl: returnData?.photoFile ? URL.createObjectURL(returnData.photoFile) : undefined,
          returnNotes: returnData?.notes,
          returnDocumentUrl: returnData?.documentFile ? URL.createObjectURL(returnData.documentFile) : undefined,
        };
      }
      return loan;
    }));
  };

  const handleAddAsset = (assetData: Omit<Asset, 'id'>) => {
    const maxId = assets.length > 0 ? Math.max(...assets.map(a => a.id)) : 0;
    const newAsset: Asset = {
      ...assetData,
      id: maxId + 1,
    };
    setAssets([...assets, newAsset]);
  };

  const handleEditAsset = (updatedAsset: Asset) => {
    setAssets(assets.map(asset => 
      asset.id === updatedAsset.id ? updatedAsset : asset
    ));
  };

  const handleDeleteAsset = (assetId: number) => {
    setAssets(assets.filter(asset => asset.id !== assetId));
  };

  const handleHideAsset = (assetId: number) => {
    setAssets(assets.map(asset =>
      asset.id === assetId
        ? { ...asset, status: 'Disembunyikan' as const }
        : asset
    ));
  };

  if (!userRole) {
    return <Login onLogin={handleLogin} employees={employees} />;
  }

  if (userRole === 'employee' && currentEmployee) {
    return (
      <EmployeeDashboard
        employee={currentEmployee}
        assets={assets}
        loans={loans}
        onLogout={handleLogout}
        onSubmitLoan={handleSubmitLoan}
        onCancelLoan={handleCancelLoan}
      />
    );
  }

  if (userRole === 'admin') {
    return (
      <AdminDashboard
        assets={assets}
        loans={loans}
        onLogout={handleLogout}
        onApproveLoan={handleApproveLoan}
        onRejectLoan={handleRejectLoan}
        onReturnAsset={handleReturnAsset}
        onAddAsset={handleAddAsset}
        onEditAsset={handleEditAsset}
        onDeleteAsset={handleDeleteAsset}
        onHideAsset={handleHideAsset}
      />
    );
  }

  return null;
};

export default Index;
