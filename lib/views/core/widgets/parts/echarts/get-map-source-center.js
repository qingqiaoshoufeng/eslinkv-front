const getMapCenter = source => {
  console.info(source)
  let lngMin = 0
  let latMin = 0
  let lngMax = 0
  let latMax = 0
  source.features.forEach(({ properties }) => {
    const [lng, lat] = properties.cp || []
    if (!lng) return
    if (lngMin !== 0) {
      if (lat < latMin) latMin = lat
      if (lat > latMax) latMax = lat
      if (lng < lngMin) lngMin = lng
      if (lng > lngMax) lngMax = lng
    } else {
      lngMax = lngMin = lng
      latMax = latMin = lat
    }
  })
  return [(lngMax + lngMin) / 2, (latMax + latMin) / 2]
}

export default getMapCenter
