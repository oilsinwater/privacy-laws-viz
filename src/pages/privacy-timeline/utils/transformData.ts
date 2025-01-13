interface PrivacyLawData {
  jurisdictionName: string;
  status: string;
  firstPrivacyLaw: Date;
  promulgationDate: Date;
  latestRevision: Date;
}

export const transformCsvData = (rawData: any[]) => {
  return rawData.map((row) => ({
    jurisdictionName: row['Jurisidction Name'],
    status: row['In Effect/Repealed/NYIF (Not Yet In Force)'],
    firstPrivacyLaw: new Date(row['First Privacy Law']),
    promulgationDate: new Date(row['This Law Promulgated']),
    latestRevision: new Date(row['Last: Latest Revision']),
  }));
};
