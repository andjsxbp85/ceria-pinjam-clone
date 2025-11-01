import { Building2, LogOut, User, Settings, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import { ProfileDialog } from "./ProfileDialog";
import { Employee, Notification } from "@/data/sampleData";

interface HeaderProps {
  userName: string;
  userRole: string;
  onLogout: () => void;
  employee?: Employee | null;
  notifications?: Notification[];
  onNotificationClick?: (notificationId: string) => void;
}

export const Header = ({ userName, userRole, onLogout, employee, notifications = [], onNotificationClick }: HeaderProps) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const initials = userName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-lg">
              <Building2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Sistem Peminjaman BMN</h1>
              <p className="text-xs text-muted-foreground">Pusat Pengembangan Talenta Digital</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Notification Icon */}
            <DropdownMenu open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
              <DropdownMenuTrigger asChild>
                <div 
                  className="relative cursor-pointer"
                  onMouseEnter={() => setIsNotificationOpen(true)}
                  onMouseLeave={() => setIsNotificationOpen(false)}
                >
                  <Bell className="h-7 w-7 text-foreground" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount > 9 ? '9+' : String(unreadCount)}
                    </span>
                  )}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-80 bg-popover max-h-96 overflow-y-auto"
                onMouseEnter={() => setIsNotificationOpen(true)}
                onMouseLeave={() => setIsNotificationOpen(false)}
              >
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground text-sm">
                    Tidak ada notifikasi
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <DropdownMenuItem 
                      key={notification.id}
                      className="cursor-pointer flex-col items-start p-4 border-b border-border last:border-0"
                      onClick={() => onNotificationClick?.(notification.id)}
                    >
                      <p className="font-medium text-foreground mb-1">{notification.title}</p>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      {!notification.read && (
                        <div className="mt-2 inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                          Baru
                        </div>
                      )}
                    </DropdownMenuItem>
                  ))
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-foreground">{userName}</p>
              <p className="text-xs text-muted-foreground">{userRole}</p>
            </div>
            
            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <div 
                  className="flex items-center gap-4 cursor-pointer"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-56 bg-popover"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                {employee && (
                  <>
                    <DropdownMenuItem onClick={() => setIsProfileOpen(true)}>
                      <Settings className="h-4 w-4 mr-2" />
                      Pengaturan Akun
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem onClick={onLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Keluar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      
      {employee && (
        <ProfileDialog 
          open={isProfileOpen} 
          onOpenChange={setIsProfileOpen}
          employee={employee}
        />
      )}
    </>
  );
};
