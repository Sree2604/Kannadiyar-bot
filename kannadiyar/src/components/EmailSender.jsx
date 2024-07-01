import React, { useEffect, useState } from "react";
// import axios from "axios";

const EmailSender = () => {
  const [emailSentMessage, setEmailSentMessage] = useState("");
  const [emailBody, setEmailBody] = useState();

  const sendEmail = async () => {
    const emailData = {
      to: "ds04aranganthan@gmail.com", // Replace with actual recipient email
      cname: "Recipient Name", // Replace with actual recipient name
      sessionId: "12345", // Replace with actual session ID
      message: generateEmailBody(), // Function to generate email body
    };

    try {
      const response = await fetch("http://localhost:4000/sendEmail", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setEmailSentMessage(data.message); // Assuming server responds with a message
    } catch (error) {
      console.error("Error sending email:", error);
      setEmailSentMessage("Failed to send email. Please try again later.");
    }
  };

  const generateEmailBody = () => {
    let str = "";
    const ordid = "12345"; // Replace with actual order ID
    const btot = 1000; // Replace with actual order amount
    const disval = 100; // Replace with actual discount value if any
    const sessionData = {
      custname: "Recipient Name",
      today: new Date().toLocaleDateString(), // Replace with actual order date
      addr: "Recipient Address", // Replace with actual address
      state: "Recipient State", // Replace with actual state
      distr: "Recipient District", // Replace with actual district
      dplace: "Delivery Place", // Replace with actual delivery place
      zipc: "123456", // Replace with actual ZIP code
      count: "Country", // Replace with actual country
      lmark: "Landmark", // Replace with actual landmark
      mobl: "1234567890", // Replace with actual mobile number
      delemail: "recipient@example.com", // Replace with actual recipient email
      tpc: 50, // Replace with actual transport charges
      cpc: 20, // Replace with actual card processing charges
    };

    str += "<html><body>";
    str +=
      '<table border="0" style="width:100%;font-family: trebuchet ms; font-size:18px;">';
    str += '<tr><td><img src="cid:logo"></td></tr>';
    str += '<tr><td align="left">Dear <b>' + sessionData.custname + ",</b><br>";
    str += '<tr><td align="left">Thanks for ordering from us.</td></tr>';

    str +=
      '<tr><td align="left"><br>Your Order details :<br>' +
      "Order ID # " +
      ordid +
      "<br>Order Date : " +
      sessionData.today +
      "<br>" +
      "Order Amount Rs. " +
      formatrs(btot) +
      "</td></tr>";

    str +=
      '<tr><td align="left"><br>Your delivery details :<br>' +
      sessionData.custname +
      "<br>" +
      sessionData.addr +
      "<br>" +
      sessionData.state +
      "<br>" +
      sessionData.distr +
      "<br>" +
      sessionData.dplace +
      "-" +
      sessionData.zipc +
      "<br>" +
      sessionData.count +
      "<br>Landmark : " +
      sessionData.lmark +
      "<br>" +
      "Mobile : " +
      sessionData.mobl +
      "<br>" +
      "Email ID :" +
      sessionData.delemail +
      "<br><br></span></h6>";

    str +=
      '<table style="width:100%;border:1px solid silver;" cellpadding="0" cellspacing="0"><tr style="width:100%;background-color:#000; color:white;" align="center"><th>#</th>';
    str +=
      '<th align="center" style="background-color:#000;color:white;">Product Name</th>';
    str +=
      '<th align="center" style="background-color:#000;color:white;">Qty.</th>';
    str +=
      '<th align="center" style="background-color:#000;color:white;">Unit</th>';
    str +=
      '<th align="center" style="background-color:#000;color:white;">Rate</th>';
    str +=
      '<th align="center" style="background-color:#000;color:white;">Amount</th></tr>';

    // Dummy data for products, replace with actual data retrieval logic
    const products = [
      { product: "Product 1", qty: 2, wt: "500g", rate: 250, inr: 500 },
      { product: "Product 2", qty: 1, wt: "1kg", rate: 400, inr: 400 },
    ];

    let totamt = 0;
    let totqty = 0;
    let lop = 1;

    products.forEach((productData) => {
      const { product, qty, wt, rate, inr } = productData;
      totamt += inr;
      totqty += qty;

      str +=
        '<tr><td style="padding:5px;border:1px solid silver;"><b>' +
        lop +
        "</b></td>";
      str +=
        '<td style="padding:5px;border:1px solid silver;"><b>' +
        product +
        "</b></td>";
      str +=
        '<td style="text-align:center; padding:5px;border:1px solid silver;"><b>' +
        qty +
        "</b></td>";
      str +=
        '<td style="padding:5px;border:1px solid silver;"><b>' +
        wt +
        "</b></td>";
      str +=
        '<td style="text-align:right; padding:5px;border:1px solid silver;"><b>' +
        rate +
        "</b></td>";
      str +=
        '<td style="text-align:right; padding:5px;border:1px solid silver;"><b>' +
        inr +
        "</b></td></tr>";

      lop++;
    });

    str +=
      '<tr style="padding:5px;border:1px solid silver;"><td> </td><td colspan="3" align="right"> Sub Total : </td><td></td><td align="right">' +
      formatrs(totamt) +
      "</td></tr>";

    if (disval !== 0) {
      str +=
        '<tr style="padding:5px;border:1px solid silver;"><td> </td><td colspan="3" align="right"> Less Bill Discount : </td><td></td><td align="right">' +
        formatrs(disval) +
        "</td></tr>";
    }

    str +=
      '<tr style="padding:5px;border:1px solid silver;"><td> </td><td colspan="3" align="right"> Transport Charges : </td><td></td><td align="right">' +
      formatrs(sessionData.tpc) +
      "</td></tr>";

    if (sessionData.cpc !== 0) {
      str +=
        '<tr style="padding:5px;border:1px solid silver;"><td> </td><td colspan="3" align="right"> Card Processing Charges : </td><td></td><td align="right">' +
        formatrs(sessionData.cpc) +
        "</td></tr>";
    }

    totamt = totamt + sessionData.tpc + sessionData.cpc - disval;

    str +=
      '<tr style="padding:5px;border:1px solid silver;"><td> </td><td colspan="3" align="right"> Amount Payable : </td><td></td><td align="right">' +
      formatrs(totamt) +
      "</td></tr>";

    str +=
      '<tr style="padding:5px;border:1px solid silver;"><td> </td><td colspan="3" align="right"> Bill amount of Rs. ' +
      formatrs(totamt) +
      " for this order is pending, kindly pay to process your order. <br><br>Our UPI ID: <b> jeyakumar.cms@okhdfcbank </b></td></tr>";

    str += '<tr><td><img src="cid:cubupi"></td></tr>';
    str +=
      '<tr><td align="left"><a href="https://kannadiyar.com/myaccount.php" target="_blank">Click this link to track your order. </a>';
    str +=
      "<br><B>Our Bank Details: Bank Name : City Union Bank (CUB), <br>Branch : MADURAI - VILAKKUTHOON, <br>Account Name : <b>CMS DHANABALAN</b><br>Account Type : <b>Current Account</b><br> Acc. No. : 510 9090 1003 3015, <br>IFSC Code No. : CIUB0000283, <br>Branch Code: 000283</b></td></tr>";

    str +=
      '<tr><td align="left"><br><br>Thanks & Regards,<br>Team Kannadiyar<br>+91 70921 07272</td></tr></table></body></html>';

    return str;
  };
  useEffect(() => {
    const str = generateEmailBody();
    setEmailBody(str);
  }, []);
  const formatrs = (amount) => {
    // Function to format amount as needed
    return `Rs. ${amount.toFixed(2)}`; // Example formatting, adjust as per your requirement
  };
  console.log(emailSentMessage);
  return (
    <div>
      <button onClick={sendEmail}>Send Email</button>
      {emailSentMessage && (
        <>
          <p>{emailSentMessage}</p>
        </>
      )}
      {emailBody}
    </div>
  );
};

export default EmailSender;
