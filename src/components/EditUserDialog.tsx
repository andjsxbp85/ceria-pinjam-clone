import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { employeesData, EmployeeData } from "@/data/employeesData";
import { adminsData } from "./AddUserDialog";

interface EditUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: EmployeeData | AdminData | null;
  userType: 'employee' | 'admin';
}

interface AdminData {
  username: string;
  password: string;
  name: string;
}

export const EditUserDialog = ({ open, onOpenChange, user, userType }: EditUserDialogProps) => {
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

  useEffect(() => {
    if (user) {
      if (userType === 'employee') {
        const employee = user as EmployeeData;
        setFormData({
          nip: employee.nip,
          name: employee.name,
          email: employee.email,
          password: employee.password,
          position: employee.position,
          phone: employee.phone,
          username: '',
          unit: employee.unit,
          sub_unit: employee.sub_unit,
          startDate: employee.startDate
        });
      } else {
        const admin = user as AdminData;
        setFormData({
          nip: '',
          name: admin.name,
          email: '',
          password: admin.password,
          position: '',
          phone: '',
          username: admin.username,
          unit: '',
          sub_unit: '',
          startDate: ''
        });
      }
    }
  }, [user, userType]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (userType === 'employee' && user) {
      const index = employeesData.findIndex(emp => emp.email === (user as EmployeeData).email);
      if (index > -1) {
        employeesData[index] = {
          nip: formData.nip,
          name: formData.name,
          unit: formData.unit,
          sub_unit: formData.sub_unit,
          position: formData.position,
          phone: formData.phone,
          email: formData.email,
          password: formData.password,
          startDate: formData.startDate
        };
        
        toast({
          title: "Berhasil",
          description: "Data pegawai berhasil diperbarui"
        });
      }
    } else if (user) {
      const index = adminsData.findIndex(admin => admin.username === (user as AdminData).username);
      if (index > -1) {
        adminsData[index] = {
          username: formData.username,
          password: formData.password,
          name: formData.name
        };
        
        toast({
          title: "Berhasil",
          description: "Data admin berhasil diperbarui"
        });
      }
    }

    onOpenChange(false);
  };

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Pengguna</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleUpdate} className="space-y-4">
          {userType === 'employee' ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-nip">NIP</Label>
                <Input
                  id="edit-nip"
                  value={formData.nip}
                  onChange={(e) => setFormData({ ...formData, nip: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-name">Nama</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-unit">Unit</Label>
                <Input
                  id="edit-unit"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-sub_unit">Sub Unit</Label>
                <Input
                  id="edit-sub_unit"
                  value={formData.sub_unit}
                  onChange={(e) => setFormData({ ...formData, sub_unit: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-position">Jabatan</Label>
                <Input
                  id="edit-position"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-phone">No. HP</Label>
                <Input
                  id="edit-phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-startDate">Tanggal Mulai</Label>
                <Input
                  id="edit-startDate"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2 col-span-2">
                <Label htmlFor="edit-password">Password</Label>
                <Input
                  id="edit-password"
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
                <Label htmlFor="edit-username">Username</Label>
                <Input
                  id="edit-username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-name">Nama</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-password">Password</Label>
                <Input
                  id="edit-password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
            </>
          )}

          <div className="flex gap-2">
            <Button type="button" variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
              Batal
            </Button>
            <Button type="submit" className="flex-1">
              Simpan Perubahan
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
