import Link from "next/link";

export interface PostType {
  _id: string;
  title: string;
  text: string;
  date: string;
  image: string;
  userId: string;
}

export default function Posts(props: PostType) {
  return (
    <div className="w-1/4 flex flex-col gap-4">
      {props.image !== null && (
        <img className="w-72 h-72 object-cover" src={props.image} alt="" />
      )}
      <h2 className="font-black text-xl">{props.title}</h2>
      <p className="font-thin">{props.text.substring(0, 50)}...</p>
      <div className="flex justify-between">
        <Link className="underline" href={`/blog/${props._id}`}>
          READ MORE
        </Link>
        <span>{props.date.substring(0, 8)}</span>
      </div>
    </div>
  );
}
