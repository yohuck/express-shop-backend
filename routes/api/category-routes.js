const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try{
    const categoryData = await Category.findAll({
      include: [{ model: Product}]
    });
    res.status(200).json(categoryData)
  }  
    catch(err){
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try{
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    });

  if (!categoryData) {
    res.status(404).json({ message: 'No category found with that id!'});
    return;
  }

  res.status(200).json(categoryData);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create({
      category_name: req.body.category_name,
    })

  if (!categoryData){
    res.status(404).json({message: 'Could not create category'})
    return;
  }

    res.status(200).json({message: 'Successfull added category'});
  } 
  
  catch(err) {
    console.log('hello?')
    res.status(500).json({message: 'Something went wrong'});
  }
});

router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(
      {
        category_name: req.body.category_name,
      },
      { 
        where: {category_id: req.params.id }
      })
  
      if (!categoryData) {
          res.status(404).json({message: 'No category found with that id!'});
          return
      }
      res.status(200).json({message: "Successfully updated category"})
  } catch(err){
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  try{
    const categoryData = await Category.destroy({
      where: {
        category_id: req.params.id,
      },
    });

    if(!categoryData){
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch(err){
    res.status(err);
  }
});

module.exports = router;
