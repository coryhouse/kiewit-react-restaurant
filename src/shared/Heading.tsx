type HeadingProps = {
  children: React.ReactNode;
  tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

export function Heading(props: HeadingProps) {
  switch (props.tag) {
    case "h1":
      return <h1 className="text-2xl font-bold">{props.children}</h1>;
    case "h2":
      return <h2 className="text-xl font-bold">{props.children}</h2>;
    case "h3":
      return <h3 className="text-lg font-bold">{props.children}</h3>;
    case "h4":
      return <h4 className="text-md font-bold">{props.children}</h4>;
    case "h5":
      return <h5 className="text-sm font-bold">{props.children}</h5>;
    case "h6":
      return <h6 className="text-xs font-bold">{props.children}</h6>;
  }
}
