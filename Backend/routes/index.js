import express from 'express';
// import UserModels from '../models/User.model.js';
import { Createuser, getUser, updateUser, deleteUser } from '../controllers/user.controller.js';


const router = express.Router();

router.post('/user-create', Createuser)
router.get('/get', getUser)
router.put('/update/:id', updateUser)
router.delete('/delete/:id',deleteUser)


export default router;