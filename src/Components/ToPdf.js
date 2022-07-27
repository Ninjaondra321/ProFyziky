import React from 'react';
// import { useEffect } from 'react';
// // import { jsPDF } from "jspdf";




// import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
// import ReactPDF from '@react-pdf/renderer';
// import { PDFViewer } from '@react-pdf/renderer';





// // Create styles
// const styles = StyleSheet.create({
//     page: {
//         flexDirection: 'row',
//         backgroundColor: '#E4E4E4'
//     },
//     section: {
//         margin: 10,
//         padding: 10,
//         flexGrow: 1
//     }
// });

// // Create Document Component
// const MyDocument = () => (
//     <Document>
//         <Page size="A4" style={styles.page}>
//             <View style={styles.section}>
//                 <Text>Section #1</Text>
//             </View>
//             <View style={styles.section}>
//                 <Text>Section #2</Text>
//             </View>
//         </Page>
//     </Document>
// );




function ToPdf() {
    // console.log(MyDocument)
    // console.log("To byl muj dokument")

    // ReactPDF.render(<MyDocument />, `example.pdf`);



    // useEffect(() => {
    //     console.log('AHojoasd')
    //     const doc = new jsPDF();

    //     doc.text("Hello world!", 10, 10);
    //     doc.text("Hello world!", 10, 10);
    //     doc.save("a4.pdf");

    // }, []);

    return (
        <div className="">
            <h1>ToPdf</h1>
            {/* <PDFViewer>
                <MyDocument />
            </PDFViewer> */}


        </div>

    );
}

export default ToPdf;