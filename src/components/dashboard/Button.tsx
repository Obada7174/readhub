
export default function Button(props:any) {
  return (
    <button
      onClick={props.onClick}
      type={props.type || "button"}
      style={{
        backgroundColor: '#768278',
        color: "white",
        borderRadius: props.borderRadius,
      }}
      className={`text-${props.size}   p-3 hover:drop-shadow-xl hover:opacity-90 ${props.className}`}
    >
      {props.text}
    </button>
  );
}
