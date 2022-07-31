import { useEffect, useRef } from "react";

export default function Home() {
  const mapSideEffectRef = useRef();

  useEffect(() => {
    const promiseShouldBeWaited = mapSideEffectRef.current ?? Promise.resolve(); // the previous cleanup is async, has to wait for that before running the next effect
    const mapInstancePromise = promiseShouldBeWaited
      .then(() => import("leaflet")) // because the leaflet library access window
      .then(({ map }) => {
        return map("map");
      });

    return () =>
      (mapSideEffectRef.current = mapInstancePromise.then((mapInstance) => {
        mapInstance.remove();
      }));
  });

  return (
    <>
      <h1>Leaflet Demo</h1>
      <div id="map" className="h-48"></div>
    </>
  );
}
