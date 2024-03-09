export default function About() {
  return (
    <div className="mt-16 h-about 400:mb-72 800:pt-14">
      <div className=" flex justify-between items-center gap-10 ">
        <div className=" 800:min-w-full w-7/12 flex flex-col gap-7 ">
          <h3 className="600:text-3xl text-[#535C91] text-2xl font-extrabold ">
            About Agency
          </h3>
          <h1 className="600:text-2xl text-white text-5xl font-extrabold leading-snug">
            We create digital ideas that are bigger, bolder, braver and better.
          </h1>
          <p className="leading-snug font-light">
            We create digital ideas that are bigger, bolder ,braver and better.
            We belive in good ideas flexbility and precission. We are worlds Our
            Special Team best consulting & finance solution provider. Wide range
            of web and software development services.
          </p>
          <div className="flex  justify-between 500:flex-wrap 500:gap-5">
            <div>
              <h2 className="text-[#535C91] text-3xl font-extrabold">10 K+</h2>
              <span>Year of experience</span>
            </div>
            <div>
              <h2 className="text-[#535C91] text-3xl font-extrabold">234 K+</h2>
              <span>People Reached</span>
            </div>
            <div>
              <h2 className="text-[#535C91] text-3xl font-extrabold">5 K+</h2>
              <span>Services and plugins</span>
            </div>
          </div>
        </div>
        <div className="w-5/12">
          <img
            className="800:hidden"
            src="https://github.com/safak/next14-tutorial/blob/main/public/about.png?raw=true"
            alt="asd"
          />
        </div>
      </div>
    </div>
  );
}
