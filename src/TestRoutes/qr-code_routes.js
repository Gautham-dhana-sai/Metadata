const express = require("express");
const qr = require("qrcode");

const QrRoutes = express.Router();

const { generateQr } = require("../Library/qr_code");

QrRoutes.get("/defaultQr", async (req, res) => {
  await generateQr('sample Qr').then(async (qr) => {
      const response = {
          success: true,
          error: false,
          data: qr 
      }
      return res.json(response)
  })
});

QrRoutes.post('/get/qr', async (req, res) => {
    await generateQr(req.body.link).then(async (qr) => {
        const data = {
            portal: req.body.portal,
            base64: qr
        } 
        const response = {
            success: true,
            error: false,
            data,
            message: 'Qr fetched.'
        }
        return res.json(response)
    })
})

module.exports = QrRoutes;
