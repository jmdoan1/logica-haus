import "./page.css";

export default function Page() {
  const baseAssetUrl = "/assets/projects/dashr";
  return (
    <section style={{ textAlign: "center" }}>
      <h1 className="h1">Dashr: The Dashcam App</h1>
      <div className="sbs">
        <img src={`${baseAssetUrl}/IMG_4173.png`} className="left" />
        <img src={`${baseAssetUrl}/download.png`} className="right" />
      </div>
      Dashr is a beautiful dashcam app with map, speed, and music control
      overlays. Once the recording is finished, the overlays are also included
      in the exported video!
      <br />
      <br />
      Pro users will be able to choose which overlays to include in both the app
      and the exported videos.
      <br />
      <br />
      <h3 className="h3">Coming Soon!</h3>
    </section>
  );
}
