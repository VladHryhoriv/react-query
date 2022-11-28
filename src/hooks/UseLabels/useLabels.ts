import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { Label } from 'enities/Label.entity';
import { labelsKeys } from 'enums/queries';
import { fetchLabels } from 'services/API';

export const useLabels = (
  options?: Omit<
    UseQueryOptions<Map<Label['id'], Label>, Error>,
    'queruKey' | 'queryFn'
  >
): UseQueryResult<Map<Label['id'], Label>, Error> => {
  const data = useQuery<Map<Label['id'], Label>, Error>(
    labelsKeys.root,
    async () => {
      const labelsData = await fetchLabels();

      const labels = Label.deserializeAsMap(labelsData);

      return labels;
    },
    { ...options }
  );

  return data;
};
