const qr = require("qrcode");

const generateQr = async (content) => {
  const stringContent = JSON.stringify(content);
  return await qr.toDataURL(stringContent);
};

const generateQrTerminal = (content) => {
  const stringContent = JSON.stringify(content);
  qr.toString(stringContent, { type: "terminal" }, (err, qr) => {
    console.log(content);
    if (err) {
      console.log(err);
    }
    console.log(qr);
  });
};

const generateQrFile = (content, fileName) => {
  const stringContent = JSON.stringify(content);
  qr.toFile(`src/QrCodes/${fileName}.png`, stringContent);
};

module.exports = { generateQr, generateQrTerminal, generateQrFile };
