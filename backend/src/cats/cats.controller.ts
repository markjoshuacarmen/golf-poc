import { Request, Response, NextFunction } from 'express'
import User from '../models/user.model'
import { getCats } from './cats.service'

export const CatController = async (req: Request, res: Response) => {
    try {
        const cats = getCats();
        res.status(201).json(cats)
    } catch (error) {
        res.status(500).send({ msg: 'There was an error' })
    }
}