const express = require('express');
const router = express.Router();

const OrderInvoiceController = require('../../Controllers/Frontend/OrderInvoice.Controller');

const { verifyUserToken } = require("../../Middleware/auth");

router.post('/', OrderInvoiceController.createNewOrderInvoice);
router.get('/', OrderInvoiceController.getAllOrderInvoices);
router.get('/all', OrderInvoiceController.getOrderInvoices);
router.get('/:client_id/:advisor_id', OrderInvoiceController.findOrderInvoiceById);
router.put('/:client_id/:advisor_id', OrderInvoiceController.updateOrderInvoice);
router.delete('/:client_id/:advisor_id', OrderInvoiceController.deleteOrderInvoice);

module.exports = router;