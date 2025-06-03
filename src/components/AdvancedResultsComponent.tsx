import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calculator, TrendingUp, DollarSign, Target, Zap, Ship } from 'lucide-react';
import { CostData } from '@/types/costTypes';
import { calculateAdvancedCosts, formatCurrency } from '@/utils/advancedCostCalculations';

interface AdvancedResultsComponentProps {
  costData: CostData;
}

const AdvancedResultsComponent = ({ costData }: AdvancedResultsComponentProps) => {
  const calculations = calculateAdvancedCosts(costData);
  
  const components = [
    { name: 'FOB', label: 'Free on Board', value: calculations.FOB, color: 'bg-blue-500' },
    { name: 'CF', label: 'Costo del Flete', value: calculations.costoFlete, color: 'bg-green-500' },
    { name: 'S', label: 'Prima del Seguro', value: calculations.costoSeguro, color: 'bg-orange-500' },
    { name: 'AD', label: 'Aranceles y Derechos', value: calculations.aranceles, color: 'bg-purple-500' },
    { name: 'IG', label: 'Impuestos Generales', value: calculations.impuestosGenerales, color: 'bg-red-500' },
    { name: 'GA', label: 'Gastos Aduaneros', value: calculations.gastosAduaneros, color: 'bg-indigo-500' },
  ];

  const getPercentage = (value: number): number => {
    const total = calculations.FOB + 
                 calculations.costoFlete + 
                 calculations.costoSeguro + 
                 calculations.aranceles + 
                 calculations.impuestosGenerales + 
                 calculations.gastosAduaneros;
    return total > 0 ? (value / total) * 100 : 0;
  };

  return (
    <Card className="border-2 border-gray-200 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <CardTitle className="flex items-center gap-3">
          <Calculator className="h-6 w-6" />
          Resultados del Modelo CIF
        </CardTitle>
        <p className="text-blue-100 text-sm">
          CTI = CIF × (1 + ta) × (1 + ti) + GA + CO
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6 pt-6">
        {/* Total CTI */}
        <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border">
          <div className="flex items-center justify-center mb-2">
            <DollarSign className="h-8 w-8 text-blue-600 mr-2" />
            <span className="text-2xl font-bold text-gray-900">CTI Total</span>
          </div>
          <div className="text-4xl font-bold text-blue-600 mb-2">
            {formatCurrency(calculations.costoTotalImportacion)}
          </div>
          <Badge variant="secondary" className="text-xs">
            Costo Total de Importación
          </Badge>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-green-50 rounded-lg border">
            <div className="flex items-center justify-center mb-1">
              <Ship className="h-4 w-4 text-green-600 mr-1" />
            </div>
            <div className="text-lg font-bold text-green-600">
              {formatCurrency(calculations.CIF)}
            </div>
            <div className="text-xs text-green-700">Valor CIF</div>
          </div>
          
          <div className="text-center p-3 bg-orange-50 rounded-lg border">
            <div className="flex items-center justify-center mb-1">
              <Target className="h-4 w-4 text-orange-600 mr-1" />
            </div>
            <div className="text-lg font-bold text-orange-600">
              {formatCurrency(calculations.baseGravable)}
            </div>
            <div className="text-xs text-orange-700">Base Gravable</div>
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

        {/* Análisis Estocástico y CTI con Factor Tiempo en una sola fila */}
        <div className="grid grid-cols-2 gap-4">
          {/* Análisis Estocástico */}
          <div className="p-4 bg-yellow-50 rounded-lg border">
            <h4 className="font-semibold text-yellow-900 mb-2">Análisis Estocástico:</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>CTI Esperado:</span>
                <span className="font-bold">{formatCurrency(calculations.CTI_esperado)}</span>
              </div>
              <div className="flex justify-between">
                <span>Desviación Estándar:</span>
                <span className="font-bold">{formatCurrency(calculations.desviacionEstandar_CTI)}</span>
              </div>
              <div className="flex justify-between">
                <span>Coef. Variación:</span>
                <span className="font-bold">{calculations.coeficienteVariacion.toFixed(2)}%</span>
              </div>
            </div>
          </div>

          {/* CTI con Factor Tiempo */}
          <div className="p-4 bg-purple-50 rounded-lg border">
            <h4 className="font-semibold text-purple-900 mb-2">CTI con Factor Tiempo:</h4>
            <div className="text-xl font-bold text-purple-600">
              {formatCurrency(calculations.CTI_conTiempo)}
            </div>
            <p className="text-xs text-purple-700 mt-1">
              Incluye tasa de descuento y factor temporal
            </p>
          </div>
        </div>

        {/* Formula Reference */}
        <div className="p-4 bg-gray-50 rounded-lg border">
          <h4 className="font-semibold text-gray-900 mb-2">Modelo Matemático:</h4>
          <div className="space-y-1 text-xs font-mono text-gray-700">
            <p>CIF = FOB + CF + S</p>
            <p>BG = CIF × TC</p>
            <p>AD = BG × ta</p>
            <p>IG = (BG + AD) × ti</p>
            <p>CTI = BG + GT + GA + CO</p>
            <p>CTI(t) = CTI × (1 + r)^t</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedResultsComponent;
