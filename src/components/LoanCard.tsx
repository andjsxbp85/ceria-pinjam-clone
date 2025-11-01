import { Calendar, FileText, Package, User, X } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { Loan, Asset } from "@/data/sampleData";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface LoanCardProps {
  loan: Loan;
  asset?: Asset;
  onCancel?: (loanId: string) => void;
}

export const LoanCard = ({ loan, asset, onCancel }: LoanCardProps) => {
  const handleCancel = (loanId: string) => {
    onCancel?.(loanId);
    toast.success('Peminjaman telah dibatalkan');
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow duration-200 animate-fade-in">
      <div className="mb-4 rounded-lg overflow-hidden bg-muted/30">
        {asset?.imageUrls && asset.imageUrls.length > 0 ? (
          <img 
            src={asset.imageUrls[0]} 
            alt={loan.assetName}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 flex items-center justify-center bg-muted/50">
            <div className="text-center">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No Image</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Package className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{loan.assetName}</h3>
            <p className="text-sm text-muted-foreground">Kode: {loan.assetCode}</p>
          </div>
        </div>
        <StatusBadge status={loan.status} />
      </div>
      
      <div className="space-y-3">
        <div className="flex items-start gap-2">
          <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Tujuan</p>
            <p className="text-sm text-muted-foreground">{loan.purpose}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium text-foreground">Periode</p>
            <p className="text-sm text-muted-foreground">
              {format(new Date(loan.startDate), 'dd MMM yyyy', { locale: id })} - {format(new Date(loan.endDate), 'dd MMM yyyy', { locale: id })}
            </p>
          </div>
        </div>
        
        {loan.approvedBy && (
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium text-foreground">Disetujui Oleh</p>
              <p className="text-sm text-muted-foreground">
                {loan.approvedBy} • {loan.approvedDate && format(new Date(loan.approvedDate), 'dd MMM yyyy', { locale: id })}
              </p>
            </div>
          </div>
        )}
      </div>

      {onCancel && loan.status === 'Menunggu Persetujuan' && (
        <div className="mt-4 pt-4 border-t border-border">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="w-full text-destructive hover:text-destructive">
                <X className="h-4 w-4 mr-2" />
                Batalkan Peminjaman
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Batalkan Peminjaman?</AlertDialogTitle>
                <AlertDialogDescription>
                  Apakah Anda yakin ingin membatalkan peminjaman "{loan.assetName}"? Tindakan ini tidak dapat dibatalkan.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Tidak</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleCancel(loan.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Ya, Batalkan
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </div>
  );
};
