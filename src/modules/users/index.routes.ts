import express from 'express';
import userHandler from './user-handler';
import asyncHandler from '../../utils/asyncHandler';

export const userRouter= express.Router()
userRouter.post("/",asyncHandler(userHandler.createUser))