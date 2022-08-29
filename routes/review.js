const express=require('express')
const router=express.Router({mergeParams:true})
const Campground=require("../models/campground");
const Review=require('../models/review')
const {validateReview,isLoggedIn,isReviewAuthor}=require('../middleware')
const review=require('../controllers/review')

const catchAsync=require('../utils/catchAsync')

router.post('/',isLoggedIn,validateReview,catchAsync(review.reviewCreate))

router.delete('/:reviewId',isLoggedIn,isReviewAuthor ,catchAsync(review.reviewDel))

module.exports=router;