export type UserRole = 'employee' | 'admin';

export type AssetStatus = 'Tersedia' | 'Dipinjam' | 'Maintenance';

export type LoanStatus = 'Menunggu Persetujuan' | 'Disetujui' | 'Ditolak' | 'Dikembalikan';

export interface Employee {
  nip: string;
  name: string;
  unit: string;
  sub_unit: string;
  position: string;
  email: string;
}

export interface Asset {
  id: string;
  code: string;
  name: string;
  category: string;
  condition: string;
  status: AssetStatus;
  location: string;
  description: string;
}

export interface Loan {
  id: string;
  employeeName: string;
  employeeNip: string;
  assetName: string;
  assetCode: string;
  purpose: string;
  startDate: string;
  endDate: string;
  status: LoanStatus;
  requestDate: string;
  approvedBy?: string;
  approvedDate?: string;
  returnDate?: string;
}