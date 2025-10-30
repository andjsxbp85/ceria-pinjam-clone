import { Calendar, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/StatusBadge';
import { Loan } from '@/types';

interface MyLoansProps {
  loans: Loan[];
  currentEmployee: string;
}

const MyLoans = ({ loans, currentEmployee }: MyLoansProps) => {
  const myLoans = loans.filter(loan => loan.employeeName === currentEmployee);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Peminjaman Saya</h2>
        <p className="text-muted-foreground">Daftar peminjaman BMN yang Anda ajukan</p>
      </div>

      {myLoans.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-lg font-medium text-foreground mb-2">
              Belum Ada Peminjaman
            </p>
            <p className="text-sm text-muted-foreground">
              Anda belum pernah mengajukan peminjaman BMN
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {myLoans.map((loan) => (
            <Card key={loan.id} className="transition-smooth hover:shadow-lg">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{loan.assetName}</CardTitle>
                  <StatusBadge status={loan.status} />
                </div>
                <p className="text-sm text-muted-foreground">{loan.assetCode}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Tujuan:</p>
                  <p className="text-sm text-muted-foreground">{loan.purpose}</p>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Periode:</span>
                  <span className="font-medium">
                    {new Date(loan.startDate).toLocaleDateString('id-ID')} -{' '}
                    {new Date(loan.endDate).toLocaleDateString('id-ID')}
                  </span>
                </div>

                <div className="pt-2 border-t space-y-1">
                  <p className="text-xs text-muted-foreground">
                    Diajukan: {new Date(loan.requestDate).toLocaleDateString('id-ID')}
                  </p>
                  {loan.approvedDate && (
                    <p className="text-xs text-muted-foreground">
                      Disetujui: {new Date(loan.approvedDate).toLocaleDateString('id-ID')} oleh{' '}
                      {loan.approvedBy}
                    </p>
                  )}
                  {loan.returnDate && (
                    <p className="text-xs text-muted-foreground">
                      Dikembalikan: {new Date(loan.returnDate).toLocaleDateString('id-ID')}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyLoans;