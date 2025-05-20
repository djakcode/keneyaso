const InvoiceItem = require("../models/InvoiceItem");
const createError = require("../middlewares/error");

const addInvoiceItem = async (req, res, next) => {
  try {
    const newInvoiceItem = await InvoiceItem.create(req.body);

    res
      .status(201)
      .json({ message: "Element ajouté à la facture", data: newInvoiceItem });
  } catch (error) {
    next(createError(500, "Erreur dans le serrveur", error.message));
  }
};

const getInvoiceItems = async (req, res, next) => {
  try {
    const invoiceItems = await InvoiceItem.findAll();

    if (!invoiceItems)
      return next(createError(404, "Pas d'element dans la facture"));

    res
      .status(200)
      .json({ message: "Elements de la facture", data: invoiceItems });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const getInvoiceItem = async (req, res, next) => {
  try {
    const invoiceItem = await InvoiceItem.findByPk({
      where: { id: req.params.id },
    });

    if (!invoiceItem) return next(createError(404, "Pas d'element de facture"));

    res
      .status(200)
      .json({ message: "Element de facture trouvé", data: invoiceItem });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const updateInvoiceItem = async (req, res, next) => {
  try {
    const [updateRows] = await InvoiceItem.update(req.body, {
      where: { id: req.params.id },
    });

    if (updateRows === 0)
      return next(createError(404, "Pas d'element de facture trouvé"));

    const updatedRows = await InvoiceItem.findOne({
      where: { id: req.params.id },
    });

    res
      .status(200)
      .json({
        message: "Element de facture mise à jour avec succès",
        data: updatedRows,
      });
  } catch (error) {
    next(createError(500, "erreur dans le serveur", error.message));
  }
};

const deleteInvoiceItem = async (req, res, next) => {
  try {
    const deletedRows = await InvoiceItem.destroy({
      where: { id: req.params.id },
    });

    if (deletedRows === 0)
      return next(createError(404, "Pas d'element de facture trouvé"));

    res
      .status(200)
      .json({ message: "Element de facture supprimé avec succès" });
    res.status(200).json();
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

module.exports = {
  addInvoiceItem,
  getInvoiceItems,
  getInvoiceItem,
  updateInvoiceItem,
  deleteInvoiceItem,
};
