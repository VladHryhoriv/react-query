import { rest } from 'msw';
import { SuccessResponse } from 'types/common/api';
import { IssuesListDTO } from 'types/Issues';

interface IssuesBody {}
interface IssuesParams {
  label: string;
}
interface IssuesResponse extends SuccessResponse<IssuesListDTO> {}

export const issuesAPIHandler = [
  rest.get<IssuesBody, IssuesParams, IssuesResponse>(
    '/issues',
    (_req, res, ctx) => {
      return res(
        ctx.json({
          data: {
            items: []
          }
        })
      );
    }
  )
];
