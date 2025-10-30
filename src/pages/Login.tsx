import { Building2, UserCircle, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserRole } from '@/types';

interface LoginProps {
  onLogin: (role: UserRole) => void;
}

const Login = ({ onLogin }: LoginProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-50 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
            <Building2 className="h-10 w-10 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">Sistem Peminjaman BMN</CardTitle>
            <CardDescription className="mt-2">
              Badan Pengembangan SDM Komdig
              <br />
              Pusat Pengembangan Talenta Digital
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Button
              className="w-full h-14 text-base"
              size="lg"
              onClick={() => onLogin('employee')}
            >
              <UserCircle className="mr-2 h-5 w-5" />
              Masuk sebagai Pegawai
            </Button>
            
            <Button
              className="w-full h-14 text-base"
              size="lg"
              variant="outline"
              onClick={() => onLogin('admin')}
            >
              <Shield className="mr-2 h-5 w-5" />
              Masuk sebagai Admin
            </Button>
          </div>
          
          <p className="text-xs text-center text-muted-foreground pt-4">
            Sistem manajemen peminjaman Barang Milik Negara (BMN)
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;