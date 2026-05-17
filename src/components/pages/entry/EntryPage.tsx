import { useParams } from "react-router";

type Props = {};

const Entry: React.FC<Props> = () => {
  const { id } = useParams();

  return (
    <>
      <h2>Pokemon #{id}</h2>
    </>
  );
};

export default Entry;
