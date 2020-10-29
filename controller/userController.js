const User = require('./../model/dbModel/userModel');
const Tag = require('./../model/dbModel/tagModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');

function filterObj(obj, ...allowedFields) {
  let newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
}

exports.aboutMe = catchAsync(async (req, res, next) => {
  //  Through protect function in auth logic we get the user in req
  console.log(req.user.id);
  const user = await User.findById(req.user.id).populate({
    path: 'tags',
    model: 'Tag',
    select: 'name group',
  });

  if (!user) {
    return next(new AppError('This user is not present', 401));
  }

  res.status(200).json({
    status: 'suceess',
    data: {
      user,
    },
  });
});

exports.updateProfile = catchAsync(async (req, res, next) => {
  if (req.body.email || req.body.name) {
    return next(
      new AppError('Sorry you are not allowed to change name and email', 401)
    );
  }

  const updateUser = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true,
  }).populate({
    path: 'tags',
    model: 'Tag',
    select: 'name group',
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updateUser,
    },
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  let filter = {};

  let docs;
  // const users = await User.find({role:{$eq:'user'}})
  req.query.sort = 'name';
  const features = new APIFeatures(User.find(filter).populate({
    path: 'tags',
    model: 'Tag',
    select: 'name group' ,
  }), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  docs = await features.query; // explain()

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: docs.length,
    data: {
      docs,
    },
  });
});

exports.getAllTags = catchAsync(async (req, res, next) => {
  let filter = {};
  let docs;
  // const users = await User.find({role:{$eq:'user'}})
  req.query.sort = 'group';
  const features = new APIFeatures(Tag.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  docs = await features.query; // explain()

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: docs.length,
    data:{
      docs
    }
  });
});

exports.reportUser = catchAsync(async (req, res, next) => {
  console.log('Await 1 starts');
  const reportedUser = await User.findById(req.params.id);

  if (!reportedUser) {
    return next(new AppError('The user with this id is not present', 403));
  }
  console.log('Await 1 done');

  if (reportedUser.reporters && reportedUser.reporters.includes(req.user.id)) {
    res.status(200).json({
      status: 'success',
      message: 'This user is already reported by you',
    });
  } else {
    // reportedUser.reporters.push(req.user.id);
    // reportedUser.reportCount = reportedUser.reporters.length;
    // await reportedUser.save({runValidators:false});
    const newReportCount = reportedUser.reportCount + 1;
    console.log('Await 2 starts');
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      reportCount: newReportCount,
      $push: { reporters: req.user.id },
    });
    console.log('Await 2 done');
    res.status(200).json({
      status: 'Success',
      message: 'The user has been successfully reported',
      data: updatedUser,
    });
  }
});
