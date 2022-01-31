import React from 'react'

const Footer = () => {
    return (

        <footer className="page-footer font-small pt-5 blue bg-dark text-white" style={{ bottom: "0" , position: "absolute", width: '100%', height: '3rem' }}>
            <div className="container-fluid text-center text-md-left bg-dark">
                <div className="row">
                    <div className="col-md-6 mt-md-0 mt-3">
                        <h5 className="text-uppercase">CHATFAT FINAL MESSAGE</h5>
                        <p>Thank you for visiting our website, and click on the link, if you have a feedback.</p>
                    </div>

                    <hr className="clearfix w-100 d-md-none pb-0"/>

                    <div className="col-md-3 mb-md-0 mb-3">
                        <h5 className="text-uppercase">Report an issue</h5>
                        <ul className="list-unstyled">
                            <li><a href="/home">home</a></li>
                            <li><a href="/home">home</a></li>
                            
                        </ul>
                    </div>

                    <div className="col-md-3 mb-md-0 mb-3">
                        <h5 className="text-uppercase">Contact for bussiness</h5>
                        <ul className="list-unstyled">
                            <li><a href="/home">home</a></li>
                            <li><a href="/home">home</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="footer-copyright text-center py-3 bg-dark">© 2022 Copyright:
                <a href="/home"> ChatFat.com</a>
            </div>

        </footer>
            
 
    )
}

export default Footer
