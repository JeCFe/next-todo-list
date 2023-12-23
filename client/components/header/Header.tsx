import { User } from "./User";

type Props = {
  title?: string;
};

export const Header = ({ title }: Props) => {
  return (
    <div className="flex items-center w-screen h-auto bg-white shadow-2xl shadow-pink-200 mb-20 ">
      <div className="container mx-auto py-2">
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0">
          {/* Ideally have a logo here passed through params */}
          <div className="flex flex-row md:flex-col md:grow md:justify-center text-2xl md:text-3xl font-bold">
            {title}
          </div>
          <div className="flex flex-row md:flex-col justify-start md:justify-end text-lg md:text-xl">
            <User />
          </div>
        </div>
      </div>
    </div>
  );
};
