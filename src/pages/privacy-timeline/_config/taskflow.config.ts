import { transformCsvData } from '../utils/transformData';

export const config = {
  taskType: 'TimelineViz',
  dataConfig: {
    source: {
      type: 'csv',
      path: '/data/privacy_laws.csv',
      transformer: transformCsvData,
    },
  },
  visualConfig: {
    timeline: {
      height: 800,
      margin: { top: 40, right: 120, bottom: 60, left: 200 },
    },
    grouping: {
      field: 'jurisdictionName',
      sortBy: 'promulgationDate',
    },
    markers: {
      types: [
        {
          field: 'promulgationDate',
          symbol: 'circle',
          size: 8,
        },
        {
          field: 'latestRevision',
          symbol: 'diamond',
          size: 10,
        },
      ],
    },
    colors: {
      status: {
        'In Effect': '#2ecc71',
        Repealed: '#e74c3c',
        NYIF: '#f1c40f',
      },
    },
  },
};
