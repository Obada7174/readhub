import Image from "next/image";
import { useTranslations } from "next-intl";
import { Reply } from "@/types/comment";

interface Props {
  reply: Reply;
}

const ReplyCard = ({ reply: { user, text } }: Props) => {
  const t = useTranslations("Comments");

  return (
    <>
      <div className="flex gap-3 my-5 max-lg:ml-3">
        <Image
          width={100}
          height={100}
          className="w-10 h-10 rounded-full shrink-0"
          src={user.img}
          alt="User Image"
        />
        <div>
          <div className="flex gap-2">
            <h2>{user.first_name + " " + user.last_name}</h2>
            <h3>20 {t("days ago")}</h3>
          </div>
          <p>{text}</p>
        </div>
      </div>
    </>
  );
};
export default ReplyCard;
