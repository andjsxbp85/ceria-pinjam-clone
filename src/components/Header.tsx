import { Building2, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserRole } from '@/types';

interface HeaderProps {
  userRole: UserRole;
  userName: string;
  onLogout: () => void;
}

export const Header = ({ userRole, userName, onLogout }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <Building2 className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-lg font-bold text-foreground">Sistem Peminjaman BMN</h1>
            <p className="text-xs text-muted-foreground">Pusat Pengembangan Talenta Digital</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="font-medium">{userName}</p>
              <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={onLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Keluar
          </Button>
        </div>
      </div>
    </header>
  );
};