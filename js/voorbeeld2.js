const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { PDFDocument } = require('pdf-lib');


	
	var setletter ='A';
async function testHandtekening (setletter) {
   try{
	   
  const pdfDoc = await PDFDocument.load(fs.readFileSync("PRO010001930542.PDF"));
const img = await pdfDoc.embedPng(fs.readFileSync("driverSignature.png"));
//const imagePage = pdfDoc.insertPage(1);

for (let i = 0; i < pdfDoc.getPageCount(); i++) {
let imagePage='';
imagePage = pdfDoc.getPage(i);
//console.log(i+1)
//console.log(imagePage.getWidth())
let xx=imagePage.getWidth()
//console.log(imagePage.getHeight())
let yy=imagePage.getHeight()
imagePage.drawImage(img, {
x: xx-270,
y: yy-670,
width: 70,
height: 70

});
const pdfBytes = await pdfDoc.save();
 var pathToPDF = "";
  const newFilePath = `${path.basename(pathToPDF, '.pdf')}-result.pdf`;
  fs.writeFileSync(newFilePath, pdfBytes);
}
    
    } catch (e) {
        console.error(e);
    } finally {
        console.log('Handtekening geplaatst in PDF!');
		return ({ message: 'Handtekening geplaatst in PDF'});
    }
}
testHandtekening();