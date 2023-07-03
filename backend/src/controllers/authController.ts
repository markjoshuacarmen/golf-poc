import { Request, Response, NextFunction } from 'express'
import User from '../models/user.model'

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.create(req.body)
        res.status(201).json({user})
    } catch (error) {
        res.status(500).send({ msg: 'There was an error' })
    }
}

const loginUser = async (req: Request, res: Response) => {
    res.send('login')
}
const updateUser = async (req: Request, res: Response) => {
    res.send('update')
}

export { registerUser, loginUser, updateUser };