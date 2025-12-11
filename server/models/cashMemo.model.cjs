module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      memoNumber: String,
      memoDate: String,
      userName: String,
      products: Array,
      customerId: String,
      customerName: String,
      totalAmount: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const CashMemo = mongoose.model("cashmemos", schema);
  return CashMemo;
};
