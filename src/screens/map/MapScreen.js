// import React from 'react';
// import {Dimensions, View} from 'react-native';
// import {Button as BaseButton, Text as NativeText} from "native-base";
// import {MapView} from 'expo';
//
// let Marker = MapView.Marker;
//
// const SCREEN_WIDTH = Dimensions.get('window').width;
// const SCREEN_HEIGHT = Dimensions.get('window').height;
//
//
// class MapScreen extends React.Component {
//     static navigationOptions = ({navigation}) => {
//         return {
//             title: navigation.getParam('otherParam', 'Map Mode'),
//             headerLeft: <BaseButton hasText transparent onPress={() => navigation.navigate('Home')}>
//                 <NativeText>Home</NativeText>
//             </BaseButton>
//         };
//     };
//
//     render() {
//         return (
//             <View>
//                 <MapView
//                     style={{ alignSelf: 'stretch', height: 400 }}
//                     initialRegion={{
//                         latitude: 37.78825,
//                         longitude: -122.4324,
//                         latitudeDelta: 0.0922,
//                         longitudeDelta: 0.0421,
//                     }}
//                 />
//             </View>
//         );
//     }
// }
//
//
// export default MapScreen;

// import React, { Component } from 'react';
// import { Text, View, StyleSheet } from 'react-native';
// import { Constants, MapView, Location, Permissions } from 'expo';
//
// export default class MapScreen extends Component {
//     state = {
//         mapRegion: null,
//         hasLocationPermissions: false,
//         locationResult: null
//     };
//
//     componentDidMount() {
//         this._getLocationAsync();
//     }
//
//     _handleMapRegionChange = mapRegion => {
//         console.log(mapRegion);
//         this.setState({ mapRegion });
//     };
//
//     _getLocationAsync = async () => {
//         let { status } = await Permissions.askAsync(Permissions.LOCATION);
//         if (status !== 'granted') {
//             this.setState({
//                 locationResult: 'Permission to access location was denied',
//             });
//         } else {
//             this.setState({ hasLocationPermissions: true });
//         }
//
//         let location = await Location.getCurrentPositionAsync({});
//         this.setState({ locationResult: JSON.stringify(location) });
//
//         // Center the map on the location we just fetched.
//         this.setState({mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }});
//     };
//
//     render() {
//         return (
//             <View style={styles.container}>
//                 <Text style={styles.paragraph}>
//                     Pan, zoom, and tap on the map!
//                 </Text>
//
//                 {
//                     this.state.locationResult === null ?
//                         <Text>Finding your current location...</Text> :
//                         this.state.hasLocationPermissions === false ?
//                             <Text>Location permissions are not granted.</Text> :
//                             this.state.mapRegion === null ?
//                                 <Text>Map region doesn't exist.</Text> :
//                                 <MapView
//                                     style={{ alignSelf: 'stretch', height: 400 }}
//                                     region={this.state.mapRegion}
//                                     onRegionChange={this._handleMapRegionChange}
//                                 />
//                 }
//
//                 <Text>
//                     Location: {this.state.locationResult}
//                 </Text>
//             </View>
//
//         );
//     }
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingTop: Constants.statusBarHeight,
//         backgroundColor: '#ecf0f1',
//     },
//     paragraph: {
//         margin: 24,
//         fontSize: 18,
//         fontWeight: 'bold',
//         textAlign: 'center',
//         color: '#34495e',
//     },
// });




import React from 'react';
import { MapView } from 'expo';
import {Button as BaseButton, Text as NativeText} from "native-base";


class MapScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('otherParam', 'Map Mode'),
            headerLeft: <BaseButton hasText transparent onPress={() => navigation.navigate('Home')}>
                <NativeText>Home</NativeText>
            </BaseButton>
        };
    };

    state = {
        isLoading: true,
        markers: [],
    };

    componentDidMount() {
        this.fetchMarkerData();
    }

    fetchMarkerData() {
        fetch('https://feeds.citibikenyc.com/stations/stations.json')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    markers: responseJson.stationBeanList,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <MapView
                style={{ flex: 1 }}
                region={{
                    latitude: 40.76727216,
                    longitude: -73.99392888,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {this.state.isLoading ? null : this.state.markers.map((marker, index) => {
                    const coords = {
                        latitude: marker.latitude,
                        longitude: marker.longitude,
                    };

                    const metadata = `Status: ${marker.statusValue}`;

                    return (
                        <MapView.Marker
                            key={index}
                            coordinate={coords}
                            title={"Some title"}
                            description={metadata}
                        >
                            <NativeText>1</NativeText>
                        </MapView.Marker>
                    );
                })}
            </MapView>
        );
    }
}

export default MapScreen;