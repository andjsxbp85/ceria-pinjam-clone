import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Upload } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface ReturnAssetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (data: {
    returnDate: Date;
    condition: string;
    photoFile: File | null;
    notes: string;
    documentFile: File | null;
  }) => void;
  assetName: string;
}

export const ReturnAssetDialog = ({ open, onOpenChange, onConfirm, assetName }: ReturnAssetDialogProps) => {
  const [returnDate, setReturnDate] = useState<Date>(new Date());
  const [condition, setCondition] = useState<string>("Baik");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [notes, setNotes] = useState("");
  const [documentFile, setDocumentFile] = useState<File | null>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoFile(e.target.files[0]);
    }
  };

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDocumentFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    onConfirm({
      returnDate,
      condition,
      photoFile,
      notes,
      documentFile
    });
    
    // Reset form
    setReturnDate(new Date());
    setCondition("Baik");
    setPhotoFile(null);
    setNotes("");
    setDocumentFile(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Catat Pengembalian BMN</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Nama BMN</Label>
            <p className="text-sm text-muted-foreground">{assetName}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="returnDate" className="text-sm font-medium">
              Tanggal Pengembalian <span className="text-destructive">*</span>
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !returnDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {returnDate ? format(returnDate, "PPP", { locale: id }) : <span>Pilih tanggal</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={returnDate}
                  onSelect={(date) => date && setReturnDate(date)}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="condition" className="text-sm font-medium">
              Kondisi Barang Saat Pengembalian <span className="text-destructive">*</span>
            </Label>
            <Select value={condition} onValueChange={setCondition}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih kondisi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Baik">Baik</SelectItem>
                <SelectItem value="Cukup">Cukup</SelectItem>
                <SelectItem value="Buruk">Buruk</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="photo" className="text-sm font-medium">
              Foto Barang Saat Pengembalian
            </Label>
            <div className="flex items-center gap-3">
              <Input
                id="photo"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('photo')?.click()}
                className="w-full"
              >
                <Upload className="h-4 w-4 mr-2" />
                {photoFile ? photoFile.name : 'Upload Foto'}
              </Button>
            </div>
            {photoFile && (
              <p className="text-xs text-muted-foreground">File terpilih: {photoFile.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-medium">
              Keterangan Pengembalian
            </Label>
            <Textarea
              id="notes"
              placeholder="Masukkan keterangan pengembalian..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="document" className="text-sm font-medium">
              Dokumen
            </Label>
            <div className="flex items-center gap-3">
              <Input
                id="document"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleDocumentChange}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('document')?.click()}
                className="w-full"
              >
                <Upload className="h-4 w-4 mr-2" />
                {documentFile ? documentFile.name : 'Upload Dokumen'}
              </Button>
            </div>
            {documentFile && (
              <p className="text-xs text-muted-foreground">File terpilih: {documentFile.name}</p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button onClick={handleSubmit}>
            Simpan Pengembalian
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
