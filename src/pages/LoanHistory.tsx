import { Asset, Loan } from "@/data/sampleData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { FileText, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LoanHistoryProps {
  loans: Loan[];
  assets: Asset[];
}

export const LoanHistory = ({ loans, assets }: LoanHistoryProps) => {
  const returnedLoans = loans.filter(loan => loan.status === 'Dikembalikan');

  const getAssetById = (assetId: number) => {
    return assets.find(asset => asset.id === assetId);
  };

  const formatDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), "dd MMM yyyy", { locale: id });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Riwayat Pengembalian</h2>
        <p className="text-muted-foreground mt-1">Daftar peminjaman BMN yang telah dikembalikan</p>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID BMN</TableHead>
              <TableHead>Kode BMN</TableHead>
              <TableHead>Nama BMN</TableHead>
              <TableHead>Peminjam</TableHead>
              <TableHead>Periode</TableHead>
              <TableHead>Tanggal Pengembalian</TableHead>
              <TableHead>Kondisi</TableHead>
              <TableHead>Keterangan</TableHead>
              <TableHead>Foto</TableHead>
              <TableHead>Dokumen</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {returnedLoans.length === 0 ? (
              <TableRow>
                <TableCell colSpan={11} className="text-center py-8 text-muted-foreground">
                  Belum ada riwayat pengembalian
                </TableCell>
              </TableRow>
            ) : (
              returnedLoans.map((loan) => {
                const asset = getAssetById(loan.assetId);
                return (
                  <TableRow key={loan.id}>
                    <TableCell className="font-medium">{loan.assetId}</TableCell>
                    <TableCell className="font-mono text-sm">{loan.assetCode}</TableCell>
                    <TableCell>{loan.assetName}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{loan.employeeName}</p>
                        <p className="text-xs text-muted-foreground">{loan.employeeNip}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{formatDate(loan.startDate)}</p>
                        <p className="text-muted-foreground">s/d {formatDate(loan.endDate)}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {loan.returnedDate ? formatDate(loan.returnedDate) : '-'}
                    </TableCell>
                    <TableCell>
                      {loan.returnCondition ? (
                        <Badge 
                          variant={
                            loan.returnCondition === 'Baik' ? 'default' : 
                            loan.returnCondition === 'Cukup' ? 'secondary' : 
                            'destructive'
                          }
                        >
                          {loan.returnCondition}
                        </Badge>
                      ) : '-'}
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <p className="text-sm truncate" title={loan.returnNotes}>
                        {loan.returnNotes || '-'}
                      </p>
                    </TableCell>
                    <TableCell>
                      {loan.returnPhotoUrl ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(loan.returnPhotoUrl, '_blank')}
                        >
                          <ImageIcon className="h-4 w-4" />
                        </Button>
                      ) : '-'}
                    </TableCell>
                    <TableCell>
                      {loan.returnDocumentUrl ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(loan.returnDocumentUrl, '_blank')}
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                      ) : '-'}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {loan.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
