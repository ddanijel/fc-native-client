import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import HomeScreen from '../screens/home';
import ProducerAuthScreen from '../screens/producer/auth';
import ConsumerScreen from '../screens/consumer';

export default createStackNavigator(
  {
    Home: HomeScreen,
    Producer: ProducerAuthScreen,
    Consumer: ConsumerScreen,
  },
  {
    initialRouteName: 'Home',
  }
);
