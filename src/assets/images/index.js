import {Asset} from 'expo';

export const images = {
    background: require('./bg_screen1.jpg'),
    drawerIcon: require('./user-hp.png')
};

let imgs = [];
Object.keys(images).forEach(key => imgs.push(images[key]));
export const imageAssets = imgs.map(img => Asset.fromModule(img).downloadAsync());
