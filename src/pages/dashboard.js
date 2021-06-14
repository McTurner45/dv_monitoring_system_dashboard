import React, {useEffect, useState} from 'react'
import {Circle, GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs} from "react-google-maps"
import AppDrawer from "../components/AppDrawer";
import {CssBaseline} from "@material-ui/core";
import {styles} from '../css/CustomStyles'
import {withRouter} from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import firebase from "../Backend/index";
import {QueryClient, QueryClientProvider, useQuery} from "react-query";
import ReactRoundedImage from "react-rounded-image";


const markers = async () => {
    const res = await firebase.getMarkers();
    return res
}


function Map(options) {
    const [currentPosition, setCurrentPosition] = useState({});
    const [callPosition, setCallPosition] = useState([]);
    const [selectedCenter, setSelectedCenter] = useState(null);
    const [intervalMs, setIntervalMs] = React.useState(1000)


    const success = position => {
        const currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
        setCurrentPosition(currentPosition);
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success);
        let location = [];
        location = firebase.getMarkers();
        setCallPosition(location)
    }, [])

    const {data, status} = useQuery('markers', markers, {
        // Refetch the data every second
        refetchInterval: intervalMs,
    });

console.log(data)
    useEffect(() => {
            const listener = e => {
                if (e.key === "Escape") {
                    setSelectedCenter(null);
                }
            };
            window.addEventListener("keydown", listener);
            return () => {
                window.removeEventListener("keydown", listener);
            };
        },
        []);


    return (
        <GoogleMap
            defaultZoom={15}
            defaultCenter={{lat: -22.5947, lng: 27.1239}}
        >
            {
                data && (
                    data.map((call) => {
                        console.log(call)
                        let caller = {
                            id: call.id,
                            lat: parseFloat(call.lat),
                            lng: parseFloat(call.lng),
                            name: call.name,
                            surname: call.surname,
                            image:call.personPhoto
                        }
                        return (
                            <div>
                                <Marker position={caller}
                                        onClick={() => {
                                            setSelectedCenter(caller);
                                        }}/>

                                <Circle
                                    defaultCenter={{
                                        lat: caller.lat,
                                        lng: caller.lng
                                    }}
                                    radius={30}
                                    options={{
                                        strokeColor: "#ff0000"}
                                    }
                                />
                            </div>
                        )
                    })

                )
            }

            {selectedCenter && (

                <InfoWindow
                    onCloseClick={() => {
                        setSelectedCenter(null);
                    }}
                    position={{
                        lat: selectedCenter.lat,
                        lng: selectedCenter.lng
                    }}
                >
                    <div>
                        <ReactRoundedImage
                            image={selectedCenter.image}
                            roundedColor="#66A5CC"
                            imageWidth="120"
                            imageHeight="120"
                            roundedSize="8"
                            borderRadius="15"
                        />
                        <h3>Name:{selectedCenter.name}</h3>
                        <h3>Surname:{selectedCenter.surname}</h3>
                    </div>
                </InfoWindow>
            )}

        </GoogleMap>
    );
}


const Dashboard = (props) => {
    const {classes} = props

    const WrappedMap = withScriptjs(withGoogleMap(Map));

    const queryClient = new QueryClient()

    const getMapOptions = () => {
        return {
            disableDefaultUI: true,
            mapTypeControl: true,
            streetViewControl: true,
            styles: [{featureType: 'poi', elementType: 'labels', stylers: [{visibility: 'on'}]}],
        };
    };

    return (
        <div className={classes.root}>
            <QueryClientProvider client={queryClient}>
                <CssBaseline/>
                <AppDrawer/>
                <div className="map-container">
                    <WrappedMap
                        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCWBWNdtb2CaUnlAFkcezTqpAmCu-zymjI"
                        loadingElement={<div style={{height: `100%`}}/>}
                        containerElement={<div style={{height: `100%`}}/>}
                        mapElement={<div style={{height: `100%`}}/>}
                        options={getMapOptions}

                    >

                    </WrappedMap>
                </div>
            </QueryClientProvider>
        </div>
  )
}

export default withRouter(withStyles(styles)(Dashboard))
