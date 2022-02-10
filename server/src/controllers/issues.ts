import { Issue } from 'entities';
import { catchErrors } from 'errors';
import { updateEntity, deleteEntity, createEntity, findEntityOrThrow } from 'utils/typeorm';

export const getProjectIssues = catchErrors((req, res) => {
  return async () => {
    const { projectId } = req.currentUser;
    const { searchTerm } = req.query;

    let whereSQL = 'issue.projectId = :projectId';

    if (searchTerm) {
      whereSQL += ' AND (issue.title ILIKE :searchTerm OR issue.descriptionText ILIKE :searchTerm)';
    }

    const issues = await Issue.createQueryBuilder('issue')
      .select()
      .where(whereSQL, { projectId, searchTerm: `%${<string>searchTerm}%` })
      .getMany();

    res.respond({ issues });
  };
});

export const getIssueWithUsersAndComments = catchErrors((req, res) => {
  return async () => {
    const issue = await findEntityOrThrow(Issue, req.params.issueId, {
      relations: ['users', 'comments', 'comments.user'],
    });
    res.respond({ issue });
  };
});

const calculateListPosition = async ({ projectId, status }: Issue): Promise<number> => {
  const issues = await Issue.find({ projectId, status });

  const listPositions = issues.map(({ listPosition }) => listPosition);

  if (listPositions.length > 0) {
    return Math.min(...listPositions) - 1;
  }
  return 1;
};

export const create = catchErrors((req, res) => {
  return async () => {
    const listPosition = await calculateListPosition(<Issue>req.body);
    const issue = await createEntity(Issue, <Issue>{ ...req.body, listPosition });
    res.respond({ issue });
  };
});

export const update = catchErrors((req, res) => {
  return async () => {
    const issue = await updateEntity(Issue, req.params.issueId, <Issue>req.body);
    res.respond({ issue });
  };
});

export const remove = catchErrors((req, res) => {
  return async () => {
    const issue = await deleteEntity(Issue, req.params.issueId);
    res.respond({ issue });
  };
});
