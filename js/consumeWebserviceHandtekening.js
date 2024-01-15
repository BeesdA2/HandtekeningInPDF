const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { PDFDocument, StandardFonts, rgb} = require('pdf-lib');
 


	
	var origineelDocument  = process.argv[2];
	var handTekening= process.argv[3];
	const xxText= process.argv[4];
	const yyText= process.argv[5];


async function handtekeningPlaatsen (origineelDocument, handTekening, xxText, yyText) {
   try{
	   
  var pathName = '/www/profoundui/htdocs/signatures/'; 	   
  var origineelDocumentFullname = pathName+origineelDocument;
  var handTekeningFullname = pathName+handTekening;  
  const pdfDoc = await PDFDocument.load(fs.readFileSync(origineelDocumentFullname));
  
const img = await pdfDoc.embedPng(fs.readFileSync(handTekeningFullname));
// Embed the Times Roman font
const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
const origineelDocumentFilename = path.parse(origineelDocument).name;
 
 //console.log('handtekening plaatsen in PDF :origineelDocumentFilename: '+ origineelDocumentFilename); 
 
//const imagePage = pdfDoc.insertPage(1);

//var today= new Date().toLocaleDateString();
//console.log(today); //Ouput: "23/06/2022"
//var today= new Date().toLocaleTimeString();
//console.log(today); //Ouput: "11:31:41"

var today= new Date().toLocaleString('nl-NL', { timeZone: 'Europe/Amsterdam' });
 
//console.log(today);   
 

for (let i = 0; i < pdfDoc.getPageCount(); i++) {
let imagePage='';
imagePage = pdfDoc.getPage(i);
//console.log(i+1)
 
// console.log(imagePage.getWidth())
 
let xx=imagePage.getWidth()
 
//console.log(imagePage.getHeight())

let yy=imagePage.getHeight()
 

      const text = 'Akkoord klant:'
	   
      const fontSize = 12
      const textWidth = timesRomanFont.widthOfTextAtSize(text, fontSize)
      const textHeight = timesRomanFont.heightAtSize(fontSize)
	  console.log('textHeight: '+textHeight);
 // Draw the string of text on the page
      imagePage.drawText(text, {
        x: xx - xxText,
        y: yy - yyText,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      })
	  var xxDrawRectangleAdd = 10;
	  var xxDrawRectangleXXText = parseInt(xxText,10);
      var xxDrawRectangle = xxDrawRectangleXXText +xxDrawRectangleAdd;
	  
	  //console.log(xxDrawRectangle);
	   
	  
	  var yyDrawRectangleAdd = 50.0;
	  var yyDrawRectangleYYText = parseInt(yyText,10);
	  var yyDrawRectangle = yyDrawRectangleYYText + yyDrawRectangleAdd;
	  
	  // console.log(yyDrawRectangle);
	   
      // Draw a box around the string of text  
 imagePage.drawRectangle({
        x: xx - xxDrawRectangle,
        y: yy - yyDrawRectangle,
        width: textWidth + 30,
        height: textHeight + 50,
        borderColor: rgb(0, 0, 0),
        borderWidth: 0.5,
      })
	   var xxDrawImageAdd = 15; 
	   var xxDrawImageXXText = parseInt(xxText,10);
       var xxDrawImage = xxDrawImageXXText -xxDrawImageAdd;
	    
	   // console.log('xxDrawImage: ' +xxDrawImage);
	    
	  var yyDrawImageAdd = 35;
	  var yyDrawImageYYText = parseInt(yyText,10);
	  var yyDrawImage = yyDrawImageYYText + yyDrawImageAdd;
	   
	  //console.log('yyDrawImage: '+yyDrawImage);
	   
	  
     imagePage.drawImage(img, {
       x: xx-xxDrawImage,
       y: yy-yyDrawImage,
       width: 50,
        height: 30

});

     
	  var xxDrawTodayAdd = 0;
	  var xxDrawTodayXXText = parseInt(xxText,10);
	  var xxDrawToday = xxDrawTodayXXText + xxDrawTodayAdd;
	  
	 // console.log('xxDrawToday : '+ xxDrawToday);
	  
	 
	  var yyDrawTodayAdd = 48;
	  var yyDrawTodayYYText = parseInt(yyText,10);
	  var yyDrawToday = yyDrawTodayYYText + yyDrawTodayAdd;
	   
	  //console.log('yyDrawToday : '+ yyDrawToday);
	  
	  
// Draw the string of today timestamp on the page
      const fontSizeToday= 8;
      imagePage.drawText(today , {
        x: xx-xxDrawToday,
        y: yy-yyDrawToday,
        size: fontSizeToday,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      })
const pdfBytes = await pdfDoc.save();
 var pathToPDF = "";
  const newFilePath = pathName + origineelDocumentFilename + '-handTekening.PDF'; 
  fs.writeFileSync(newFilePath, pdfBytes);
  
}
    
    } catch (e) {
        console.error('handtekeningPlaatsen error:  '+e);
    } finally {
        console.log('Handtekening geplaatst in PDF!');
		return ({ message: 'Handtekening geplaatst in PDF'});
    }
}
//handtekeningPlaatsen (origineelDocument,handTekening, xxText, yyText);

async function handleHandtekeningPlaatsen (origineelDocument, handTekening, xxText, yyText)
{
    try{	
	
	
	var resolve = await handtekeningPlaatsen (origineelDocument,handTekening, xxText, yyText );
	return (resolve);
    }
	catch(err) {}
	
}


module.exports = {
  handleHandtekeningPlaatsen: handleHandtekeningPlaatsen,
  }; 
  
