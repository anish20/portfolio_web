// import { Html, Head, Main, NextScript } from "next/document";
import React from 'react';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import  { DocumentContext } from 'next/document';
const MyDocument = () => (
    <Html lang="en">
      <Head>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

{/* <!-- CSS Libraries --> */}
<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet" />
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet" />
<link href="lib/animate/animate.min.css" rel="stylesheet" />
<link href="lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet" />
<link href="lib/lightbox/css/lightbox.min.css" rel="stylesheet" />

      </Head>
      <body data-spy="scroll" data-target=".navbar" data-offset="51">
        <Main />
        <NextScript />

        <a href="#" className="btn back-to-top"><i className="fa fa-chevron-up"></i></a>
    
         {/* <!-- Pre Loader --> */}
        <div id="loader" className="show">
            <div className="loader"></div>
        </div>
        <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js"></script>
        <script src="lib/easing/easing.min.js"></script>
        <script src="lib/wow/wow.min.js"></script>
        <script src="lib/waypoints/waypoints.min.js"></script>
        <script src="lib/typed/typed.min.js"></script>
        <script src="lib/owlcarousel/owl.carousel.min.js"></script>
        <script src="lib/isotope/isotope.pkgd.min.js"></script>
        <script src="lib/lightbox/js/lightbox.min.js"></script>
        
        {/* <!-- Contact Javascript File --> */}
        <script src="mail/jqBootstrapValidation.min.js"></script>
        <script src="mail/contact.js"></script>

        {/* <!-- Template Javascript --> */}
        <script src="js/main.js"></script>
        
      </body>
    </Html>
  );

  MyDocument.getInitialProps = async (DocumentContext) => {
    const cache = createCache();
    const originalRenderPage = DocumentContext.renderPage;
    DocumentContext.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => (
          <StyleProvider cache={cache}>
            <App {...props} />
          </StyleProvider>
        ),
      });
  
    const initialProps = await Document.getInitialProps(DocumentContext);
    const style = extractStyle(cache, true);
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style dangerouslySetInnerHTML={{ __html: style }} />
        </>
      ),
    };
  };
  
  export default MyDocument;