import { Package, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Asset, Loan } from '@/types';
import { StatusBadge } from '@/components/StatusBadge';

interface EmployeeDashboardProps {
  assets: Asset[];
  loans: Loan[];
  currentEmployee: string;
}

const EmployeeDashboard = ({ assets, loans, currentEmployee }: EmployeeDashboardProps) => {
  const myLoans = loans.filter(loan => loan.employeeName === currentEmployee);
  const totalAssets = assets.length;
  const availableAssets = assets.filter(a => a.status === 'Tersedia').length;
  const myActiveLoans = myLoans.filter(l => l.status === 'Disetujui').length;
  const myPendingLoans = myLoans.filter(l => l.status === 'Menunggu Persetujuan').length;

  const recentActivity = myLoans.slice(0, 5);

  const stats = [
    {
      title: 'Total BMN',
      value: totalAssets,
      icon: Package,
      color: 'text-primary'
    },
    {
      title: 'Tersedia',
      value: availableAssets,
      icon: CheckCircle,
      color: 'text-[hsl(var(--status-available))]'
    },
    {
      title: 'Sedang Saya Pinjam',
      value: myActiveLoans,
      icon: TrendingUp,
      color: 'text-[hsl(var(--status-on-loan))]'
    },
    {
      title: 'Menunggu Persetujuan',
      value: myPendingLoans,
      icon: Clock,
      color: 'text-[hsl(var(--status-pending))]'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Dashboard</h2>
        <p className="text-muted-foreground">Selamat datang di Sistem Peminjaman BMN</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="transition-smooth hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Aktivitas Terakhir</CardTitle>
        </CardHeader>
        <CardContent>
          {recentActivity.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Belum ada aktivitas peminjaman
            </p>
          ) : (
            <div className="space-y-4">
              {recentActivity.map((loan) => (
                <div
                  key={loan.id}
                  className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{loan.assetName}</p>
                    <p className="text-sm text-muted-foreground">{loan.assetCode}</p>
                    <p className="text-xs text-muted-foreground">
                      Diajukan: {new Date(loan.requestDate).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                  <StatusBadge status={loan.status} />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeDashboard;