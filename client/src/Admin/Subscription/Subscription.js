import React from 'react'
import SubscriptionFilter from '../../Components/Admin/Filter/SubscriptionFilter'
import Pagination from '../../Components/Admin/Footer/Pagination'
import AdminNavbar from '../../Components/Admin/Navbar/AdminNavbar'
import Sidebar from '../../Components/Admin/Sidebar/Sidebar'


export default function Subscription() {
  return (
    <div className="relative md:ml-64 bg-default-skin">
        <Sidebar/>
        <AdminNavbar/>
        <div className="flex flex-wrap min600">
            <div className="w-full mb-12 xl:mb-0 px-4">
                <div className="w-full mb-12 xl:mb-0 px-4 padding-top80">
                    <h1 className='text-2xl text-black font-bold mb-3'>Subscriptions</h1>
                    <SubscriptionFilter/>
                    <div className='table-responsive'>
                        <table className="table bg-white table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Created at</th>
                                    <th>Name</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Amount in Wallet</th>
                                    <th>Stripe ID</th>  
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>2022-10-06</td>
                                    <td>John Doe</td>
                                    <td>msohrabkhan</td>
                                    <td>test123@gmail.com</td>
                                    <td>$120</td>
                                    <td>sub_1LN0OVLIbjUjeITMo7EImdjw</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>2022-10-06</td>
                                    <td>John Doe</td>
                                    <td>msohrabkhan</td>
                                    <td>test123@gmail.com</td>
                                    <td>$120</td>
                                    <td>sub_1LN0OVLIbjUjeITMo7EImdjw</td>
                                </tr> 
                                <tr>
                                    <td>3</td>
                                    <td>2022-10-06</td>
                                    <td>John Doe</td>
                                    <td>msohrabkhan</td>
                                    <td>test123@gmail.com</td>
                                    <td>$120</td>
                                    <td>sub_1LN0OVLIbjUjeITMo7EImdjw</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>2022-10-06</td>
                                    <td>John Doe</td>
                                    <td>msohrabkhan</td>
                                    <td>test123@gmail.com</td>
                                    <td>$120</td>
                                    <td>sub_1LN0OVLIbjUjeITMo7EImdjw</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <Pagination/>
                </div>
            </div>
        </div>
    </div>
  )
}