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

//var today= new Date().toLocaleDateString();
//console.log(today); //Ouput: "23/06/2022"
//var today= new Date().toLocaleTimeString();
//console.log(today); //Ouput: "11:31:41"

var today= new Date().toLocaleString('nl-NL', { timeZone: 'Europe/Amsterdam' });
console.log(today);  //Ouput: 6/23/2022, 6:00:03 AM

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
        x: xx-170,
        y: yy-670,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      })

      // Draw a box around the string of text  
 imagePage.drawRectangle({
        x: xx-180,
        y: yy-720,
        width: textWidth + 30,
        height: textHeight + 50,
        borderColor: rgb(0, 0, 0),
        borderWidth: 0.5,
      })
	  
imagePage.drawImage(img, {
x: xx-155,
y: yy-705,
width: 50,
height: 30

});

// Draw the string of today timestamp on the page
      const fontSizeToday= 8;
      imagePage.drawText(today , {
        x: xx-170,
        y: yy-718,
        size: fontSizeToday,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      })
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