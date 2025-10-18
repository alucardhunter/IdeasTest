import { Router } from 'express';
import * as controller from '../controllers/ideasController';

const router = Router();

router.get('/', controller.listIdeas);
router.post('/', controller.createIdea);
router.get('/:id', controller.getIdea);
router.post('/:id/vote', controller.voteIdea);
router.post('/:id/comments', controller.addComment);

export default router;
