import { Request, Response } from "express";
import { unlink } from "fs/promises";
import { Phrase } from '../models/Phrase';
import { Sequelize } from 'sequelize';
import sharp from "sharp";

export const ping = (req: Request, res: Response) => {
    res.json({pong: true})
};

export const random = (req: Request, res: Response) => {
        let numAl: number = Math.floor( Math.random() * 4)
        res.json({number: numAl})
};

export const name = (req: Request, res: Response) => {
    let nome: string = req.params.name
    res.json({nome})
};

export const createPhrase = async ( req: Request, res: Response) => {  
    let {author, txt} = req.body;
    let newPhrase = await Phrase.create({author, txt});
    res.json({id: newPhrase.id, author, txt})
};

export const listPhrases = async (req: Request, res: Response) => {

    let list = await Phrase.findAll()

    res.json({ list })
}

export const phrase = async (req: Request, res: Response) => {

    let { id } = req.params;
    let priPhrase = await Phrase.findByPk(id)
    
    if (priPhrase) {
        res.json({priPhrase})
    } else {
        res.status(404);
        res.json({erro: 'frases não encotrada!'});
    }
}

export const updatePhrases = async (req: Request, res: Response) => { 
    let { id } = req.params;
    let {author, txt} = req.body;

    let phrase = await Phrase.findByPk(id);
    if (phrase) {
        phrase.author = author;
        phrase.txt = txt;
        await phrase.save();

        res.json({ phrase });
    } else {
        res.status(404);
        res.json({erro: 'frase não encontrada!'});
    }
}
export const deletePhrase = async (req: Request, res: Response) => {
    let { id } = req.params;
    await Phrase.destroy({ where: { id } })
    res.json({})


}

export const aletoriaPhrases = async ( req: Request, res: Response) => {
   let phrase = await Phrase.findOne({
    order: [
        Sequelize.fn('RAND')
    ]
   })

   if (phrase) {
   res.json({ phrase })
   } else {
    res.status(404);
    res.json({erro: 'Frase não encontrada!'});
   }
}

export const uploadFile = async (req: Request, res: Response) => {
    // const files =  req.files as {[fieldname: string]: Express.Multer.File[]}
    // console.log("AVATAR", files.avatar);
    // console.log("GALLERY", files.gallery);

    

    if ( req.file) {

        let filename = `${ req.file.filename}.jpg`

        await sharp(req.file.path).resize(500, 250).toFormat('jpeg').toFile(`./public/midia/${filename}`)

        await unlink(req.file.path);

    res.json({image: `${filename}`})
    } else { 
        res.status(400);
        res.json({ error: 'Arquivo invalido!'});
    }

    res.json({})
}