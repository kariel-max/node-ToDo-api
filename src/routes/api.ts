import { Router } from "express";
import * as ApiControllers from '../controllers/apiControllers'
import { Phrase } from '../models/Phrase';

const router = Router();

router.get('/ping', ApiControllers.ping )
router.get('/random', ApiControllers.random )
router.get('/name/:name', ApiControllers.name )

router.post('/frases', ApiControllers.createPhrase)
router.get('/frases', ApiControllers.listPhrases )
router.get('/frases/aleatoria', ApiControllers.aletoriaPhrases)
router.get('/frases/:id', ApiControllers.phrase)
router.put('/frases/:id', ApiControllers.updatePhrases)
router.delete('/frases/:id', ApiControllers.deletePhrase)


export default router;