import { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, User, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StatusBadge } from '@/components/StatusBadge';
import { Loan, Asset } from '@/types';
import { toast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface LoanManagementProps {
  loans: Loan[];
  assets: Asset[];
  onApproveLoan: (loanId: string) => void;
  onRejectLoan: (loanId: string) => void;
  onRecordReturn: (loanId: string) => void;
}

const LoanManagement = ({
  loans,
  assets,
  onApproveLoan,
  onRejectLoan,
  onRecordReturn,
}: LoanManagementProps) => {
  const [actionDialog, setActionDialog] = useState<{
    isOpen: boolean;
    type: 'approve' | 'reject' | 'return' | null;
    loanId: string | null;
  }>({
    isOpen: false,
    type: null,
    loanId: null,
  });

  const pendingLoans = loans.filter(l => l.status === 'Menunggu Persetujuan');
  const activeLoans = loans.filter(l => l.status === 'Disetujui');

  const handleAction = () => {
    if (!actionDialog.loanId || !actionDialog.type) return;

    switch (actionDialog.type) {
      case 'approve':
        onApproveLoan(actionDialog.loanId);
        toast({
          title: 'Berhasil',
          description: 'Peminjaman telah disetujui',
        });
        break;
      case 'reject':
        onRejectLoan(actionDialog.loanId);
        toast({
          title: 'Berhasil',
          description: 'Peminjaman telah ditolak',
        });
        break;
      case 'return':
        onRecordReturn(actionDialog.loanId);
        toast({
          title: 'Berhasil',
          description: 'Pengembalian telah dicatat',
        });
        break;
    }

    setActionDialog({ isOpen: false, type: null, loanId: null });
  };

  const getDialogContent = () => {
    switch (actionDialog.type) {
      case 'approve':
        return {
          title: 'Setujui Peminjaman',
          description: 'Apakah Anda yakin ingin menyetujui peminjaman ini?',
        };
      case 'reject':
        return {
          title: 'Tolak Peminjaman',
          description: 'Apakah Anda yakin ingin menolak peminjaman ini?',
        };
      case 'return':
        return {
          title: 'Catat Pengembalian',
          description: 'Apakah BMN telah dikembalikan dalam kondisi baik?',
        };
      default:
        return { title: '', description: '' };
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Kelola Peminjaman</h2>
        <p className="text-muted-foreground">Setujui, tolak, dan kelola peminjaman BMN</p>
      </div>

      {/* Pending Approvals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>Menunggu Persetujuan</span>
            {pendingLoans.length > 0 && (
              <span className="text-sm font-normal text-muted-foreground">
                ({pendingLoans.length})
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {pendingLoans.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Tidak ada peminjaman yang menunggu persetujuan
            </p>
          ) : (
            <div className="space-y-4">
              {pendingLoans.map((loan) => (
                <div
                  key={loan.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border rounded-lg"
                >
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{loan.assetName}</p>
                      <StatusBadge status={loan.status} />
                    </div>
                    <p className="text-sm text-muted-foreground">{loan.assetCode}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{loan.employeeName} ({loan.employeeNip})</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {new Date(loan.startDate).toLocaleDateString('id-ID')} -{' '}
                        {new Date(loan.endDate).toLocaleDateString('id-ID')}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Tujuan:</span> {loan.purpose}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() =>
                        setActionDialog({ isOpen: true, type: 'approve', loanId: loan.id })
                      }
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Setujui
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() =>
                        setActionDialog({ isOpen: true, type: 'reject', loanId: loan.id })
                      }
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Tolak
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Active Loans */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>Sedang Dipinjam</span>
            {activeLoans.length > 0 && (
              <span className="text-sm font-normal text-muted-foreground">
                ({activeLoans.length})
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activeLoans.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Tidak ada BMN yang sedang dipinjam
            </p>
          ) : (
            <div className="space-y-4">
              {activeLoans.map((loan) => (
                <div
                  key={loan.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border rounded-lg"
                >
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{loan.assetName}</p>
                      <StatusBadge status={loan.status} />
                    </div>
                    <p className="text-sm text-muted-foreground">{loan.assetCode}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{loan.employeeName} ({loan.employeeNip})</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {new Date(loan.startDate).toLocaleDateString('id-ID')} -{' '}
                        {new Date(loan.endDate).toLocaleDateString('id-ID')}
                      </span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      setActionDialog({ isOpen: true, type: 'return', loanId: loan.id })
                    }
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Catat Pengembalian
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* History Table */}
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Peminjaman</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>BMN</TableHead>
                  <TableHead>Peminjam</TableHead>
                  <TableHead>Periode</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tanggal Ajuan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loans.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                      Belum ada riwayat peminjaman
                    </TableCell>
                  </TableRow>
                ) : (
                  loans.map((loan) => (
                    <TableRow key={loan.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{loan.assetName}</p>
                          <p className="text-sm text-muted-foreground">{loan.assetCode}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{loan.employeeName}</p>
                          <p className="text-sm text-muted-foreground">{loan.employeeNip}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {new Date(loan.startDate).toLocaleDateString('id-ID')} -{' '}
                        {new Date(loan.endDate).toLocaleDateString('id-ID')}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={loan.status} />
                      </TableCell>
                      <TableCell className="text-sm">
                        {new Date(loan.requestDate).toLocaleDateString('id-ID')}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <AlertDialog open={actionDialog.isOpen} onOpenChange={(isOpen) =>
        setActionDialog({ ...actionDialog, isOpen })
      }>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{getDialogContent().title}</AlertDialogTitle>
            <AlertDialogDescription>
              {getDialogContent().description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleAction}>Ya, Lanjutkan</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default LoanManagement;