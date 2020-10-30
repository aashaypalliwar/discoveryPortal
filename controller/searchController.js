const User = require('./../model/dbModel/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.searchByTag = catchAsync(async (req, res, next) => {

  try{
    const queryTags = req.body.tagsSelected;

    const users = await User.find({ publishStatus: true, tags: { $all: queryTags } })
      .select('name email image verifyStatus')
      .sort({ verifyStatus: -1 })
      .lean();
  
    res.status(200).json({
      status: 'success',
      data: {
        users},
    });
  }
  catch (err){
    throw new AppError(err.message, 500);
  }
  
});