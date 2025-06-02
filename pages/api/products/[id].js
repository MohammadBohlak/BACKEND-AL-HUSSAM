import nc from 'next-connect';
import Product from '@/models/Product';
import dbConnect from '@/utils/dbConnect';

dbConnect();

/**
Get single product:
GET /api/products/PRODUCT_ID

Update product:

PUT /api/products/PRODUCT_ID
Content-Type: application/json
{
  "name": "Updated Product",
  "type": "Updated Type",
  "price": 1099.99,
  "description": "Updated description",
  "imageUrl": "https://example.com/new-image.jpg"
}

Delete product:
DELETE /api/products/PRODUCT_ID
*/

const handler = nc();

// GET single product
handler.get(async (req, res) => {
  try {
    const product = await Product.findById(req.query.id);
    
    if (!product) {
      return res.status(404).send({ error: 'Product not found' });
    }
    
    res.send(product);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch product' });
  }
});

// PUT update product
handler.put(async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.query.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedProduct) {
      return res.status(404).send({ error: 'Product not found' });
    }
    
    res.send(updatedProduct);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).send({ error: error.message });
    }
    res.status(500).send({ error: 'Failed to update product' });
  }
});

// DELETE product (حذف فعلي)
handler.delete(async (req, res) => {
  try {
    // حذف المنتج فعلياً من قاعدة البيانات
    const deletedProduct = await Product.findByIdAndDelete(req.query.id);
    
    if (!deletedProduct) {
      return res.status(404).send({ error: 'Product not found' });
    }
    
    
    res.send({ message: 'Product is delete successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete product' });
  }
});

export default handler;