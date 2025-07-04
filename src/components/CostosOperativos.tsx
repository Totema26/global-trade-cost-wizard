
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building, Warehouse, MapPin, CreditCard } from 'lucide-react';
import { CostData } from '@/types/costTypes';

interface CostosOperativosProps {
  costData: CostData;
  updateAdvancedFactors: (field: string, value: number) => void;
}

const CostosOperativos = ({ costData, updateAdvancedFactors }: CostosOperativosProps) => {
  return (
    <Card className="border-l-4 border-l-indigo-500 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-indigo-50">
        <CardTitle className="flex items-center gap-3 text-indigo-800">
          <Building className="h-6 w-6" />
          Costos Operativos y Financieros (COF)
        </CardTitle>
        <p className="text-sm text-indigo-600">
          COF = [Cia + Ca × t + Cd] × (1 + if × tp) × νe
        </p>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
        <div className="space-y-2">
          <Label htmlFor="intermediacionAduanera" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Intermediación Aduanera (USD)
          </Label>
          <Input
            id="intermediacionAduanera"
            type="number"
            step="0.01"
            min="0"
            value={costData.advancedFactors.intermediacionAduanera || ''}
            onChange={(e) => updateAdvancedFactors('intermediacionAduanera', parseFloat(e.target.value) || 0)}
            placeholder="0.00"
            className="text-right"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="almacenamiento" className="flex items-center gap-2">
            <Warehouse className="h-4 w-4" />
            Almacenamiento/día (USD)
          </Label>
          <Input
            id="almacenamiento"
            type="number"
            step="0.01"
            min="0"
            value={costData.advancedFactors.almacenamientoPorDia || ''}
            onChange={(e) => updateAdvancedFactors('almacenamientoPorDia', parseFloat(e.target.value) || 0)}
            placeholder="0.00"
            className="text-right"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="distribucionLocal" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Distribución Local (USD)
          </Label>
          <Input
            id="distribucionLocal"
            type="number"
            step="0.01"
            min="0"
            value={costData.advancedFactors.distribucionLocal || ''}
            onChange={(e) => updateAdvancedFactors('distribucionLocal', parseFloat(e.target.value) || 0)}
            placeholder="0.00"
            className="text-right"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="tasaInteresFinanciera" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Tasa Interés Financiero (%)
          </Label>
          <Input
            id="tasaInteresFinanciera"
            type="number"
            step="0.01"
            min="0"
            value={costData.advancedFactors.tasaInteresFinanciera || ''}
            onChange={(e) => updateAdvancedFactors('tasaInteresFinanciera', parseFloat(e.target.value) || 0)}
            placeholder="0.00"
            className="text-right"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CostosOperativos;
