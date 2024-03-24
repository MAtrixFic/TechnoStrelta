import React from 'react'
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps'
import '@/styles/map.scss'

interface IYandexMapProps {
    location: string;
}

const YandexMap = ({ location }: IYandexMapProps) => {
    const locationArray = [...location.split(' ').map(loc => Number(loc))]
    return (
        <div className="map">
            <YMaps>
                <Map width={300} height={'100%'} defaultState={{ center: locationArray, zoom: 16 }} >
                    <Placemark geometry={locationArray} />
                </Map>
            </YMaps>
        </div>
    )
}

export default YandexMap
