const Invoice = require("../models/Invoice");
const createError = require("../middlewares/error");

const createInvoice = async (req, res, next) => {
  try {
    const invoice = await Invoice.create(req.body);

    res
      .status(201)
      .json({ message: "Facture créé avec succès", data: invoice });
  } catch (error) {
    next(createError(500, "erreur dans le serveur", error.message));
  }
};

const getInvoices = async (req, res, next) => {
  try {
    const invoices = await Invoice.findAll();

    if (!invoices) return next(createError(404, "Aucune facture trouvée"));

    res
      .status(200)
      .json({ message: "Toutes les factures trouvées", data: invoices });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const getInvoice = async (req, res, next) => {
  try {
    const invoice = await Invoice.findByPk({
      where: { id: req.params.id },
    });

    if (!invoice) return next(createError(404, "Aucune facture trouvée"));

    res
      .status(200)
      .json({ message: "Facture trouvée avec succès", data: invoice });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const updateInvoice = async (req, res, next) => {
  try {
    const [updateRows] = await Invoice.update(req.body, {
      where: { id: req.params.id },
    });

    if (updateRows === 0)
      return next(createError(404, "Aucune facture trouvée"));

    const updatedRows = await Invoice.findOne({
      where: { id: req.params.id },
    });

    res
      .status(200)
      .json({ message: "Facture mise à jour avec succès", data: updatedRows });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const deleteInvoice = async (req, res, next) => {
  try {
    const deletedRows = await Invoice.destroy({
      where: { id: req.params.id },
    });

    if (deletedRows === 0)
      return next(createError(404, "Pas de facture trouvée"));

    res.status(200).json({ message: "Facture supprimée avec succès" });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

module.exports = {
  createInvoice,
  getInvoices,
  getInvoice,
  updateInvoice,
  deleteInvoice,
};
