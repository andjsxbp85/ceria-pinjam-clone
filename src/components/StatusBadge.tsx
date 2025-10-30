import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const statusStyles: Record<string, string> = {
  'Tersedia': 'bg-success-light text-success border-success/20',
  'Dipinjam': 'bg-warning-light text-warning border-warning/20',
  'Maintenance': 'bg-muted text-muted-foreground border-border',
  'Menunggu Persetujuan': 'bg-pending-light text-pending border-pending/20',
  'Disetujui': 'bg-info-light text-info border-info/20',
  'Ditolak': 'bg-destructive/10 text-destructive border-destructive/20',
  'Dikembalikan': 'bg-muted text-muted-foreground border-border',
  'Dibatalkan': 'bg-muted text-muted-foreground border-border',
  'Disembunyikan': 'bg-muted text-muted-foreground border-border',
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border",
        statusStyles[status] || 'bg-muted text-muted-foreground',
        className
      )}
    >
      {status}
    </span>
  );
};
