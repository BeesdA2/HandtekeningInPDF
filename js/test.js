(async () => {
const pdfDoc = await PDFDocument.load(fs.readFileSync("PRO010001930542.PDF"));
const img = await pdfDoc.embedPng(fs.readFileSync("driverSignature.png"));

for (let i = 0; i < pdfDoc.getPageCount(); i++) {
let imagePage='';
imagePage = pdfDoc.getPage(i);
console.log(i+1)
console.log(imagePage.getWidth())
let xx=imagePage.getWidth()
console.log(imagePage.getHeight())
let yy=imagePage.getHeight()
imagePage.drawImage(img, {
x: xx-70,
y: yy-70,
width: 70,
height: 70

});
}