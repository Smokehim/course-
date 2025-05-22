import {Link} from 'react-router'

function Footer(){

    return(
        <section className="flex-col bg-gray-800">
            <div className="flex-col space-y-4 md:justify-between  justify-around p-3 text-white">
                <h1 className="text-6xl font-bold">CareerCampus</h1>
                <ul className="list-none">
                    <li>Privacy Policy</li>
                    <li>Terms $ Condition</li>
                    <li>CopyRight Information</li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </div>
            <div className="flex">
                <div className="flex justify-center items-center w-full h-20 bg-gray-800 text-white">
                    <p className="text-center">© 2023 CareerCampus. All rights reserved.</p>
                </div>
            </div>
        </section>
    )
}

export default Footer;