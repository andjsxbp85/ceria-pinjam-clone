import { Employee, Asset, Loan } from '@/types';

export const employees: Employee[] = [
  {
    nip: '198301399332010',
    name: 'Purwanto',
    unit: 'Badan Pengembangan SDM Komdig',
    sub_unit: 'Pusat Pengembangan Talenta Digital',
    position: 'Penasihat Kebijakan',
    email: 'purwanto01@komdig.go.id'
  },
  {
    nip: '198212155790',
    name: 'Yayat Suryatna',
    unit: 'Badan Pengembangan SDM Komdig',
    sub_unit: 'Pusat Pengembangan Talenta Digital',
    position: 'Penelaah Teknis Kebijakan',
    email: 'yayat015@komdig.go.id'
  },
  {
    nip: '199002071930',
    name: 'Yono Prima Mardiyak',
    unit: 'Badan Pengembangan SDM Komdig',
    sub_unit: 'Pusat Pengembangan Talenta Digital',
    position: 'Analis Kebijakan Ahli Madya',
    email: 'yono072@komdig.go.id'
  },
  {
    nip: '198814494545',
    name: 'Muhtarom',
    unit: 'Badan Pengembangan SDM Komdig',
    sub_unit: 'Pusat Pengembangan Talenta Digital',
    position: 'Penelaah Teknis Kebijakan',
    email: 'muht001@komdig.go.id'
  }
];

export const initialAssets: Asset[] = [
  {
    id: 'A001',
    code: 'IT-LAP-001',
    name: 'Laptop Dell Latitude 5420',
    category: 'Elektronik',
    condition: 'Baik',
    status: 'Tersedia',
    location: 'Ruang IT',
    description: 'Laptop untuk pekerjaan sehari-hari'
  },
  {
    id: 'A002',
    code: 'ADM-PRT-002',
    name: 'Printer HP LaserJet Pro',
    category: 'Elektronik',
    condition: 'Baik',
    status: 'Tersedia',
    location: 'Ruang Admin',
    description: 'Printer untuk dokumen kantor'
  },
  {
    id: 'A003',
    code: 'RPT-PRJ-003',
    name: 'Proyektor Epson EB-X41',
    category: 'Elektronik',
    condition: 'Baik',
    status: 'Dipinjam',
    location: 'Ruang Rapat',
    description: 'Proyektor untuk presentasi'
  },
  {
    id: 'A004',
    code: 'STF-MJ-004',
    name: 'Meja Kerja Kayu Jati',
    category: 'Furniture',
    condition: 'Baik',
    status: 'Tersedia',
    location: 'Ruang Staff',
    description: 'Meja kerja standar'
  },
  {
    id: 'A005',
    code: 'STF-KR-005',
    name: 'Kursi Kantor Ergonomis',
    category: 'Furniture',
    condition: 'Baik',
    status: 'Tersedia',
    location: 'Ruang Staff',
    description: 'Kursi dengan penyangga lumbar'
  },
  {
    id: 'A006',
    code: 'KPL-AC-006',
    name: 'AC Split Daikin 1.5 PK',
    category: 'Elektronik',
    condition: 'Baik',
    status: 'Tersedia',
    location: 'Ruang Kepala',
    description: 'AC untuk ruangan'
  },
  {
    id: 'A007',
    code: 'DOK-CAM-007',
    name: 'Kamera DSLR Canon EOS 80D',
    category: 'Elektronik',
    condition: 'Baik',
    status: 'Tersedia',
    location: 'Ruang Dokumentasi',
    description: 'Kamera untuk dokumentasi kegiatan'
  },
  {
    id: 'A008',
    code: 'ARS-SCN-008',
    name: 'Scanner Fujitsu ScanSnap',
    category: 'Elektronik',
    condition: 'Baik',
    status: 'Dipinjam',
    location: 'Ruang Arsip',
    description: 'Scanner dokumen berkecepatan tinggi'
  }
];

export const initialLoans: Loan[] = [
  {
    id: 'L001',
    employeeName: 'Yayat Suryatna',
    employeeNip: '198212155790',
    assetName: 'Proyektor Epson EB-X41',
    assetCode: 'RPT-PRJ-003',
    purpose: 'Presentasi Training Digital Talent',
    startDate: '2025-10-25',
    endDate: '2025-10-30',
    status: 'Disetujui',
    requestDate: '2025-10-24',
    approvedBy: 'Admin BMN',
    approvedDate: '2025-10-24'
  },
  {
    id: 'L002',
    employeeName: 'Yono Prima Mardiyak',
    employeeNip: '199002071930',
    assetName: 'Scanner Fujitsu ScanSnap',
    assetCode: 'ARS-SCN-008',
    purpose: 'Digitalisasi dokumen arsip lama',
    startDate: '2025-10-28',
    endDate: '2025-11-05',
    status: 'Menunggu Persetujuan',
    requestDate: '2025-10-27'
  }
];