/* eslint-disable react/no-unescaped-entities */




const FAQ = () => {
    return (
        <div className="min-h-[600px] max-w-7xl mx-auto p-5">
            <div className="collapse collapse-plus bg-base-200">
                <input type="radio" name="my-accordion-3" checked="checked" />
                <div className="collapse-title text-xl font-semibold">
                    How Can I Purchase A Package?
                </div>
                <div className="collapse-content">
                    <p>Go to Membership section. It's located in the 'Home' page after 'MealsByCategory' section. There are three types of package such as 'Silver', 'Gold' and 'Platinum'. You can choose any one package.</p>
                </div>
            </div>
            <div className="collapse collapse-plus bg-base-200 my-2">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-semibold">
                    How Can I Book My Seat?
                </div>
                <div className="collapse-content">
                    <p>Go to 'Rooms' Page in the 'Navbar'. There are all rooms and each room has a 'Details' button click on it and will see the seats.</p>
                </div>
            </div>
            <div className="collapse collapse-plus bg-base-200">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-semibold">
                    How Can I Order My Meal?
                </div>
                <div className="collapse-content">
                    <p>Go to 'Meals' page it's located in the 'Navbar' each meal has a 'Details' button. If you click on it you will redirect to the specific meal details page and you will see the 'Meal Request' button. You can order a meal by clicking on the 'Meal Request' button.</p>
                </div>
            </div>
        </div>
    );
};

export default FAQ;