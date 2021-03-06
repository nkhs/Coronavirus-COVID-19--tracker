import React, { useState, useEffect } from 'react'
import MapGL, { Source, Layer } from 'react-map-gl'

import HeatmapLegend from '../heatmap-legend/heatmap-legend.component'
import { createFeatures } from '../../constants/utils'
import { heatmapLayer } from './heatmap.styles'
import { textStyles } from '../../constants/textColor'

const TOKEN = process.env.MAPBOXKEY

const Heatmap = ({ covidData }) => {
  const textClass = textStyles()
  // const classes = useStyles()
  const [isLoading, setLoading] = useState(false)

  const [state, setState] = useState({
    data: null,
    hoveredFeature: null,
  })

  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 110,
    zoom: 1,
    bearing: 0,
    pitch: 0
  })

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    setLoading(true)
    const result = await fetch('https://corona.lmao.ninja/v2/jhucsse')
    const data = await result.json()

    if (data.error) {
      console.log(data.error)
    } else {
      const test = createFeatures(data)

      const featureCollection =
      {
        "type": "FeatureCollection",
        "features": [...test]
      }
      setState({ data: featureCollection })
    }
    setLoading(false)
  }

  //ON HOVER-TOOLTIP FEATURE
  // const onHover = event => {
  //     const { features, srcEvent: { offsetX, offsetY } } = event
  //     const hoveredFeature = (features && features.find(f => f.layer.id === 'data'))
  //     setState({ hoveredFeature, x: offsetX, y: offsetY })
  // }

  // const renderTooltip = () => {
  //     const { hoveredFeature, x, y } = state
  //     return (
  //         hoveredFeature && (
  //             <div className={classes.tooltip} style={{ left: x, top: y }}>
  //                 <div>Country:
  //                     {hoveredFeature.properties.province ? (
  //                         hoveredFeature.properties.province
  //                         ) : (
  //                             hoveredFeature.properties.country
  //                         )
  //                     }
  //                 </div>

  //                 <div>Cases:
  //                     <span
  //                         className={textClass.yellowText}>
  //                         {formatNumber(hoveredFeature.properties.confirmed)}
  //                     </span>
  //                 </div>

  //             </div>
  //         )
  //     )
  // }

  return (
    <div>
      <MapGL
        {...viewport}
        width="100vw"
        height="100vh"
        mapStyle={'mapbox://styles/mapbox/dark-v9'}
        onViewportChange={setViewport}
        mapboxApiAccessToken={TOKEN}
      >
        <Source type="geojson" data={state.data}>
          <Layer {...heatmapLayer} />
        </Source>
        {/*<HeatmapLegend />*/}
      </MapGL>
    </div>


  )
}
export default Heatmap


