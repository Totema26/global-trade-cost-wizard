
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calculator, TrendingUp, DollarSign, Target, Zap } from 'lucide-react';
import { CostData } from '@/types/costTypes';
import { calculateAdvancedCosts, formatCurrency } from '@/utils/advancedCostCalculations';

interface AdvancedResultsComponentProps {
  costData: CostData;
}

const AdvancedResultsComponent = ({ costData }: AdvancedResultsComponentProps) => {
  const calculations = calculateAdvancedCosts(costData);
  
  const components = [
    { name: 'CD', label: 'Costos Directos', value: calculations.CD, color: 'bg-blue-500' },
    { name: 'CTI', label: 'Transporte Internacional', value: calculations.CTI, color: 'bg-green-500' },
    { name: 'CAT', label: 'Aduaneros y Tributarios', value: calculations.CAT, color: 'bg-purple-500' },
    { name: 'CSG', label: 'Seguros y Garantías', value: calculations.CSG, color: 'bg-orange-500' },
    { name: 'COF', label: 'Operativos y Financieros', value: calculations.COF, color: 'bg-indigo-500' },
    { name: 'CF', label: 'Contingencia y Riesgo', value: calculations.CF, color: 'bg-red-500' },
  ];

  const getPercentage = (value: number): number => {
    return calculations.CAI > 0 ? (value / calculations.CAI) * 100 : 0;
  };

  return (
    <Card className="border-2 border-gray-200 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <CardTitle className="flex items-center gap-3">
          <Calculator className="h-6 w-6" />
          Resultados del Modelo Avanzado
        </CardTitle>
        <p className="text-blue-100 text-sm">
          CAI = Σ(i=1 to n) [Ci × (1 + Ri) × Wi] × Fo × Fe
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6 pt-6">
        {/* Total CAI */}
        <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border">
          <div className="flex items-center justify-center mb-2">
            <DollarSign className="h-8 w-8 text-blue-600 mr-2" />
            <span className="text-2xl font-bold text-gray-900">CAI Total</span>
          </div>
          <div className="text-4xl font-bold text-blue-600 mb-2">
            {formatCurrency(calculations.CAI)}
          </div>
          <Badge variant="secondary" className="text-xs">
            Costo Total de Adquisición Optimizado
          </Badge>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-green-50 rounded-lg border">
            <div className="flex items-center justify-center mb-1">
              <Zap className="h-4 w-4 text-green-600 mr-1" />
            </div>
            <div className="text-lg font-bold text-green-600">
              {calculations.optimizationSavings.toFixed(1)}%
            </div>
            <div className="text-xs text-green-700">Ahorro por Optimización</div>
          </div>
          
          <div className="text-center p-3 bg-orange-50 rounded-lg border">
            <div className="flex items-center justify-center mb-1">
              <Target className="h-4 w-4 text-orange-600 mr-1" />
            </div>
            <div className="text-lg font-bold text-orange-600">
              {formatCurrency(calculations.VCIF)}
            </div>
            <div className="text-xs text-orange-700">Valor CIF</div>
          </div>
        </div>

        {/* Components Breakdown */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-5 w-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Desglose por Componentes</h3>
          </div>
          
          {components.map((component) => (
            <div key={component.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${component.color}`}></div>
                  <span className="text-sm font-medium text-gray-700">
                    {component.name}
                  </span>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">
                    {formatCurrency(component.value)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {getPercentage(component.value).toFixed(1)}%
                  </div>
                </div>
              </div>
              <Progress 
                value={getPercentage(component.value)} 
                className="h-2"
              />
              <div className="text-xs text-gray-600 mb-3">
                {component.label}
              </div>
            </div>
          ))}
        </div>

        {/* CAI Ajustado por Riesgo */}
        <div className="p-4 bg-red-50 rounded-lg border">
          <h4 className="font-semibold text-red-900 mb-2">CAI Ajustado por Riesgo:</h4>
          <div className="text-xl font-bold text-red-600">
            {formatCurrency(calculations.riskAdjustedCAI)}
          </div>
          <p className="text-xs text-red-700 mt-1">
            Incluye promedio de factores de riesgo
          </p>
        </div>

        {/* Formula Reference */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
          <h4 className="font-semibold text-gray-900 mb-2">Modelo Matemático:</h4>
          <div className="space-y-1 text-xs font-mono text-gray-700">
            <p>CD = PFOB × (1 + τe) × (1 + δ) × γq</p>
            <p>CTI = [FB × (1 + βc) × λd × ψm] × (1 + μs)</p>
            <p>CAT = VCIF × [τa × (1 + ηp)] + [(VCIF + Aranceles) × τv] + ΣTf</p>
            <p>CSG = VCIF × σ × (1 + α × κ) × Θ + Σsg</p>
            <p>COF = [Cia + Ca × t + Cd] × (1 + if × tp) × νe</p>
            <p>CF = (Σ C1-C5) × φ × ρ × ωv</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedResultsComponent;
