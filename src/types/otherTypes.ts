import * as z from 'zod';

const CompanyStatisticsSchema = z.object({
  logId: z.number(),
  clientIpAddress: z.string(),
  timestamp: z.string(),
  operationType: z.string(),
  tableName: z.string(),
  recordId: z.number(),
  query: z.string(),
});

export const CompanyStatisticsListSchema = z.array(CompanyStatisticsSchema);

export type ICompanyStatistics = z.infer<typeof CompanyStatisticsSchema>;
