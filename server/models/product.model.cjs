module.exports = mongoose => {
  var schema = mongoose.Schema(
    { id: String,
      productCode: String,
      productName: String,
      price: Number,
      vat: Number,
      unit: String,
      HSN: Number,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Product = mongoose.model("products", schema);
  return Product;
};
