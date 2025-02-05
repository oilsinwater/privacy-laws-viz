import { CompareDataConfig } from './taskflow.types';

export const taskflow: CompareDataConfig = {
  properties: {
    itemName: 'privacy law',
    itemNamePlural: 'privacy laws',
  },
  data: {
    items: {
      source: 'public/data/default/privacy_laws_with_ids.csv',
      idField: 'id',
    },
  },
  pages: {
    index: {
      title: 'Compare Privacy Laws',
      description: 'Description of this app section',
      tableColumns: [
        { field: 'id', headerName: 'ID', width: 100 },
        {
          field: 'Jurisidction Name',  
          headerName: 'Jurisdiction Name',
          width: 200,
        },
        {
          field: 'Key Law Original Title',
          headerName: 'Key Law Original Title',
          width: 300,
        },
        {
          field: 'Key Law English Translated Title',
          headerName: 'Key Law English Translated Title',
          width: 300,
        },
        {
          field: 'Key Law Corpus Identifier',
          headerName: 'Key Law Corpus Identifier',
          width: 250,
        },
        {
          field: 'In Effect/Repealed/NYIF (Not Yet In Force)',
          headerName: 'Status',
          width: 200,
        },
        {
          field: 'Originally Passed',  
          headerName: 'Originally Passed',
          width: 150,
        },
        {
          field: 'Currently Applicable',
          headerName: 'Currently Applicable',
          width: 150,
        },
        {
          field: 'Sector: Public, Private, or Both (From Tables) ',  
          headerName: 'Sector',
          width: 200,
        },
        {
          field: 'Document Source: Original',  
          headerName: 'Document Source: Original',
          width: 250,
        },
        {
          field: 'Government Website?',  
          headerName: 'Government Website?',
          width: 150,
        },
        {
          field: 'Document Source: English',  
          headerName: 'Document Source: English',
          width: 250,
        },
        {
          field: 'Translation Type',  
          headerName: 'Translation Type',
          width: 200,
        },
        {
          field: 'Plain Text File Directory File Path',  
          headerName: 'File Path',
          width: 250,
        },
        {
          field: 'Date of Retrieval of Original',
          headerName: 'Date of Retrieval (Original)',
          width: 200,
        },
        {
          field: 'Date of Retrieval of English Translation',
          headerName: 'Date of Retrieval (English)',
          width: 200,
        },
        { field: 'Comments/Notes', headerName: 'Comments/Notes', width: 250 },
      ],
    },
    new: {
      title: 'New Privacy Law',
      description: 'Description of this app section',
    },
    compare: {
      title: 'Compare Privacy Laws',
      description: 'Description of this app section',
    },
  },
};
