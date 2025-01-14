import * as d3 from 'd3-fetch';
import { useState, useEffect } from 'react';

/**
 * Get data from a local source or REST API.
 * Include the local basename if pulling from a local source.
 */
interface DataItem {
  id: string;
  [key: string]: string | undefined;  // Add index signature to allow any string key
  // Add other fields as necessary
}

export const useDataFromSource = (dataSource: string) => {
  const [data, setData] = useState<DataItem[]>([]);
  /** Get the base portion of the URL. Will be blank when running locally. */
  const base = document.querySelector('base')?.getAttribute('href') ?? '';
  /** 
   * Use the VITE_BASE_URL env variable to specify a path prefix that 
   * should be added to routes and local requests
   */
  const basePath = import.meta.env.VITE_BASE_URL || '';
  const basename = base + basePath;

  useEffect(() => {
    const fetchData = async () => {
      const fileExtension = dataSource.split('.').pop();
      const isExternal = dataSource.startsWith('http');
      const dataSourcePath = isExternal ? dataSource : `${basename}/${dataSource}`;
      let fetchedData: DataItem[] = [];
      
      if (fileExtension === 'csv') {
        try {
          // First fetch the raw CSV text
          const response = await fetch(dataSourcePath);
          const text = await response.text();
          
          // Parse CSV manually to preserve exact field names
          const rows = text.split('\n');
          const headers = rows[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
          
          // Parse remaining rows
          fetchedData = rows.slice(1).filter(row => row.trim()).map(row => {
            // Handle quoted fields that may contain commas
            const values: string[] = [];
            let inQuotes = false;
            let currentValue = '';
            
            for (let i = 0; i < row.length; i++) {
              const char = row[i];
              if (char === '"') {
                inQuotes = !inQuotes;
              } else if (char === ',' && !inQuotes) {
                values.push(currentValue.trim().replace(/^"|"$/g, ''));
                currentValue = '';
              } else {
                currentValue += char;
              }
            }
            values.push(currentValue.trim().replace(/^"|"$/g, ''));

            const item: DataItem = { id: '' };
            headers.forEach((header, index) => {
              // Remove BOM from header if it exists
              const cleanHeader = header.replace(/^\uFEFF/, '');
              item[cleanHeader] = values[index] || '';
            });
            
            // Debug log for Sector field
            if (item['Sector: Public, Private, or Both (From Tables) ']) {
              console.log('Sector value:', item['Sector: Public, Private, or Both (From Tables) ']);
            }
            
            return item;
          });
          
          console.log('Headers:', headers);
          console.log('First row:', fetchedData[0]);
          setData(fetchedData);
        } catch (error) {
          console.error('Error loading CSV:', error);
          setData([]);
        }
      } else if (fileExtension === 'tsv') {
        try {
          fetchedData = await d3.tsv(dataSourcePath) as unknown as DataItem[];
          setData(fetchedData);
        } catch (error) {
          console.error('Error loading TSV:', error);
          setData([]);
        }
      } else if (fileExtension === 'json' || isExternal) {
        try {
          const response = await fetch(dataSourcePath, {
            method: 'GET',
            redirect: 'follow',
          });
          if (!response.ok) {
            throw new Error("unable to fetch");
          }
          fetchedData = await response.json();
          setData(fetchedData);
        } catch (error) {
          console.error('Error loading JSON:', error);
          setData([]);
        }
      }
    };

    fetchData();
  }, [dataSource, basename]);

  return data;
};