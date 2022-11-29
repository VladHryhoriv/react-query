import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from 'utils/createWrapper';

import { useIssues } from '../useIssues';

describe('UseIssues', () => {
  it('Successful qury hook', async () => {
    const { result } = renderHook(() => useIssues(), {
      wrapper: createWrapper()
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.length).toBe(3);
  });

  // it('Failure qury hook', async () => {
  //   server.use(
  //     rest.get('*', (req, res, ctx) => {
  //       return res(ctx.status(500));
  //     })
  //   );

  //   const { result } = renderHook(() => useIssues(), {
  //     wrapper: createWrapper()
  //   });

  //   await waitFor(() => expect(result.current.isError).toBe(true));

  //   expect(result.current.error).toBeDefined();
  // });
});
