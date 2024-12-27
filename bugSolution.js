```javascript
const pipeline = [
  {
    $match: {
      status: 'active'
    }
  },
  {
    $lookup: {
      from: 'products',
      localField: 'product_id',
      foreignField: '_id',
      as: 'product'
    }
  },
  {
    $unwind: {
      path: '$product',
      preserveNullAndEmptyArrays: true
    }
  },
  {
    $group: {
      _id: { $ifNull: ['$product.category', 'Unknown'] },
      totalSales: { $sum: '$amount' }
    }
  }
];

// Solution:
// 1. `preserveNullAndEmptyArrays: true` in `$unwind`: This ensures that documents with no matching product (empty `product` array) are not dropped, allowing for accurate aggregate results. 
// 2. `$ifNull` in `$group`: This handles cases where `$product.category` is null or undefined (due to missing products), preventing errors and assigning them to a meaningful default category like 'Unknown'.
```