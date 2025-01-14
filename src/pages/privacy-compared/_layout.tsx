import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { TopBar } from '../../components/TopBar';
import { useDataFromSource } from '../../utils/useDataFromSource';
import { CompareDataProvider } from './_context/ContextProvider';
import { taskflow } from './_config/taskflow.config';

/**
 * Top-level wrapper for the compare-data Task Flow templates.
 * Inner pages are rendered inside the `<Outlet />` component
 */
const CompareDataWrapper: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const scenariosPromise = useDataFromSource(taskflow.data.items.source);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await scenariosPromise;
        // Debug: Log the first row to see field names
        if (result.length > 0) {
          console.log('First row fields:', Object.keys(result[0]));
          console.log('First row data:', result[0]);
          
          // Debug: Check specific fields we're having trouble with
          const fieldsToCheck = [
            '﻿Jurisidction Name',
            'Document Source: Original ',
            'Government Website? ',
            'Document Source: English ',
            'Translation Type ',
            'Plain Text File Directory File Path '
          ];
          
          fieldsToCheck.forEach(field => {
            console.log(`Field "${field}" exists:`, field in result[0]);
            console.log(`Field "${field}" value:`, result[0][field]);
          });
        }
        setData(result);
      } catch (error) {
        console.error('Error loading scenarios:', error);
        setData([]);
      }
    };
    loadData();
  }, [scenariosPromise]);

  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <TopBar />
      </Box>
      <Box>
        <CompareDataProvider 
          data={data} 
          columns={taskflow.pages.index.tableColumns} 
          dataIdField="id"
        >
          <Outlet />
        </CompareDataProvider>
      </Box>
    </Box>
  )
}

export default CompareDataWrapper;