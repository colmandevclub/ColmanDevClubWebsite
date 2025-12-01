
export const generateRows = (data, totalColCriteria, totalRowCriteria) => {
  if (! Array.isArray(data) || data.length === 0) { return []; }

  const mainColumnKey = Object.keys(data[0])[0];

  const totalRowCountsPerCol = {};

  const rows = data.map((rowData, index) => {

    const row = {
      id: index + 1,
      [mainColumnKey]: rowData[mainColumnKey],
    };

    const totalColCountsPerRow = {}; 
    Object.keys(totalColCriteria).forEach((key) => {
      totalColCountsPerRow[key] = 0; 
    });

    Object.keys(rowData).forEach((key) => {
      if (key !== mainColumnKey) {
        const subColumns = rowData[key];
        if (typeof subColumns === 'object') {
          Object.keys(subColumns).forEach((subKey) => {
            const value = subColumns[subKey];
            const fieldName = `${key}_${subKey}`;
            row[fieldName] = value;

            if (totalColCriteria[subKey] && value === totalColCriteria[subKey]) {
              totalColCountsPerRow[subKey] += 1; 
            }

            if (totalRowCriteria[subKey] && value === totalRowCriteria[subKey]) {
              if (!totalRowCountsPerCol[fieldName]) {
                totalRowCountsPerCol[fieldName] = 0;
              }
              totalRowCountsPerCol[fieldName] += 1;
            }
          });
        } else {
          row[key] = rowData[key];
        }
      }
    });

    Object.keys(totalColCountsPerRow).forEach((key) => {
      row[`total_${key}`] = totalColCountsPerRow[key];
    });
    
    return row;

  });


  const totalRow = {
    id: 'total',
    [mainColumnKey]: {
      isTotalRow: true,
      totalCount: data.length,
    }, 
  };

  Object.keys(totalRowCountsPerCol).forEach((fieldName) => {
    totalRow[fieldName] = totalRowCountsPerCol[fieldName];
  });

  Object.keys(totalColCriteria).forEach((key) => {
    totalRow[`total_${key}`] = ''; 
  });

  rows.push(totalRow); 

  return rows;
};
