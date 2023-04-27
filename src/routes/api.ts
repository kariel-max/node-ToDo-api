import { Router } from "express";
import * as ApiControllers from '../controllers/apiControllers'
import multer from "multer";

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './tmp');
//     },
//     filename: (req, file, cb) => {
//         let randomName = Math.floor(Math.random() * 99999);
//         cb(null, `${randomName+Date.now()}.jpg`);
//     }
// })

const upload = multer({
    dest: './tmp',
    fileFilter: (req, file, cb) => {
        const allower: string[] = ['image/jpg', 'image/jpeg', 'image/png'];

        if (allower.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(null, false)
        }
    },
    limits: { fileSize: 200000}
});
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

router.post('/upload', upload.single('avatar'), ApiControllers.uploadFile)

// para receber mais de um arquivo
// router.post('/upload', upload.fields([
//     {name: 'avatar', maxCount: 1 },
//     {name: 'gallery', maxCount: 3 }
// ]), ApiControllers.uploadFile)

export default router;