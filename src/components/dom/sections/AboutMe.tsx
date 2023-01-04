export const AboutMe = () => {
  return (
    <section className="flex flex-row h-screen items-center justify-evenly text-white">
      <div className="flex flex-col gap-6 px-16 w-1/2">
        <h1 className="text-5xl font-bold">About me</h1>
        <p className="font-light">
          Anton Wyrowski is a student of Computer Science at the Technical
          University of Munich in Germany. He has published several Android
          apps, including two small games and a math learning app, and has
          experience developing cross-platform apps with Flutter and native iOS
          apps with XCode. In 2019, he founded a startup focused on developing a
          Flutter app to enable support for charity organizations. In addition
          to mobile development, Wyrowski has also created multiple websites for
          personal and client projects.
        </p>
      </div>
      <div className="h-full w-1/2"></div>
    </section>
  );
};
