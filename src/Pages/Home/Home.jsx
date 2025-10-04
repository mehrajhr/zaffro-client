import React from 'react';
import HomeCarousel from './HomeCarousel';
import FeaturedProducts from './FeaturedProducts ';
import HowItWorks from './HowItWorks';
import BrandStory from './BrandStory';

const Home = () => {
    return (
        <div>
            <HomeCarousel></HomeCarousel>
            <FeaturedProducts></FeaturedProducts>
            <BrandStory></BrandStory>
            <HowItWorks></HowItWorks>
        </div>
    );
};

export default Home;