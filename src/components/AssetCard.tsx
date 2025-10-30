import { Package, MapPin, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { StatusBadge } from './StatusBadge';
import { Asset } from '@/types';

interface AssetCardProps {
  asset: Asset;
  onBorrow?: (asset: Asset) => void;
  showBorrowButton?: boolean;
}

export const AssetCard = ({ asset, onBorrow, showBorrowButton = false }: AssetCardProps) => {
  return (
    <Card className="transition-smooth hover:shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-primary/10 p-2">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground line-clamp-1">{asset.name}</h3>
              <p className="text-sm text-muted-foreground">{asset.code}</p>
            </div>
          </div>
          <StatusBadge status={asset.status} />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <Wrench className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Kategori:</span>
          <span className="font-medium">{asset.category}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Lokasi:</span>
          <span className="font-medium">{asset.location}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{asset.description}</p>
      </CardContent>
      
      {showBorrowButton && asset.status === 'Tersedia' && (
        <CardFooter>
          <Button 
            className="w-full" 
            onClick={() => onBorrow?.(asset)}
          >
            Pinjam Sekarang
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};