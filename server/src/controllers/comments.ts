import { Comment } from 'entities';
import { catchErrors } from 'errors';
import { updateEntity, deleteEntity, createEntity } from 'utils/typeorm';
import { Request, Response } from 'express';

export const create = catchErrors((req: Request, res: Response) => {
  return async () => {
    const comment = await createEntity(Comment, <Comment>req.body);
    res.respond({ comment });
  };
});

export const update = catchErrors((req, res) => {
  return async () => {
    const comment = await updateEntity(Comment, req.params.commentId, <Comment>req.body);
    res.respond({ comment });
  };
});

export const remove = catchErrors((req, res) => {
  return async () => {
    const comment = await deleteEntity(Comment, req.params.commentId);
    res.respond({ comment });
  };
});
