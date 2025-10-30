import { employeesData } from './employeesData';
import asusLaptopImg from '@/assets/asus-laptop-mockup.jpg';
import lenovoLaptopImg from '@/assets/lenovo-laptop-mockup.jpg';

export interface Employee {
  nip: string;
  name: string;
  unit: string;
  sub_unit: string;
  position: string;
  email: string;
}

export interface Asset {
  id: number;
  code: string;
  name: string;
  category: string;
  condition: string;
  status: 'Tersedia' | 'Dipinjam' | 'Maintenance' | 'Disembunyikan';
  location: string;
  description: string;
  imageUrls?: string[];
}

export interface Loan {
  id: string;
  employeeName: string;
  employeeNip: string;
  employeeEmail?: string;
  employeePhone?: string;
  assetId: number;
  assetName: string;
  assetCode: string;
  purpose: string;
  startDate: string;
  endDate: string;
  status: 'Menunggu Persetujuan' | 'Disetujui' | 'Ditolak' | 'Dikembalikan' | 'Dibatalkan';
  requestDate: string;
  approvedBy?: string;
  approvedDate?: string;
  returnedDate?: string;
  returnCondition?: string;
  returnPhotoUrl?: string;
  returnNotes?: string;
  returnDocumentUrl?: string;
}

export const employees: Employee[] = employeesData.map(emp => ({
  nip: emp.nip,
  name: emp.name,
  unit: emp.unit,
  sub_unit: emp.sub_unit,
  position: emp.position,
  email: emp.email
}));

export const assets: Asset[] = [
  // Data dari Excel - Laptop & Notebook
  { id: 1, code: '3100102001-54', name: 'Asus All in One v241fft', category: 'MESIN PERALATAN KHUSUS TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'P.C Unit', imageUrls: [asusLaptopImg] },
  { id: 2, code: '3100102001-55', name: 'Asus All in One v241fft', category: 'MESIN PERALATAN KHUSUS TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'P.C Unit', imageUrls: [asusLaptopImg] },
  { id: 3, code: '3100102002-4', name: 'HP Envy X2 11-G015T', category: 'MESIN PERALATAN KHUSUS TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Lap Top' },
  { id: 4, code: '3100102003-6', name: 'LENOVO IdeaPad YOGA 510-3AID-Black', category: 'MESIN PERALATAN KHUSUS TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Note Book', imageUrls: [lenovoLaptopImg] },
  { id: 5, code: '3100102003-16', name: 'HP Pavilion 13-an0012TU Notebook Silver', category: 'MESIN PERALATAN KHUSUS TIK', condition: 'Baik', status: 'Dipinjam', location: 'Intra', description: 'Note Book - Pengguna: RUDY, SE' },
  { id: 6, code: '3100102003-17', name: 'HP Pavilion 13-an0012TU Notebook Silver', category: 'MESIN PERALATAN KHUSUS TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Note Book' },
  { id: 7, code: '3100102003-18', name: 'HP Pavilion 13-an0012TU Notebook Silver', category: 'MESIN PERALATAN KHUSUS TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Note Book' },
  { id: 8, code: '3100102003-19', name: 'HP Pavilion 13-an0012TU Notebook Silver', category: 'MESIN PERALATAN KHUSUS TIK', condition: 'Baik', status: 'Dipinjam', location: 'Intra', description: 'Note Book - Pengguna: Ali Musthafa KD' },
  { id: 9, code: '3100102003-20', name: 'HP Envy 13-aq1016TX', category: 'MESIN PERALATAN KHUSUS TIK', condition: 'Baik', status: 'Dipinjam', location: 'Intra', description: 'Note Book - Pengguna: RUDY, SE' },
  { id: 10, code: '3100102003-22', name: 'Dynabook Tecra A40-G', category: 'MESIN PERALATAN KHUSUS TIK', condition: 'Baik', status: 'Dipinjam', location: 'Intra', description: 'Note Book - Pengguna: Arif Suryanto Putro, S.T' },
  { id: 11, code: '3100102003-23', name: 'Dynabook Tecra A40-G', category: 'MESIN PERALATAN KHUSUS TIK', condition: 'Baik', status: 'Dipinjam', location: 'Intra', description: 'Note Book - Pengguna: FAIQ WILDANA' },
  { id: 12, code: '3100102003-24', name: 'Dynabook Tecra A40-G', category: 'MESIN PERALATAN KHUSUS TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Note Book' },
  { id: 13, code: '3100102003-25', name: 'Dynabook Tecra A40-G', category: 'MESIN PERALATAN KHUSUS TIK', condition: 'Baik', status: 'Dipinjam', location: 'Intra', description: 'Note Book - Pengguna: IKHSANUL ARIPIN' },
  { id: 14, code: '3100102003-26', name: 'Dynabook Tecra A40-G', category: 'MESIN PERALATAN KHUSUS TIK', condition: 'Baik', status: 'Dipinjam', location: 'Intra', description: 'Note Book - Pengguna: SRI MUHAMMAD NURUL SALMAN A' },
  { id: 15, code: '3100102003-27', name: 'Dynabook Tecra A40-G', category: 'MESIN PERALATAN KHUSUS TIK', condition: 'Baik', status: 'Dipinjam', location: 'Intra', description: 'Note Book - Pengguna: MULTYVANO RIZAL, S.Kom' },
  { id: 16, code: '3100102003-28', name: 'Dynabook Tecra A40-G', category: 'MESIN PERALATAN KHUSUS TIK', condition: 'Baik', status: 'Dipinjam', location: 'Intra', description: 'Note Book - Pengguna: FITRI ADRIANI' },
  { id: 17, code: '3100102003-29', name: 'Dynabook Tecra A40-G', category: 'MESIN PERALATAN KHUSUS TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Note Book' },
  { id: 18, code: '3100102003-30', name: 'Dynabook Tecra A40-G', category: 'MESIN PERALATAN KHUSUS TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Note Book' },
  { id: 19, code: '3100102003-31', name: 'Dynabook Tecra A40-G', category: 'MESIN PERALATAN KHUSUS TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Note Book' },
  { id: 20, code: '3100102003-32', name: 'Dynabook Tecra A40-G', category: 'MESIN PERALATAN KHUSUS TIK', condition: 'Baik', status: 'Dipinjam', location: 'Intra', description: 'Note Book - Pengguna: Diah Arum Maharani S.E' },
  { id: 21, code: '3100102003-33', name: 'Dynabook Tecra A40-G', category: 'MESIN PERALATAN KHUSUS TIK', condition: 'Baik', status: 'Dipinjam', location: 'Intra', description: 'Note Book - Pengguna: MAHARLESA PUTRI, S.Si' },
  { id: 22, code: '3100102003-34', name: 'Dynabook Tecra A40-G', category: 'MESIN PERALATAN KHUSUS TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Note Book' },
  { id: 23, code: '3100102003-35', name: 'Dynabook Tecra A40-G', category: 'MESIN PERALATAN KHUSUS TIK', condition: 'Baik', status: 'Dipinjam', location: 'Intra', description: 'Note Book - Pengguna: DIAN ARTARINI, A.Md' },
  { id: 24, code: '3100102003-36', name: 'Dynabook Tecra A40-G', category: 'MESIN PERALATAN KHUSUS TIK', condition: 'Baik', status: 'Dipinjam', location: 'Intra', description: 'Note Book - Pengguna: FAJAR RULHUDANA, S.I.Kom.' },
  { id: 25, code: '3100102003-37', name: 'Dynabook Tecra A40-G', category: 'MESIN PERALATAN KHUSUS TIK', condition: 'Baik', status: 'Dipinjam', location: 'Intra', description: 'Note Book - Pengguna: RUSHARTANTO' },
  { id: 26, code: '3100102003-38', name: 'Dynabook Tecra A40-G', category: 'MESIN PERALATAN KHUSUS TIK', condition: 'Baik', status: 'Dipinjam', location: 'Intra', description: 'Note Book - Pengguna: STEPHANI DWI ANGELINE' },
  { id: 27, code: '3100102003-39', name: 'Dynabook Tecra A40-G', category: 'MESIN PERALATAN KHUSUS TIK', condition: 'Baik', status: 'Dipinjam', location: 'Intra', description: 'Note Book - Pengguna: KARI SEPTIANA DEWI' },
  { id: 28, code: '3100102003-40', name: 'ASUS VivoBook A413EP', category: 'MESIN PERALATAN KHUSUS TIK', condition: 'Baik', status: 'Dipinjam', location: 'Intra', description: 'Note Book - Pengguna: YANNY LIA, A.Md.', imageUrls: [asusLaptopImg] },
  { id: 29, code: '3100102003-41', name: 'Lenovo', category: 'MESIN PERALATAN KHUSUS TIK', condition: 'Baik', status: 'Dipinjam', location: 'Intra', description: 'Note Book - Pengguna: Anny Triana', imageUrls: [lenovoLaptopImg] },
  { id: 30, code: '3100102003-42', name: 'Lenovo', category: 'MESIN PERALATAN KHUSUS TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Note Book', imageUrls: [lenovoLaptopImg] },
  { id: 31, code: '3100102003-43', name: 'HP Pavilion 14 dv0068TX', category: 'MESIN PERALATAN KHUSUS TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Note Book' },
  { id: 32, code: '3100102003-44', name: 'HP 240 G8 (365K5PA)', category: 'MESIN PERALATAN KHUSUS TIK', condition: 'Baik', status: 'Dipinjam', location: 'Intra', description: 'Note Book - Pengguna: ARMAN TONY ARITONANG.' },
  { id: 33, code: '3100102003-45', name: 'HP 240 G8 (365K5PA)', category: 'MESIN PERALATAN KHUSUS TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Note Book' },
  { id: 34, code: '3100102003-46', name: 'HP 240 G8 (365K5PA)', category: 'MESIN PERALATAN KHUSUS TIK', condition: 'Baik', status: 'Dipinjam', location: 'Intra', description: 'Note Book - Pengguna: REYHAN' },
  { id: 35, code: '3100102003-47', name: 'HP 240 G8 (365K5PA)', category: 'MESIN PERALATAN KHUSUS TIK', condition: 'Baik', status: 'Dipinjam', location: 'Intra', description: 'Note Book - Pengguna: RUSMAWATI HARTONO' },
  { id: 36, code: '3100102003-48', name: 'HP 240 G8 (365K5PA)', category: 'MESIN PERALATAN KHUSUS TIK', condition: 'Baik', status: 'Dipinjam', location: 'Intra', description: 'Note Book - Pengguna: ISNAINI CHOIRUNISA' },
  { id: 37, code: '3100102003-49', name: 'Acer Travelmate P214 Core-i7', category: 'MESIN PERALATAN KHUSUS TIK', condition: 'Baik', status: 'Dipinjam', location: 'Intra', description: 'Note Book - Pengguna: KHARISMA' },
  { id: 38, code: '3100102003-50', name: 'Lenovo Slim 7', category: 'MESIN PERALATAN KHUSUS TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Note Book', imageUrls: [lenovoLaptopImg] },
  { id: 39, code: '3100102003-51', name: 'Lenovo Slim 7', category: 'MESIN PERALATAN KHUSUS TIK', condition: 'Baik', status: 'Dipinjam', location: 'Intra', description: 'Note Book - Pengguna: Badar Agung Nugroho', imageUrls: [lenovoLaptopImg] },
  { id: 40, code: '3100102003-52', name: 'Lenovo Slim 7', category: 'MESIN PERALATAN KHUSUS TIK', condition: 'Baik', status: 'Dipinjam', location: 'Intra', description: 'Note Book - Pengguna: ZUFRIAL ARISTAMA, S.I.P', imageUrls: [lenovoLaptopImg] },
  { id: 41, code: '3100102003-53', name: 'Acer Travelmate P214', category: 'MESIN PERALATAN KHUSUS TIK', condition: 'Baik', status: 'Dipinjam', location: 'Intra', description: 'Note Book - Pengguna: Ika Deasy Aryani S.Psi' },
  { id: 42, code: '3100102003-54', name: 'Lenovo Yoga slim 7', category: 'MESIN PERALATAN KHUSUS TIK', condition: 'Baik', status: 'Dipinjam', location: 'Intra', description: 'Note Book - Pengguna: CARMIN', imageUrls: [lenovoLaptopImg] },
  { id: 43, code: '3100102003-55', name: 'Lenovo Yoga slim 7', category: 'MESIN PERALATAN KHUSUS TIK', condition: 'Baik', status: 'Dipinjam', location: 'Intra', description: 'Note Book - Pengguna: ASTRIESA ADRIANA', imageUrls: [lenovoLaptopImg] },
  { id: 44, code: '3100102003-56', name: 'acer TMP214', category: 'MESIN PERALATAN KHUSUS TIK', condition: 'Baik', status: 'Dipinjam', location: 'Intra', description: 'Note Book - Pengguna: ACHMAD YANSYURU, S.Sos.' },
  { id: 45, code: '3100102003-57', name: 'Lenovo Yoga 7 2in1 Oxid Ultra 7 155H', category: 'MESIN PERALATAN KHUSUS TIK', condition: 'Baik', status: 'Dipinjam', location: 'Intra', description: 'Note Book - Pengguna: Eyla Alivia Maranny', imageUrls: [lenovoLaptopImg] },
  { id: 46, code: '3100102009-1', name: 'Samsung Galaxy S9 FE + Wifi', category: 'MESIN PERALATAN KHUSUS TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Tablet PC' },
  { id: 47, code: '3100102009-2', name: 'Samsung galaxy tab s9 FE +5G', category: 'MESIN PERALATAN KHUSUS TIK', condition: 'Baik', status: 'Dipinjam', location: 'Intra', description: 'Tablet PC - Pengguna: Eyla Alivia Maranny' },
  { id: 48, code: '3100102009-3', name: 'Samsung', category: 'MESIN PERALATAN KHUSUS TIK', condition: 'Baik', status: 'Dipinjam', location: 'Intra', description: 'Tablet PC - Pengguna: Mirza' },
  { id: 49, code: '3100102999-4', name: 'Apple Ipad Mini + Apple Pencil Gen 2', category: 'MESIN PERALATAN KHUSUS TIK', condition: 'Baik', status: 'Dipinjam', location: 'Intra', description: 'Personal Komputer Lainnya - Pengguna: ZUFRIAL ARISTAMA, S.I.P' },
  
  // Data dari Excel - Master Aset (Non-TIK)
  { id: 50, code: '3020201004-1', name: 'Flatbed KW0500047', category: 'MESIN PERALATAN NON TIK', condition: 'Baik', status: 'Tersedia', location: 'Ekstra', description: 'Lori Dorong uk 73x47x13,5 cm' },
  { id: 51, code: '3050102007-1', name: 'Kozure MC-101', category: 'MESIN PERALATAN NON TIK', condition: 'Baik', status: 'Tersedia', location: 'Ekstra', description: 'Mesin Penghitung Uang' },
  { id: 52, code: '3050104002-5', name: 'Lemari Full High Type B', category: 'MESIN PERALATAN NON TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Lemari Kayu' },
  { id: 53, code: '3050104002-6', name: 'Lemari Full High Type B', category: 'MESIN PERALATAN NON TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Lemari Kayu' },
  { id: 54, code: '3050104002-7', name: 'Lemari Full High Type B', category: 'MESIN PERALATAN NON TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Lemari Kayu' },
  { id: 55, code: '3050104002-8', name: 'Lemari Full High Type B', category: 'MESIN PERALATAN NON TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Lemari Kayu' },
  { id: 56, code: '3050104002-9', name: 'Lemari Full High Type B', category: 'MESIN PERALATAN NON TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Lemari Kayu' },
  { id: 57, code: '3050104002-10', name: 'Homedoki', category: 'MESIN PERALATAN NON TIK', condition: 'Baik', status: 'Tersedia', location: 'Ekstra', description: 'Lemari Kayu' },
  { id: 58, code: '3050104002-11', name: 'Homedoki', category: 'MESIN PERALATAN NON TIK', condition: 'Baik', status: 'Tersedia', location: 'Ekstra', description: 'Lemari Kayu' },
  { id: 59, code: '3050104002-12', name: 'Lemari Baju', category: 'MESIN PERALATAN NON TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Lemari Kayu' },
  { id: 60, code: '3050104002-13', name: 'Lemari Full High Type A', category: 'MESIN PERALATAN NON TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Lemari Kayu' },
  { id: 61, code: '3050104005-4', name: 'Elite', category: 'MESIN PERALATAN NON TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Filing Cabinet Besi' },
  { id: 62, code: '3050104007-2', name: 'SENTRYSAFE SF123ES', category: 'MESIN PERALATAN NON TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Brandkas' },
  { id: 63, code: '3050104007-3', name: 'AKASHI SD-104A', category: 'MESIN PERALATAN NON TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Brandkas' },
  { id: 64, code: '3050104013-1', name: 'Credenza', category: 'MESIN PERALATAN NON TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Buffet' },
  { id: 65, code: '3050104013-2', name: 'Credenza', category: 'MESIN PERALATAN NON TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Buffet' },
  { id: 66, code: '3050104015-2', name: 'Lemari Loker', category: 'MESIN PERALATAN NON TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Locker' },
  { id: 67, code: '3050104015-3', name: 'Lemari Loker', category: 'MESIN PERALATAN NON TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Locker' },
  { id: 68, code: '3050104015-4', name: 'Lemari Loker', category: 'MESIN PERALATAN NON TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Locker' },
  { id: 69, code: '3050104015-5', name: 'Lemari Loker', category: 'MESIN PERALATAN NON TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Locker' },
  { id: 70, code: '3050104015-6', name: 'Lemari Loker', category: 'MESIN PERALATAN NON TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Locker' },
  { id: 71, code: '3050105010-2', name: 'Sakura', category: 'MESIN PERALATAN NON TIK', condition: 'Baik', status: 'Tersedia', location: 'Ekstra', description: 'White Board' },
  { id: 72, code: '3050105015-1', name: 'Kozure Shredder KS-7500C0', category: 'MESIN PERALATAN NON TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Alat Penghancur Kertas' },
  { id: 73, code: '3050105015-2', name: 'Kozure KS-3500MC', category: 'MESIN PERALATAN NON TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Alat Penghancur Kertas' },
  { id: 74, code: '3050105038-1', name: 'Logitech Wireless R400', category: 'MESIN PERALATAN NON TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Laser Pointer' },
  { id: 75, code: '3050105038-2', name: 'Logitech Wireless R400', category: 'MESIN PERALATAN NON TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Laser Pointer' },
  { id: 76, code: '3050105048-8', name: 'Viewsonic', category: 'MESIN PERALATAN NON TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'LCD Projector/Infocus' },
  { id: 77, code: '3050105098-1', name: 'Bean Bag', category: 'MESIN PERALATAN NON TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Bean Bag' },
  { id: 78, code: '3050105098-2', name: 'Bean Bag', category: 'MESIN PERALATAN NON TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Bean Bag' },
  { id: 79, code: '3050105098-3', name: 'Bean Bag', category: 'MESIN PERALATAN NON TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Bean Bag' },
  { id: 80, code: '3050105098-4', name: 'Bean Bag', category: 'MESIN PERALATAN NON TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Bean Bag' },
  { id: 81, code: '3050199999-1', name: 'Coffee Table B', category: 'MESIN PERALATAN NON TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Alat Kantor Lainnya' },
  { id: 82, code: '3050199999-2', name: 'Coffee Table B', category: 'MESIN PERALATAN NON TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Alat Kantor Lainnya' },
  { id: 83, code: '3050199999-3', name: 'Coffee Table B', category: 'MESIN PERALATAN NON TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Alat Kantor Lainnya' },
  { id: 84, code: '3050199999-4', name: 'Coffee Table B', category: 'MESIN PERALATAN NON TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Alat Kantor Lainnya' },
  { id: 85, code: '3050199999-5', name: 'Coffee Table A', category: 'MESIN PERALATAN NON TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Alat Kantor Lainnya' },
  { id: 86, code: '3050199999-6', name: 'Coffee Table A', category: 'MESIN PERALATAN NON TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Alat Kantor Lainnya' },
  { id: 87, code: '3050199999-7', name: 'Coffee Table A', category: 'MESIN PERALATAN NON TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Alat Kantor Lainnya' },
  { id: 88, code: '3050201002-4', name: 'Meja Kerja L Type B', category: 'MESIN PERALATAN NON TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Meja Kerja Kayu' },
  { id: 89, code: '3050201002-5', name: 'Meja Kerja L Type A', category: 'MESIN PERALATAN NON TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Meja Kerja Kayu' },
  { id: 90, code: '3050201002-6', name: 'Meja Kerja Staff Konf 2', category: 'MESIN PERALATAN NON TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Meja Kerja Kayu' },
  { id: 91, code: '3050201003-12', name: 'Inviti Kursi Direktur', category: 'MESIN PERALATAN NON TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Kursi Besi/Metal' },
  { id: 92, code: '3050201003-13', name: 'Inviti (Orange) kursi staff', category: 'MESIN PERALATAN NON TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Kursi Besi/Metal' },
  { id: 93, code: '3050201005-2', name: 'Inviti sofa 1 seater', category: 'MESIN PERALATAN NON TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Sice' },
  { id: 94, code: '3050201005-3', name: 'Inviti Sofa Bed Ka Pus', category: 'MESIN PERALATAN NON TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Sice' },
  { id: 95, code: '3050201005-4', name: 'Inviti sofa 2 seater', category: 'MESIN PERALATAN NON TIK', condition: 'Baik', status: 'Tersedia', location: 'Intra', description: 'Sice' }
];

export const initialLoans: Loan[] = [
  {
    id: 'L001',
    employeeName: 'Arman Tony Aritonang',
    employeeNip: '199703062025041002',
    employeeEmail: 'arma001@komdigi.go.id',
    employeePhone: '081385933210',
    assetId: 39,
    assetName: 'Lenovo Slim 7',
    assetCode: '3100102003-51',
    purpose: 'Pengembangan sistem monitoring BMN',
    startDate: '2025-10-28',
    endDate: '2025-11-10',
    status: 'Disetujui',
    requestDate: '2025-10-27',
    approvedBy: 'Admin BMN',
    approvedDate: '2025-10-27'
  },
  {
    id: 'L002',
    employeeName: 'Arman Tony Aritonang',
    employeeNip: '199703062025041002',
    employeeEmail: 'arma001@komdigi.go.id',
    employeePhone: '081385933210',
    assetId: 76,
    assetName: 'Viewsonic',
    assetCode: '3050105048-8',
    purpose: 'Presentasi project review bulanan',
    startDate: '2025-10-30',
    endDate: '2025-11-05',
    status: 'Menunggu Persetujuan',
    requestDate: '2025-10-29'
  }
];
