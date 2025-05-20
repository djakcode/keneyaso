const Product = require("../models/Product");
const createError = require("../middlewares/error");

const addProduct = async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);

    res
      .status(201)
      .json({ message: "Produit créé avec succès", data: newProduct });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();

    if (!products) return next(createError(404, "Aucun produit trouvé"));

    res
      .status(200)
      .json({ message: "Produits trouvés avec succès", data: products });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk({
      where: { id: req.params.id },
    });

    if (!product) return next(createError(404, "Aucun produit trouvé"));

    res
      .status(200)
      .json({ message: "Produit trouvé avec succès", data: product });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const [updateRows] = await Product.update(req.body, {
      where: { id: req.params.id },
    });

    if (updateRows === 0) return next(createError(404, "Aucun produit trouvé"));

    const updatedRows = await Product.findOne({
      where: { id: req.params.id },
    });

    res
      .status(200)
      .json({ message: "Produit mise à jour avec succès", data: updatedRows });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const deleteRows = await Product.destroy({
      where: { id: req.params.id },
    });

    if (deleteRows === 0) return next(createError(404, "Aucun product trouvé"));

    res.status(200).json({ message: "Produit supprimé avec succès" });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

module.exports = {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
