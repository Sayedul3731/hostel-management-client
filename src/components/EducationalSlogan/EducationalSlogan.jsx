/* eslint-disable react/no-unescaped-entities */
import Marquee from "react-fast-marquee";

const EducationalSlogan = () => {
    return (
        <div className=" bg-primary-100 border py-5 text-white">
            <Marquee>
                <p className="mr-5 font-semibold">"Ignite Minds, Illuminate Futures."</p>
                <p className="mr-5 font-semibold">"Empowering Minds, Inspiring Success."</p>
                <p className="mr-5 font-semibold">"Knowledge Unlocks Potential."</p>
                <p className="mr-5 font-semibold">"Learn Today, Lead Tomorrow."</p>
                <p className="mr-5 font-semibold">"Education: The Key to Infinite Possibilities."</p>
                <p className="mr-5 font-semibold">"Discover, Learn, Achieve."</p>
                <p className="mr-5 font-semibold">"Education Lights the Path to Excellence."</p>
                <p className="mr-5 font-semibold">"Knowledge is Power; Education is Empowerment."</p>
            </Marquee>
        </div>
    );
};

export default EducationalSlogan;