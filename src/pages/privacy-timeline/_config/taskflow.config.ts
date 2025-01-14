import { CompareDataConfig } from './taskflow.types';

export const taskflow: CompareDataConfig = {
  properties: {
    itemName: 'corpuzMetadata',
    itemNamePlural: 'corpuzMetadatas',
    columns: [
      { field: 'name', headerName: 'Scenario Name', width: 200 },
      { field: 'description', headerName: 'Description', width: 200 },
      { field: 'analysis_type', headerName: 'Analysis Type', width: 200 },
      {
        field: 'volumetric_flow_rate',
        headerName: 'Volumetric Flow Rate',
        width: 200,
        isComparisonMetric: true,
      },
      {
        field: 'tss_concentration',
        headerName: 'TSS Concentration',
        width: 200,
        isComparisonMetric: true,
      },
      {
        field: 'cod_concentration',
        headerName: 'COD Concentration',
        width: 200,
        isComparisonMetric: true,
      },
      {
        field: 'tkn_concentration',
        headerName: 'TKN Concentration',
        width: 200,
      },
    ],
  },
};
