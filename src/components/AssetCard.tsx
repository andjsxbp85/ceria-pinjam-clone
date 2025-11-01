import { Package, SmilePlus, MapPin, Edit, Trash2, EyeOff, User, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import { Asset, Loan } from "@/data/sampleData";

interface AssetCardProps {
  asset: Asset;
  onBorrow?: (asset: Asset) => void;
  showBorrowButton?: boolean;
  isAdmin?: boolean;
  onEdit?: (asset: Asset) => void;
  onDelete?: (asset: Asset) => void;
  onHide?: (asset: Asset) => void;
  borrowerInfo?: { name: string; nip: string };
  onViewDetail?: (asset: Asset) => void;
  pendingLoanInfo?: { name: string; nip: string };
}

export const AssetCard = ({ 
  asset, 
  onBorrow, 
  showBorrowButton = false, 
  isAdmin = false,
  onEdit,
  onDelete,
  onHide,
  borrowerInfo,
  onViewDetail,
  pendingLoanInfo
}: AssetCardProps) => {
  const isAvailable = asset.status === 'Tersedia';

  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-all duration-200 animate-fade-in">
      <div className="mb-4 rounded-lg overflow-hidden bg-muted/30">
        {asset.imageUrls && asset.imageUrls.length > 0 ? (
          <img 
            src={asset.imageUrls[0]} 
            alt={asset.name}
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
      
      <div className="flex items-end justify-end mb-4">
        <StatusBadge status={asset.status} />
      </div>
      
      <h3 className="text-lg font-semibold text-foreground mb-1">{asset.name}</h3>
      <p className="text-sm text-muted-foreground mb-4">Kode: {asset.code}</p>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Package className="h-4 w-4" />
          <span>Kategori: {asset.category}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <SmilePlus className="h-4 w-4" />
          <span>Kondisi: {asset.condition}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>Lokasi: {asset.location}</span>
        </div>
      </div>
      
      {/* Pengguna field */}
      <div className="mb-4">
        <div className="flex items-center gap-2 text-sm">
          <User className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Pengguna: {asset.currentUser || '-'}</p>
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{asset.description}</p>
      
      {borrowerInfo && asset.status === 'Dipinjam' && (
        <div className="bg-muted/50 rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="font-medium text-foreground">{borrowerInfo.name}</p>
              <p className="text-xs text-muted-foreground">NIP: {borrowerInfo.nip}</p>
            </div>
          </div>
        </div>
      )}
      
      {pendingLoanInfo && asset.status === 'Tersedia' && (
        <div className="bg-pending-light/50 rounded-lg p-3 mb-4 border border-pending/30">
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-pending" />
            <div>
              <p className="font-medium text-foreground">{pendingLoanInfo.name}</p>
              <p className="text-xs text-muted-foreground">Menunggu Persetujuan</p>
            </div>
          </div>
        </div>
      )}
      
      {isAdmin ? (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="flex-1"
            onClick={() => onEdit?.(asset)}
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => onDelete?.(asset)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => onHide?.(asset)}
          >
            <EyeOff className="h-4 w-4" />
          </Button>
        </div>
      ) : showBorrowButton && (
        <div className="flex gap-2">
          {onViewDetail && (
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onViewDetail(asset)}
            >
              <Eye className="h-4 w-4 mr-2" />
              Lihat Detail
            </Button>
          )}
          <Button
            className="flex-1"
            disabled={!isAvailable}
            onClick={() => onBorrow?.(asset)}
          >
            {isAvailable ? 'Pinjam Sekarang' : 'Tidak Tersedia'}
          </Button>
        </div>
      )}
    </div>
  );
};
