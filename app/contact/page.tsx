export default function page() {
  return (
    <div className="flex mt-20 mb-28 ">
      <div>
        <img
          className="w-4/5 "
          src="https://github.com/safak/next14-tutorial/blob/main/public/contact.png?raw=true"
          alt=""
        />
      </div>
      <div className="flex flex-col justify-around mr-7 w-full gap-3">
        <input
          type="text"
          className="p-3 rounded-sm bg-[#535C91]"
          placeholder="Name and Surname"
        />
        <input
          type="text"
          className="p-3 rounded-sm bg-[#535C91]"
          placeholder="Email address"
        />
        <input
          type="text"
          className="p-3 rounded-sm bg-[#535C91]"
          placeholder="Phone Number (Optional)"
        />
        <textarea
          name=""
          className="p-3 rounded-sm resize-none bg-[#535C91] pb-20"
          placeholder="Message"
          id=""
        ></textarea>
        <button className="bg-[#1B1A55] rounded-sm pt-3 pb-3 ">Send</button>
      </div>
    </div>
  );
}
