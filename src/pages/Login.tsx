import { Building2, Shield, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Employee } from "@/data/sampleData";
import { employeesData } from "@/data/employeesData";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface LoginProps {
  onLogin: (role: 'employee' | 'admin', employee?: Employee) => void;
  employees: Employee[];
}

const Login = ({ onLogin, employees }: LoginProps) => {
  const [loginMode, setLoginMode] = useState<'select' | 'employee' | 'admin'>('select');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const handleEmployeeLogin = () => {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();
    
    const employeeData = employeesData.find(emp => emp.email === trimmedUsername);
    
    if (!employeeData) {
      toast({
        title: "Login Gagal",
        description: "Email tidak ditemukan",
        variant: "destructive"
      });
      return;
    }

    if (employeeData.password !== trimmedPassword) {
      toast({
        title: "Login Gagal",
        description: "Password salah",
        variant: "destructive"
      });
      return;
    }

    const employee: Employee = {
      nip: employeeData.nip,
      name: employeeData.name,
      unit: employeeData.unit,
      sub_unit: employeeData.sub_unit,
      position: employeeData.position,
      email: employeeData.email
    };

    onLogin('employee', employee);
  };

  const handleAdminLogin = () => {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();
    
    if (trimmedUsername !== 'Admin') {
      toast({
        title: "Login Gagal",
        description: "Username salah",
        variant: "destructive"
      });
      return;
    }

    if (trimmedPassword !== 'Adminpustaldig2025!') {
      toast({
        title: "Login Gagal",
        description: "Password salah",
        variant: "destructive"
      });
      return;
    }

    onLogin('admin');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginMode === 'employee') {
      handleEmployeeLogin();
    } else if (loginMode === 'admin') {
      handleAdminLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-scale-in">
        <div className="bg-card rounded-2xl shadow-xl border border-border p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-xl mb-4">
              <Building2 className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Sistem Aset Barang Milik Negara (BMN)
            </h1>
            <p className="text-sm text-muted-foreground">
              Badan Pengembangan SDM Komdig
            </p>
            <p className="text-xs text-muted-foreground">
              Pusat Pengembangan Talenta Digital
            </p>
          </div>

          {loginMode === 'select' ? (
            <div className="space-y-4">
              <Button
                className="w-full h-14 text-base gap-3"
                onClick={() => setLoginMode('employee')}
              >
                <User className="h-5 w-5" />
                Masuk sebagai Pegawai
              </Button>
              
              <Button
                className="w-full h-14 text-base gap-3"
                variant="outline"
                onClick={() => setLoginMode('admin')}
              >
                <Shield className="h-5 w-5" />
                Masuk sebagai Admin
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">
                  {loginMode === 'employee' ? 'Email' : 'Username'}
                </Label>
                <Input
                  id="username"
                  type={loginMode === 'employee' ? 'email' : 'text'}
                  placeholder={loginMode === 'employee' ? 'Email' : 'Username'}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setLoginMode('select');
                    setUsername('');
                    setPassword('');
                  }}
                >
                  Kembali
                </Button>
                <Button type="submit" className="flex-1">
                  Masuk
                </Button>
              </div>
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-xs text-center text-muted-foreground">
              © 2025 Badan Pengembangan SDM Komdig
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
