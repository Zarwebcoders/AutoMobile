// @desc    Get all records
exports.getAll = (Model) => async (req, res) => {
  try {
    const data = await Model.find();
    res.status(200).json({ success: true, count: data.length, data });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Get single record
exports.getOne = (Model) => async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    if (!data) return res.status(404).json({ success: false, error: 'Record not found' });
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Create record
exports.createOne = (Model) => async (req, res) => {
  try {
    const data = await Model.create(req.body);
    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Update record
exports.updateOne = (Model) => async (req, res) => {
  try {
    const data = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!data) return res.status(404).json({ success: false, error: 'Record not found' });
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Delete record
exports.deleteOne = (Model) => async (req, res) => {
  try {
    const data = await Model.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).json({ success: false, error: 'Record not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
