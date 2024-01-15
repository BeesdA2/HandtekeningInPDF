const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { PDFDocument, StandardFonts, rgb} = require('pdf-lib');


	
	var setletter ='A';
async function testHandtekening (setletter) {
   try{
	   
	   
	  
  const pdfDoc = await PDFDocument.load(fs.readFileSync("PRO010001930542.PDF"));
  
const img = await pdfDoc.embedPng(fs.readFileSync("driverSignature.png"));
// Embed the Times Roman font
const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

 
//const imagePage = pdfDoc.insertPage(1);

for (let i = 0; i < pdfDoc.getPageCount(); i++) {
let imagePage='';
imagePage = pdfDoc.getPage(i);
//console.log(i+1)
console.log(imagePage.getWidth())
let xx=imagePage.getWidth()
console.log(imagePage.getHeight())
let yy=imagePage.getHeight()
 

      const text = 'Akkoord klant:'
      const fontSize = 12
      const textWidth = timesRomanFont.widthOfTextAtSize(text, fontSize)
      const textHeight = timesRomanFont.heightAtSize(fontSize)
	  console.log('textHeight: '+textHeight);
 // Draw the string of text on the page
      imagePage.drawText(text, {
        x: xx-270,
        y: yy-670,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      })

      // Draw a box around the string of text  
 imagePage.drawRectangle({
        x: xx-290,
        y: yy-720,
        width: textWidth + 55,
        height: textHeight + 50,
        borderColor: rgb(0, 0, 0),
        borderWidth: 0.5,
      })
	  
imagePage.drawImage(img, {
x: xx-270,
y: yy-740,
width: 80,
height: 80

});
const pdfBytes = await pdfDoc.save();
 var pathToPDF = "";
  const newFilePath = `${path.basename(pathToPDF, '.pdf')}handtekening.pdf`;
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