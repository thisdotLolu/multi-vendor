const Category = require('../models/Categories');

module.exports = {
  createCategory: async (req, res) => {
    const newCategory = new Category(req.body);

    try {
      await newCategory.save();

      res
        .status(201)
        .json({ status: true, message: "Category saved successfully" });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },
  updateCategory: async (req, res) => {
    const id = req.params.id;

    const { title, value, imageUrl } = req.body;

    try {
      const updatedCategory = await Category.findByIdAndUpdate(
        id,
        {
          title: title,
          value: value,
          imageUrl: imageUrl,
        },
        { new: true }
      );

      if (!updatedCategory) {
        return res
          .status(404)
          .json({ status: false, message: "Category not found" });
      }

      res.status(200).json({ status: true, message: "updated successfully" });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },

  deleteCategory: async (req, res) => {
    const id = req.params.id;

    try {
      const categoryItem = await Category.findById(id);

      if (!categoryItem)
        res.status(404).json({ status: false, message: "not found" });

      await Category.findByIdAndDelete(categoryItem);
      res.status(200).json({ status: true, message: "deleted" });
    } catch (error) {
      res.status(500).json({ status: false, message: "An error occurred" });
    }
  },

  getAllCategories: async(req, res)=>{
    try {
        const categories = await Category.find({}, {__v:0});

        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json({status:false, message: error.message})
    }
  },

  patchCategoryImage: async(req, res)=>{
    const id = req.params.id;
    const imageUrl = req.body;

    try {
        const existingCategory = await Category.findById(id);
        const updateCategory = new Category({
            title: existingCategory.title,
            value: existingCategory.value,
            imageUrl: imageUrl
        })

        await updateCategory.save();
        res.status(200).json({status: true, message: " Category image updated successfully"})
    } catch (error) {
        res.status(500).json({status:false, message:error.message})
    }
  },

  getRandomCategories: async(req, res)=>{
    try{
        let categories = await Category.aggregate([
            {$match: {value: {$ne: 'more'}}},
            {$sample: {size: 7}}
        ]);

        const moreCategories = await Category.findOne({value:"more"});
        
        if(moreCategories){
            categories.push(moreCategories);
        }

        res.status(200).json(categories);
    }catch(error){
        res.status(500).json({status: false, message: error.message})
    }
  }
};