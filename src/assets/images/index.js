import {Asset} from 'expo';

export const images = {
    background: require('./bg_screen3.jpg'),
};

let imgs = [];
Object.keys(images).forEach(key => imgs.push(images[key]));
export const imageAssets = imgs.map(img => Asset.fromModule(img).downloadAsync());
