import React, { useState, useEffect } from 'react'
import FooterAdmin from '../../Components/Admin/Footer/FooterAdmin';
import Navbar from '../../Components/Admin/Navbar/AdminNavbar';
import Sidebar from '../../Components/Admin/Sidebar/Sidebar';
import axios from 'axios';
import swal from 'sweetalert';


export default function GlobalSettings() {

    const [minRatePerMnute, setMinRatePerMinute] = useState();
    const [maxRatePerMinute, setMaxRatePerMinute] = useState();
    const [amount, setAmount] = useState(0);
    const [email, setEmail] = useState('');

    const [promotionalMinutes, setPromotionalMinutes] = useState();
    const [promotionalPeriodFrom, setPromotionalPeriodFrom] = useState();
    const [promotionalPeriodTo, setPromotionalPeriodTo] = useState();

    const [discountPercent, setDiscountPercent] = useState();
    const [discountPeriodFrom, setDiscountPeriodFrom] = useState();
    const [discountPeriodTo, setDiscountPeriodTo] = useState();

    const [minChatMinutes, setMinChatMinutes] = useState();
    const [commissionRate, setCommissionRate] = useState();
    const [trackingKeywords, setTrackingKeywords] = useState();

    const sendCreditLink = () => {

        if (amount === '' || !amount) {
            swal("Hello", "Please enter amount", "error");
            return false;
        }

        if (email === '' || !email) {
            swal("Hello", "Please enter email", "error");
            return false;
        }

        const formData = {
            amount: amount,
            email: email
        }

        axios.post(`${process.env.REACT_APP_BASE_URL}/admin/send-credit-link`, formData, {
            headers: {
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
        }).then(res => {
            if (res.data.success === true) {
                swal("success", "Credit Link is sent successfully", "success");
                //navigate(`/admin/customers`);

            } else if (res.data.error) {
                swal(res.data.error.message, "error");

            }
        });
    }


    const handleSubmit = (e) => {

        e.preventDefault();

        const formData = {
            min_rate_per_minute: minRatePerMnute,
            max_rate_per_minute: maxRatePerMinute,

            promotional_minutes: promotionalMinutes,
            discount_percent: discountPercent,

            min_chat_minutes: minChatMinutes,
            tracking_keywords: trackingKeywords,
            commission_rate: commissionRate,

            promotional_period_from: promotionalPeriodFrom,
            discount_period_from: discountPeriodFrom,

            promotional_period_to: promotionalPeriodTo,
            discount_period_to: discountPeriodTo,

        }

        axios.put(`${process.env.REACT_APP_BASE_URL}/admin/settings/global`, formData, {
            headers: {
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
        }).then(res => {
            if (res.data.success === true) {
                swal("Data is updated successfully", "success");
                // navigate(`/admin/global-settings`);

            } else if (res.data.error) {
                swal(res.data.error.message, "error");

            }
        });

    }

    function getDetails() {

        axios.get(`${process.env.REACT_APP_BASE_URL}/admin/settings/global`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
        }).then(result => {
            setMinRatePerMinute(result.data.data.min_rate_per_minute);
            setMaxRatePerMinute(result.data.data.max_rate_per_minute);
            setPromotionalMinutes(result.data.data.promotional_minutes);
            setDiscountPercent(result.data.data.discount_percent);
            setMinChatMinutes(result.data.data.min_chat_minutes);
            setCommissionRate(result.data.data.commission_rate);
            setPromotionalPeriodFrom(result.data.data.promotional_period_from);
            setDiscountPeriodFrom(result.data.data.discount_period_from);
            setPromotionalPeriodTo(result.data.data.promotional_period_to);
            setDiscountPeriodTo(result.data.data.discount_period_to);
            setTrackingKeywords(result.data.data.tracking_keywords);

        });

    }

    useEffect(() => {
        getDetails();
    }, []);


    return (
        <div className="relative md:ml-64 bg-default-skin">
            <Sidebar />
            <Navbar />
            <div className="flex flex-wrap min60 gb-settings">
                <div className="w-full mb-12 xl:mb-0 px-4 padding-top80 gridstyle">
                    <div className='mt-4'>
                        <h1 className='text-2xl text-black font-bold mb-3'>Global Settings</h1>
                    </div>
                    <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item" role="presentation">
                            <a id="general-tab" className="nav-link active" data-toggle="tab" href="#tab-general" aria-selected="true" role="tab">General</a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a id="credits-tab" className="nav-link" data-toggle="tab" href="#tab-credits" aria-selected="false" role="tab">Credits</a>
                        </li>
                    </ul>
                    <form className='mt-4 shadow-md p-4 rounded bg-white' onSubmit={handleSubmit}>
                        <div className="tab-content">
                            <div id="tab-general" className="tab-pane active show" role="tab-panel" aria-labelledby="general-tab">
                                <div className='grid grid-cols-5 gap-4'>
                                    <div className='form-group'>
                                        <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Min Rate per minute (USD)</label>
                                        <input type="text" id="minRate" onChange={(e) => setMinRatePerMinute(e.target.value)} value={minRatePerMnute} placeholder='Min Rate per minute' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                    </div>
                                    <div className='form-group'>
                                        <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Max Rate per minute (USD)</label>
                                        <input type="text" id="maxRate" onChange={(e) => setMaxRatePerMinute(e.target.value)} value={maxRatePerMinute} placeholder='Max Rate per minute' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                    </div>
                                    <div className='form-group'>
                                        <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Promotional Period From</label>
                                        <input type="date" id="promotionalPeriodFrom" onChange={(e) => setPromotionalPeriodFrom(e.target.value)} value={promotionalPeriodFrom} placeholder='Promotional Period From' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                    </div>
                                    <div className='form-group'>
                                        <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Promotional Period To</label>
                                        <input type="date" id="promotionalPeriodTo" onChange={(e) => setPromotionalPeriodTo(e.target.value)} value={promotionalPeriodTo} placeholder='Promotional Period To' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                    </div>
                                    <div className='form-group'>
                                        <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Promotional Minutes</label>
                                        <input type="text" id="promotionalMinutes" onChange={(e) => setPromotionalMinutes(e.target.value)} value={promotionalMinutes} placeholder='Promotional Minutes' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                    </div>
                                    <div className='form-group'>
                                        <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Min Chat Minutes</label>
                                        <input type="text" id="minChatMinutes" onChange={(e) => setMinChatMinutes(e.target.value)} value={minChatMinutes} placeholder='Min Chat Minutes' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                    </div>
                                    <div className='form-group'>
                                        <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Commission Rate (%)</label>
                                        <input type="text" id="commissionRate" onChange={(e) => setCommissionRate(e.target.value)} value={commissionRate} placeholder='Commission Rate (%)' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                    </div>
                                    <div className='form-group'>
                                        <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Discount Period From</label>
                                        <input type="date"  onChange={(e) => setDiscountPeriodFrom(e.target.value)} value={discountPeriodFrom} placeholder='Promotional Period From' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                    </div>
                                    <div className='form-group'>
                                        <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Discount Period To</label>
                                        <input type="date"  onChange={(e) => setDiscountPeriodTo(e.target.value)} value={discountPeriodTo} placeholder='Promotional Period To' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                    </div>
                                    <div className='form-group'>
                                        <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Discount percentage (%)</label>
                                        <input type="text"  onChange={(e) => setDiscountPercent(e.target.value)} value={discountPercent} placeholder='Promotional Minutes' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                    </div>
                                </div>
                                <div className='form-group'>
                                    <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Tracking Keywords</label>
                                    <textarea id="keywords" rows="3" onChange={(e) => setTrackingKeywords(e.target.value)} defaultValue={trackingKeywords} className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Enter Keywords'></textarea>
                                </div>
                                <div className='form-group mt-2'>
                                    <button type="submit" className="mt-4 text-white bg-package-maroon font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center">Save</button>
                                </div>
                            </div>
                            <div id="tab-credits" className="tab-pane" role="tab-panel" aria-labelledby="credits-tab">
                                <h3 className='text-xl text-black font-bold mb-3'>Send Credit Amount to Guest User</h3>
                                <div className='row'>
                                    <div className='col-sm-4 my-col-xs-12'>
                                        <div className="mb-6">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        </div>
                                    </div>
                                    <div className='col-sm-4 my-col-xs-12'>
                                        <div className="mb-6">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Free Credit Amount</label>
                                            <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='Amount' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        </div>
                                    </div>
                                    <div className='col-sm-4 my-col-xs-12'>
                                        <button type="button" onClick={sendCreditLink} className="mt-4 text-white bg-package-maroon font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center">Send</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <FooterAdmin />
        </div>
    )
}