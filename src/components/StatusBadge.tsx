import { LoanStatus, AssetStatus } from '@/types';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: LoanStatus | AssetStatus;
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'Tersedia':
        return 'bg-[hsl(var(--status-available-bg))] text-[hsl(var(--status-available))]';
      case 'Dipinjam':
        return 'bg-[hsl(var(--status-on-loan-bg))] text-[hsl(var(--status-on-loan))]';
      case 'Menunggu Persetujuan':
        return 'bg-[hsl(var(--status-pending-bg))] text-[hsl(var(--status-pending))]';
      case 'Disetujui':
        return 'bg-[hsl(var(--status-approved-bg))] text-[hsl(var(--status-approved))]';
      case 'Ditolak':
        return 'bg-[hsl(var(--status-rejected-bg))] text-[hsl(var(--status-rejected))]';
      case 'Dikembalikan':
        return 'bg-[hsl(var(--status-returned-bg))] text-[hsl(var(--status-returned))]';
      case 'Maintenance':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
        getStatusStyles(),
        className
      )}
    >
      {status}
    </span>
  );
};