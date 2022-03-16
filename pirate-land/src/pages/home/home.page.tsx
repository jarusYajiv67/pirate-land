import React, {useEffect, useState} from 'react';
import axios from 'axios';

import LoginForm from '../../components/login-form';
import RegisterForm from '../../components/register-form';
import BlockLoader from '../../components/block-loader';
import Pricing from '../../components/pricing';
import {PricingSection} from '../../components/pricing/styles';
import Button from '../../components/button';

import {HomeContainer, Title, VerticalLine, FormContainer} from './styles';
import {useUserContext} from '../../contexts/user.context'; 
import {useAPIContext} from '../../contexts/api.context';

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
    const {REST_API} = useAPIContext();
    const {loading, setLoading} = useUserContext();

    const [showPricing, setShowPricing] = useState<boolean>(false);

    // to ensure that the api is running
    // or to wake up the api
    useEffect(() => {
        setLoading!(true);
        axios.get(`${REST_API}/validation/server`)
        .then(() => setLoading!(false))
        .catch(() => setLoading!(false));
    }, []);
    
    return (
        <HomeContainer>
            {loading && <BlockLoader />}
            {showPricing && <Pricing />}
            <PricingSection>
                <Button 
                  text={`${showPricing ? 'Hide' : 'Show'} Pricing`} 
                  onPress={() => setShowPricing(!showPricing)} 
                />
            </PricingSection>
            <Title>Pirate Land</Title>
            <FormContainer>
                <LoginForm />
                <VerticalLine />
                <RegisterForm />
            </FormContainer>
        </HomeContainer>
    );
};

export default HomePage;
