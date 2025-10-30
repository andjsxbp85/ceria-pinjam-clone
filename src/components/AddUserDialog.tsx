import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { employeesData, EmployeeData } from "@/data/employeesData";

interface AddUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface AdminData {
  username: string;
  password: string;
  name: string;
}

// Store admins in a simple array (in production, this would be in a database)
export const adminsData: AdminData[] = [
  {
    username: 'Admin',
    password: 'Adminpustaldig2025!',
    name: 'Administrator'
  }
];

export const AddUserDialog = ({ open, onOpenChange }: AddUserDialogProps) => {
  const [userType, setUserType] = useState<'admin' | 'employee'>('employee');
  const [formData, setFormData] = useState({
    nip: '',
    name: '',
    email: '',
    password: '',
    position: '',
    phone: '',
    username: '',
    unit: '',
    sub_unit: '',
    startDate: ''
  });
  const { toast } = useToast();

  const resetForm = () => {
    setFormData({
      nip: '',
      name: '',
      email: '',
      password: '',
      position: '',
      phone: '',
      username: '',
      unit: '',
      sub_unit: '',
      startDate: ''
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (userType === 'employee') {
      const newEmployee: EmployeeData = {
        nip: formData.nip,
        name: formData.name,
        unit: formData.unit || 'Badan Pengembangan SDM Komdigi',
        sub_unit: formData.sub_unit || 'Pusat Pengembangan Talenta Digital',
        position: formData.position,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        startDate: formData.startDate || new Date().toLocaleDateString('id-ID')
      };
      
      employeesData.push(newEmployee);
      
      toast({
        title: "Berhasil",
        description: "Pegawai baru berhasil ditambahkan"
      });
    } else {
      const newAdmin: AdminData = {
        username: formData.username,
        password: formData.password,
        name: formData.name
      };
      
      adminsData.push(newAdmin);
      
      toast({
        title: "Berhasil",
        description: "Admin baru berhasil ditambahkan"
      });
    }

    resetForm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tambah Pengguna Baru</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Tipe Pengguna</Label>
            <Select value={userType} onValueChange={(value: 'admin' | 'employee') => setUserType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="employee">Pegawai</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {userType === 'employee' ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nip">NIP</Label>
                <Input
                  id="nip"
                  value={formData.nip}
                  onChange={(e) => setFormData({ ...formData, nip: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Nama</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="unit">Unit</Label>
                <Input
                  id="unit"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  placeholder="Badan Pengembangan SDM Komdigi"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sub_unit">Sub Unit</Label>
                <Input
                  id="sub_unit"
                  value={formData.sub_unit}
                  onChange={(e) => setFormData({ ...formData, sub_unit: e.target.value })}
                  placeholder="Pusat Pengembangan Talenta Digital"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">Jabatan</Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">No. HP</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="startDate">Tanggal Mulai</Label>
                <Input
                  id="startDate"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  placeholder="01/01/2020"
                />
              </div>

              <div className="space-y-2 col-span-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Nama</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
            </>
          )}

          <div className="flex gap-2">
            <Button type="button" variant="outline" className="flex-1" onClick={() => {
              resetForm();
              onOpenChange(false);
            }}>
              Batal
            </Button>
            <Button type="submit" className="flex-1">
              Tambah
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
