/* eslint-disable react/no-unescaped-entities */





const FAQ = () => {
    return (
        <div className="bg-gradient-to-br from-yellow-100 via-orange-100 to-yellow-200 min-h-screen py-10">
            <div className="max-w-3xl mx-auto p-6 rounded-3xl shadow-2xl bg-white/80 backdrop-blur-md">
                <h2 className="text-4xl font-extrabold text-center text-orange-500 mb-10 drop-shadow-lg tracking-wide">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    <div className="rounded-xl overflow-hidden shadow-lg border border-orange-200 bg-white/90 transition-transform hover:scale-[1.02]">
                        <input type="radio" name="my-accordion-3" className="hidden peer" defaultChecked />
                        <div className="collapse-title text-2xl font-semibold text-orange-600 bg-orange-50 px-6 py-4 cursor-pointer peer-checked:bg-orange-100 transition-colors">
                            How Can I Purchase A Package?
                        </div>
                        <div className="collapse-content px-6 pb-4 text-gray-700 text-lg">
                            <p>Go to <span className="font-bold text-orange-500">Membership</span> section. It's located in the <span className="font-bold">'Home'</span> page after <span className="font-bold">'MealsByCategory'</span> section. There are three types of package such as <span className="font-bold text-yellow-500">'Silver'</span>, <span className="font-bold text-yellow-600">'Gold'</span> and <span className="font-bold text-yellow-800">'Platinum'</span>. You can choose any one package.</p>
                        </div>
                    </div>
                    <div className="rounded-xl overflow-hidden shadow-lg border border-orange-200 bg-white/90 transition-transform hover:scale-[1.02]">
                        <input type="radio" name="my-accordion-3" className="hidden peer" />
                        <div className="collapse-title text-2xl font-semibold text-orange-600 bg-orange-50 px-6 py-4 cursor-pointer peer-checked:bg-orange-100 transition-colors">
                            How Can I Book My Seat?
                        </div>
                        <div className="collapse-content px-6 pb-4 text-gray-700 text-lg">
                            <p>Go to <span className="font-bold">'Rooms'</span> Page in the <span className="font-bold">'Navbar'</span>. There are all rooms and each room has a <span className="font-bold text-orange-500">'Details'</span> button. Click on it and you will see the seats.</p>
                        </div>
                    </div>
                    <div className="rounded-xl overflow-hidden shadow-lg border border-orange-200 bg-white/90 transition-transform hover:scale-[1.02]">
                        <input type="radio" name="my-accordion-3" className="hidden peer" />
                        <div className="collapse-title text-2xl font-semibold text-orange-600 bg-orange-50 px-6 py-4 cursor-pointer peer-checked:bg-orange-100 transition-colors">
                            How Can I Order My Meal?
                        </div>
                        <div className="collapse-content px-6 pb-4 text-gray-700 text-lg">
                            <p>Go to <span className="font-bold">'Meals'</span> page, it's located in the <span className="font-bold">'Navbar'</span>. Each meal has a <span className="font-bold text-orange-500">'Details'</span> button. If you click on it, you will be redirected to the specific meal details page and you will see the <span className="font-bold text-orange-500">'Meal Request'</span> button. You can order a meal by clicking on the <span className="font-bold text-orange-500">'Meal Request'</span> button.</p>
                        </div>
                    </div>
                    <div className="rounded-xl overflow-hidden shadow-lg border border-orange-200 bg-white/90 transition-transform hover:scale-[1.02]">
                        <input type="radio" name="my-accordion-3" className="hidden peer" />
                        <div className="collapse-title text-2xl font-semibold text-orange-600 bg-orange-50 px-6 py-4 cursor-pointer peer-checked:bg-orange-100 transition-colors">
                            How Can I see my dashboard?
                        </div>
                        <div className="collapse-content px-6 pb-4 text-gray-700 text-lg">
                            <p>Go to <span className="font-bold">'Navbar'</span> and you will see a profile picture. If you click on the picture you will see three options: <span className="font-bold text-orange-500">'Your Name'</span>, <span className="font-bold text-orange-500">'Dashboard'</span> and <span className="font-bold text-orange-500">'Logout'</span> button.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;