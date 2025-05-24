export default function Header({ category, title }:{category:string,title:string}) {
  return (
    <div className="mb-8">
      <p className="text-gray-400">{category}</p>
      <p className="capitalize text-3xl font-extrabold tracking-tight text-slate-900 dark:text-gray-300">
        {title}
      </p>
    </div>
  );
}
