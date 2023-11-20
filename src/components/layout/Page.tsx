import { JSX } from "preact/jsx-runtime";

interface Props {
  children: JSX.Element[] | JSX.Element;
}
const Page = ({ children }: Props) => {
  return <div class="max-w-[1400px] px-4 mx-auto">{children}</div>;
};

export default Page;
