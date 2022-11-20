import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { Label } from 'enities/Label.entity';
import { labelsKeys } from 'enums/queries';
import { fetchLabels } from 'services/API';

export const useLabels = (
  options?: Omit<UseQueryOptions<Label[], Error>, 'queruKey' | 'queryFn'>
): UseQueryResult<Label[], Error> => {
  const data = useQuery<Label[], Error>(
    labelsKeys.root,
    async () => {
      const labelsData = await fetchLabels();

      const labels = Label.deserializeAsArray(labelsData);

      return labels;
    },
    { ...options }
  );

  return data;
};
