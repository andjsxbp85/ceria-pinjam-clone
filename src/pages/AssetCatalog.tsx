import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { AssetCard } from '@/components/AssetCard';
import { Asset } from '@/types';

interface AssetCatalogProps {
  assets: Asset[];
  onBorrow?: (asset: Asset) => void;
  showBorrowButton?: boolean;
}

const AssetCatalog = ({ assets, onBorrow, showBorrowButton = false }: AssetCatalogProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAssets = assets.filter(asset => {
    const query = searchQuery.toLowerCase();
    return (
      asset.name.toLowerCase().includes(query) ||
      asset.code.toLowerCase().includes(query) ||
      asset.category.toLowerCase().includes(query) ||
      asset.location.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Daftar BMN</h2>
        <p className="text-muted-foreground">Katalog Barang Milik Negara yang tersedia</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Cari BMN (nama, kode, kategori, lokasi)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {filteredAssets.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Tidak ada BMN yang ditemukan</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAssets.map((asset) => (
            <AssetCard
              key={asset.id}
              asset={asset}
              onBorrow={onBorrow}
              showBorrowButton={showBorrowButton}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AssetCatalog;