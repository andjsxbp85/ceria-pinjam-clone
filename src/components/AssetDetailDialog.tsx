import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Asset } from "@/data/sampleData";
import { Laptop, MapPin, Package } from "lucide-react";
import { StatusBadge } from "./StatusBadge";

interface AssetDetailDialogProps {
  asset: Asset | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AssetDetailDialog = ({ asset, open, onOpenChange }: AssetDetailDialogProps) => {
  if (!asset) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Detail BMN</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Images Gallery */}
          {asset.imageUrls && asset.imageUrls.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Gambar BMN</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {asset.imageUrls.map((url, index) => (
                  <div key={index} className="rounded-lg overflow-hidden border border-border">
                    <img 
                      src={url} 
                      alt={`${asset.name} - Gambar ${index + 1}`}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Asset Info */}
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-foreground">{asset.name}</h3>
                <p className="text-sm text-muted-foreground">Kode: {asset.code}</p>
              </div>
              <StatusBadge status={asset.status} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Kategori</p>
                  <p className="text-sm font-medium text-foreground">{asset.category}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Laptop className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Kondisi</p>
                  <p className="text-sm font-medium text-foreground">{asset.condition}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Lokasi</p>
                  <p className="text-sm font-medium text-foreground">{asset.location}</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">Deskripsi</h4>
              <p className="text-sm text-muted-foreground">{asset.description}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
