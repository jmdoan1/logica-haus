import NewTabLink from "app/components/new-tab-link";
import List from "app/components/list";

export default function Page() {
  const baseAssetUrl = "/assets/projects/dashr";
  return (
    <section style={{ textAlign: "center" }}>
      <h1 className="h1">Dashr: The Dashcam App</h1>
      <div>
        <img src={`${baseAssetUrl}/Screenshots.png`} />
      </div>
      <br />
      <p>
        <NewTabLink className="link">The original Dashr app</NewTabLink> was
        built in 2017 using screen recording logic to include overlays in the
        video, which is can no longer be feasibly maintained.
        {/* <br /> */}
        <i>
          <b> This version</b> (built in 2024)
        </i>{" "}
        uses Apple's CoreAnimation library add the overlays from stored location
        data after recording is finished
      </p>
      <br />
      <p className="h3">
        They say the best camera is the one you have with you. Now you can say
        the same for your dash cam!
      </p>
      <br />
      <p>
        <i>
          <b>Introducing Dashr: Your Ultimate Driving Companion</b>
        </i>
        <br />
        <br />
        Turn your smartphone into a reliable dashcam with Dashr, designed to
        keep you safe and capture every moment on the road. Whether you're
        recording beautiful road trips, tracking incidents, or simply ensuring
        peace of mind while driving, Dashr has you covered.
        <br />
        <br />
      </p>
      <h3 className="h3" style={{ textAlign: "left" }}>
        Key Features:
      </h3>
      <List style={{ textAlign: "left" }}>
        <li>
          {" "}
          <b>Easy Recording:</b> Start recording your journey effortlessly with
          a single tap.
        </li>
        <li>
          <b>High-Quality Video:</b> Capture your drives in crisp HD video,
          ensuring every detail is documented.
        </li>
        <li>
          <b>Keep the Party Going:</b> Dashr records videos with audio without
          interfering with your music, whether you're listening with the device,
          over bluetooth, or through CarPlay
        </li>
        <li>
          <b>GPS Integration:</b> Track your route with speed and location
          overlays, adding crucial context to your videos.
        </li>
        <li>
          <b>Emergency Save:</b> Quickly lock important video clips to prevent
          them from being overwritten with a double tap.
        </li>
        <li>
          <b>Incident Detection:</b> Detect sudden braking or impacts, and
          automatically save the video for later review.
        </li>
        <li>
          <b>Easy Sharing:</b> Quickly share your recorded clips with family,
          first responders, or your insurance provider directly from the app.
        </li>
      </List>
      <br />
      Dashr is perfect for commuters, road trippers, professional drivers, and
      anyone who wants added safety and security while on the road.
      <br />
      <br />
      Download Dashr today and take control of your driving experience!
      <br />
      <br />
      <h3 className="h3">Coming Soon!</h3>
    </section>
  );
}
