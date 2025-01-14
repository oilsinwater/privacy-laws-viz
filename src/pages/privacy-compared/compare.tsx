import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Container, Link, Paper, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { PageHeader } from '../../components/PageHeader';
import { useCompareData } from './_context/ContextProvider';
import { setComparing } from './_context/actions';
import { DataGrid } from '@mui/x-data-grid';
import { taskflow } from './_config/taskflow.config';
import { useDataFromSource } from '../../utils/useDataFromSource';

/**
 * Comparison page for the compare-data Task Flow.
 * Displays a table with the selected items from `<ScenarioList>`
 * as the columns and the metrics as the rows.
 */
const ScenarioComparison: React.FC = () => {
  const { state, dispatch } = useCompareData();
  const [comparisonData, setComparisonData] = useState<any[]>([]); // State to hold the comparison data

  /**
   * Set comparing to true whenever this page renders.
   * Set it back to false when the component is torn down.
   */
  useEffect(() => {
    dispatch(setComparing(true));
    // Fetch the CSV data when the component mounts
    useDataFromSource(taskflow.data.items.source)
      .then((results: any[]) => { 
        setComparisonData(results);
      })
      .catch((error) => {
        console.error('Error fetching the CSV file:', error);
        setComparisonData([]);
      });

    return () => {
      dispatch(setComparing(false));
    };
  }, [dispatch]);

  /**
   * Content to render on the page for this component
   */
  return (
    <Box>
      <PageHeader
        pageTitle={taskflow.pages.compare.title}
        description={taskflow.pages.compare.description}
        actions={
          <Stack direction="row">
            <Box>
              <Link component={RouterLink} to="..">
                <Button variant="contained" startIcon={<ArrowBackIcon />}>
                  Back to {taskflow.properties.itemNamePlural}
                </Button>
              </Link>
            </Box>
            <Box>
              <Link component={RouterLink} to="../new">
                <Button variant="contained">
                  New {taskflow.properties.itemName}
                </Button>
              </Link>
            </Box>
          </Stack>
        }
        sx={{
          padding: 3,
          backgroundColor: 'white',
        }}
      />
      <Container
        maxWidth="xl"
        sx={{
          marginTop: 3,
          marginBottom: 3,
        }}
      >
        <Paper
          sx={{
            '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
              borderRight: '1px solid',
              borderRightColor: 'neutral.main',
            },
            '& .compare-data--metric': {
              fontWeight: 'bold',
            },
          }}
        >
          {state.comparing && (
            <DataGrid
              rows={comparisonData}
              getRowId={(row) => row.id}
              columns={taskflow.pages.index.tableColumns}
              disableRowSelectionOnClick
              disableDensitySelector
              disableColumnFilter
            />
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default ScenarioComparison;
