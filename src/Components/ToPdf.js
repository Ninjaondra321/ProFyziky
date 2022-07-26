// import Html from 'react-pdf-html';

import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';



function ToPdf() {
    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: '#E4E4E4'
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1
        }
    });
    return (


        // <Document>
        //     <Page>
        //         <Html>
        //             {`
        //                 <h1>Ahoooj</h1>
        //                 <p>xddd</p>
        //             `}
        //             <h1></h1>
        //         </Html>
        //     </Page>
        // </Document>

        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text>Section #1</Text>
                </View>
                <View style={styles.section}>
                    <Text>Section #2</Text>
                </View>
            </Page>
        </Document>

    );
}

export default ToPdf;