// ===========================================
// #00120
// ===========================================

import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import moment from 'moment';
import { useInvoiceDetails } from '../context/InvoiceContext';

// STYLES
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: '1cm',
  },

  topSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'strat',
    justifyContent: 'space-between',
    marginBottom: '5px',
    borderBottom: '1px solid #ddd',
  },
  totalSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'strat',
    justifyContent: 'flex-end',
    marginTop: '-25px',
  },
  secSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'strat',
    justifyContent: 'space-between',
    marginBottom: '5px',
  },
  section: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '5px',
    padding: 0,
  },
  logo: {
    width: '100px',
    height: 'auto',
  },
  text: {
    fontSize: 12,
  },
  invoiceDetailsTable: {
    display: 'table',
    width: '200px',
    borderStyle: 'solid',
    borderWidth: 0,
    borderColor: '#000000',
    marginBottom: '1cm',
  },
  amountTable: {
    display: 'table',
    width: '300px',
    borderStyle: 'solid',
    borderWidth: 0,
    borderColor: '#000000',
    marginBottom: '1cm',
  },

  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 0,
    borderColor: '#000000',
    marginBottom: '1cm',
    borderBottom: '1px ssolid #eeeeee',
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
    fontSize: 10,
    padding: '6px',
    borderStyle: 'solid',
    borderWidth: 0,
    borderColor: '#000000',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#b27d0e',
  },
  tableRowOdd: {
    backgroundColor: '#d5e3f4',
    flexDirection: 'row',
    borderBottom: '1px solid #ddd',
    paddingLeft: 5,
    paddingRight: 5,
  },
  tableRowEven: {
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 5,
  },
  itemTableCell: {
    flex: 1,
    fontSize: 10,
    padding: '6px',
    borderWidth: 0,
  },
  tableCell: {
    flex: 1,
    fontSize: 10,
    paddingTop: '6px',
    paddingBottom: '6px',
    borderStyle: 'solid',
    borderWidth: 0,
    borderColor: '#000000',
  },
  redDiv: {
    width: '100%',
    height: '20px',
  },
  paragraph: {
    position: 'absolute',
    bottom: '10px',
    fontSize: 10,
    textAlign: 'center',
    width: '111%',
    display: 'block',
  },
  invoiceTitle: {
    width: '100%',
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: '28px',
  },
  invoice_summary: {
    width: '100%',
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: '8px',
  },
  businessName: {
    width: '100%',
    textAlign: 'right',
    fontWeight: 'black',
    fontSize: '17px',
    marginTop: '18px',
  },

  businessAddress: {
    width: '100%',
    textAlign: 'right',
    fontWeight: 'black',
    fontSize: '8px',
    lineHeight: 10,
    marginTop: '2px',
    fontStyle: 'italic',
  },
  topRightDiv: {
    width: '50%',
  },
  rowLeft: {
    textAlign: 'left',
  },

  rowCenter: {
    textAlign: 'center',
  },
  rowRight: {
    textAlign: 'right',
  },
  headerRowLeft: {
    textAlign: 'left',
    color: '#ffffff',
    fontWeight: 'bold',
  },
  headerRowCenter: {
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: 'bold',
  },
  headerRowRight: {
    textAlign: 'right',
    color: '#ffffff',
    fontWeight: 'bold',
  },

  textRight: {
    width: '100%',
    textAlign: 'right',
  },
  amountRow: {
    flexDirection: 'row',
    width: '100%',
  },
});

const PdfInvoice = ({
  selectedPropertyWithDetals,
  selectedCustomerWithDetals,
}) => {
  const {formData,setFormData} = useInvoiceDetails()
  console.log({formData})
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.topSection}>
          <View>
            {formData?.logo ? (
              <>
                {formData?.logo?.split(':')[0] === 'blob' ? (
                  <Image src={formData?.logo} style={styles.logo} />
                ) : (
                  <Image
                    src={`${import.meta.env.VITE_BASE_URL}${formData?.logo}`}
                    style={styles.logo}
                  />
                )}
              </>
            ) : (
              <View style={styles.logo} />
            )}
          </View>
          <View style={styles.topRightDiv}>
            {formData?.invoice_title && (
              <Text style={styles.invoiceTitle}>{formData?.invoice_title}</Text>
            )}
            {formData?.invoice_summary && (
              <Text style={styles.invoice_summary}>
                {formData?.invoice_summary}
              </Text>
            )}
            {formData?.business_name && (
              <Text style={styles.businessName}>{formData?.business_name}</Text>
            )}
            {formData?.business_address && (
              <Text style={styles.businessAddress}>
                {formData?.business_address}
              </Text>
            )}
          </View>
        </View>
        <View style={styles.secSection}>
          <View>
            {/* {<Text style={styles.text}>You have not added a customer.</Text>} */}
            <Text style={{ fontSize: 10, color: '#aaa', marginBottom: 2 }}>
              Bill to
            </Text>
            {!(
              selectedCustomerWithDetals !== undefined ||
              Object.keys(selectedCustomerWithDetals).length === 0
            ) ? (
              <>
                <Text style={{ fontSize: 10, marginBottom: 2, color: '#777' }}>
                  {`${selectedCustomerWithDetals?.first_Name} ${selectedCustomerWithDetals?.last_Name}`}
                </Text>
                <Text style={{ fontSize: 10, marginBottom: 2, color: '#777' }}>
                  {selectedCustomerWithDetals?.phone}
                </Text>
                <Text style={{ fontSize: 10, marginBottom: 2, color: '#777' }}>
                  {selectedCustomerWithDetals?.email}
                </Text>
              </>
            ) : (
              <Text style={{ fontSize: '10px' }}>N/A</Text>
            )}
          </View>

          <View>
            <View style={styles.section}>
              <View style={styles.invoiceDetailsTable}>
                <View style={styles.amountRow}>
                  <View style={styles.tableCell}>
                    <Text style={styles.rowRight}>Invoice Number : </Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={styles.rowLeft}> {formData?.invoice_number}</Text>
                  </View>
                </View>
                <View style={styles.amountRow}>
                  <View style={styles.tableCell}>
                    <Text style={styles.rowRight}>Invoice Date : </Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={styles.rowLeft}> {formData?.invoice_date}</Text>
                  </View>
                </View>
                <View style={styles.amountRow}>
                  <View style={styles.tableCell}>
                    <Text style={styles.rowRight}>Payment Due : </Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={styles.rowLeft}> {formData?.invoice_date}</Text>
                  </View>
                </View>
                <View style={[styles.amountRow, { backgroundColor: '#eee' }]}>
                  <View style={styles.tableCell}>
                    <Text style={styles.rowRight}>Amount Due : </Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={styles.rowLeft}>
                      {' '}
                      £{' '}
                      {parseFloat(
                        formData?.invoice_payment_due
                          ? formData?.invoice_payment_due
                          : formData?.total_amount
                      ).toFixed(1)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <View style={[styles.table]}>
            <View style={styles.tableHeaderRow}>
              <View style={styles.itemTableCell}>
                <Text style={styles.headerRowLeft}>Items</Text>
              </View>
              <View style={styles.itemTableCell}>
                <Text style={styles.headerRowCenter}>Quantity</Text>
              </View>
              <View style={styles.itemTableCell}>
                <Text style={styles.headerRowCenter}>Price</Text>
              </View>
              <View style={styles.itemTableCell}>
                <Text style={styles.headerRowRight}>Amount</Text>
              </View>
            </View>

            {formData?.invoice_items.length > 0 ? (
              formData?.invoice_items?.map((item, index) => (
                <View
                  key={index}
                  style={[
                    (index + 1) % 2 === 0
                      ? styles.tableRowOdd
                      : styles.tableRowEven,
                    formData?.invoice_items.length === index && {
                      borderBottom: '1px solid #eee',
                    },
                  ]}>
                  <View style={styles.itemTableCell}>
                    <Text
                      style={[
                        styles.rowLeft,
                        { fontWeight: 'bold', marginBottom: 2 },
                      ]}>
                      {item?.name}
                    </Text>
                    <Text
                      style={[
                        styles.rowLeft,
                        { fontWeight: 100, fontSize: '8px' },
                      ]}>
                      {item?.description}
                    </Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={styles.rowCenter}>{item?.quantity}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={styles.rowCenter}>£{item?.price}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={styles.rowRight}>
                      £{parseFloat(item?.quantity * item?.price).toFixed(2)}
                    </Text>
                  </View>
                </View>
              ))
            ) : (
              <View style={[styles.tableRowEven]}>
                <View
                  style={{ position: 'relative', width: '100%', height: 25 }}>
                  <Text
                    style={{
                      position: 'absolute',
                      left: '50%',
                      bottom: 5,
                      fontSize: 10,
                      textAlign: 'center',
                      transform: 'translateX(-40%)',
                    }}>
                    No item selected
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
        <View style={styles.totalSection}>
          <View style={styles.amountTable}>
            <View
              style={[styles.amountRow, { borderBottom: '1px solid #eee' }]}>
              <View style={styles.tableCell}>
                <Text style={[styles.rowRight, { fontSize: 9 }]}>
                  Subtotal :
                </Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={[styles.textRight, { fontSize: 9 }]}>
                  &pound;
                  {parseFloat(formData?.sub_total ? formData?.sub_total : 0).toFixed(1)}
                </Text>
              </View>
            </View>
            <View style={[styles.amountRow]}>
              <View style={styles.tableCell}>
                <Text
                  style={[styles.rowRight, { fontSize: 9, color: 'green' }]}>
                  {formData?.discount_description
                    ? formData?.discount_description
                    : 'Discount'}{' '}
                  :
                </Text>
              </View>
              <View style={styles.tableCell}>
                <Text
                  style={[styles.textRight, { fontSize: 9, color: 'green' }]}>
                  (&pound;
                  {parseFloat(
                    formData?.discount_amount ? formData?.discount_amount : 0
                  ).toFixed(1)}
                  )
                </Text>
              </View>
            </View>

            <View style={[styles.amountRow]}>
              <View style={styles.tableCell}>
                <Text style={[styles.rowRight, { fontSize: 9 }]}>Total:</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={[styles.textRight, { fontSize: 9 }]}>
                  &pound;
                  {parseFloat(
                    formData?.total_amount ? formData?.total_amount : 0
                  ).toFixed(1)}
                </Text>
              </View>
            </View>

            {formData?.invoice_payments?.length > 0 && (
              <>
                {formData?.invoice_payments.map((payment) => (
                  <View style={[styles.amountRow]}>
                    <View style={styles.tableCell}>
                      <Text style={[styles.rowRight, { fontSize: 9 }]}>
                        Payment on {moment(payment?.payment_date).format('ll')}{' '}
                        using {payment?.payment_method} :
                      </Text>
                    </View>
                    <View style={styles.tableCell}>
                      <Text style={[styles.textRight, { fontSize: 9 }]}>
                        &pound;
                        {parseFloat(payment?.amount).toFixed(1)}
                      </Text>
                    </View>
                  </View>
                ))}
              </>
            )}

            <View style={[styles.amountRow, { backgroundColor: '#eee' }]}>
              <View style={styles.tableCell}>
                <Text style={styles.rowRight}>Amount Due:</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.textRight}>
                  £{' '}
                  {parseFloat(
                    formData?.invoice_payment_due
                      ? formData?.invoice_payment_due
                      : formData?.total_amount
                  ).toFixed(1)}
                </Text>
              </View>
            </View>
            {/* Add more rows as needed */}
          </View>
        </View>
        {formData?.note && (
          <View>
            <Text style={{ fontSize: 10 }}>Notes / Terms</Text>
            <Text style={{ fontSize: 8, color: '#999' }}>{formData?.note}</Text>
          </View>
        )}
        <Text style={styles.paragraph}>{formData?.footer_text}</Text>
      </Page>
    </Document>
  );
};

export default PdfInvoice;
