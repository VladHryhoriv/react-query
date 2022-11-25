import { Label } from 'enities/Label.entity';
import { api } from 'utils/APIHandler';

export const fetchLabels = (): Promise<Label[]> => {
  return api.get('/api/labels');
};
